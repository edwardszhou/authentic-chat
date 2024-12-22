import User, { UserSchemaFields, type TUser } from '@/models/User';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import type { Types } from 'mongoose';

enum PatchOperations {
  replace = 'replace'
}
// @desc Get all users
// @route GET /users
// @access Private
const getUser = asyncHandler(async (req: Request, res: Response) => {
  for (const field in req.query) {
    if (field in UserSchemaFields) throw new Error(`400 Invalid query field '${field}'`);
  }

  const users = await User.find(req.query).select('-password').lean(); // retrieves a User doc
  if (!users?.length) {
    throw new Error('400 No users found');
  }
  res.status(200).json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body;

  if (!username || !password) {
    throw new Error('400 Username and password fields are required.');
  }

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    throw new Error('409 Duplicate username.');
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userObject: TUser = {
    username,
    password: hashedPwd,
    refreshToken: '',
    firstName,
    lastName
  };

  const user = await User.create(userObject);

  if (user) {
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    throw new Error('400 Invalid user data received.');
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { username, patches } = req.body;
  // Confirm data (at a minimum, id and username have to be in req body)
  if (!username || !patches) {
    throw new Error('400 Username and patches fields are required.');
  }
  const user = await User.findOne({ username }).exec(); // Get the actual specific User document we want to update and save by ID
  if (!user) throw new Error('400 User not found.');

  for (const patch of patches) {
    const { path, op, value } = patch;
    if (path in UserSchemaFields === false) {
      throw new Error('400 Invalid patch path');
    }
    const { result, error } = await patchUser(user, op, path, value);
    if (error) {
      throw new Error(error);
    } else {
      user[path as keyof TUser] = result!;
    }
  }
  user.save();
  res.status(200).json({ message: `Successfully patched ${username}` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    throw new Error('400 Username field required.');
  }

  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw new Error('400 Username not found.');
  }

  await user.deleteOne().exec(); // deletes User document; result holds deleted user's information
  res.status(200).json({});
});

const patchUser = async function (
  user: TUser & { _id: Types.ObjectId },
  op: PatchOperations,
  path: UserSchemaFields,
  value: string
): Promise<{ result: string; error: undefined } | { result: undefined; error: string }> {
  switch (op) {
    // replace operation for username and password fields
    case 'replace':
      if (path === UserSchemaFields.username) {
        // Check for duplicate
        const duplicate = await User.findOne({ username: value }).lean().exec();
        if (duplicate && duplicate?._id !== user._id) {
          // requested username already exists with a User document that is NOT our user; so a no no, we don't want two users w same username!
          return { result: undefined, error: '400 Invalid patch value, duplicate username' };
        }
      } else if (path === UserSchemaFields.password) {
        value = await bcrypt.hash(value, 10);
      }
      break;
    default:
      return { result: undefined, error: '400 Invalid patch operation' };
  }
  return { result: value, error: undefined };
};

export default {
  getUser,
  createNewUser,
  updateUser,
  deleteUser
};
