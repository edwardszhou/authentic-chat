import User from '@/models/User';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

const UserSchemaFields = Object.freeze({
  _id: Symbol('_id'),
  username: Symbol('username'),
  password: Symbol('password'),
  stats: Symbol('stats')
});

// @desc Get all users
// @route GET /users
// @access Private
const getUser = asyncHandler(async (req, res) => {
  for (const field in req.query) {
    if (field in UserSchemaFields === false)
      return res.status(400).json({ message: `Invalid query field '${field}'` });
  }

  const users = await User.find(req.query).select('-password').lean(); // retrieves a User doc
  if (!users?.length) {
    return res.status(400).json({ message: 'No users found' });
  }
  res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Confirm data (both username and password need to be in request body)
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password fields are required.' });
  }

  // Check for duplicates
  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate username' });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // hash and add 10 salt rounds to the password
  const userObject = { username, password: hashedPwd, refreshToken: '' };

  // Create and store new user
  const user = await User.create(userObject);
  if (user) {
    //created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: 'Invalid user data received.' });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { username, patches } = req.body;
  // Confirm data (at a minimum, id and username have to be in req body)
  if (!username || !patches) {
    return res.status(400).json({ message: 'username and patches fields are required' });
  }
  const user = await User.findOne({ username }).exec(); // Get the actual specific User document we want to update and save by ID
  if (!user) return res.status(400).json({ message: 'User not found' });

  for (const patch of patches) {
    const { path, op, value } = patch;
    if (path in UserSchemaFields === false) {
      return res.status(400).json({ message: 'Invalid patch path' });
    }
    const { result, error } = await patchUser(user, op, path, value);
    if (error) return res.status(400).json({ message: error });
    user[path] = result;
  }
  user.save();
  res.json({ message: `Successfully patched ${username}` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.body;
  if (!username) {
    // Request must have an ID bc we need ID to find the User document to delete
    return res.status(400).json({ message: 'username field Required' });
  }

  const user = await User.findOne({ username }).exec();
  if (!user) {
    // If no User document with requested ID
    return res.status(400).json({ message: 'User not found' });
  }

  await user.deleteOne().exec(); // deletes User document; result holds deleted user's information
  res.json({});
});

const patchUser = async function (user, op, path, value) {
  switch (op) {
    // replace operation for username and password fields
    case 'replace':
      if (typeof value !== 'string') return { error: 'Invalid patch value, must be a string' };

      if (path === 'username') {
        // Check for duplicate
        const duplicate = await User.findOne({ username: value }).lean().exec();
        if (duplicate && duplicate?._id.toString() !== user._id) {
          // requested username already exists with a User document that is NOT our user; so a no no, we don't want two users w same username!
          return { error: 'Invalid patch value, duplicate username' };
        }
      } else if (path === 'password') {
        value = await bcrypt.hash(value, 10);
      } else if (path !== 'refreshToken') {
        // if the path is not username, nor password, NOR refreshToken (there's nothing really to check hence why the condition is written like this)
        return { error: 'Invalid path' };
      }
      break;
    default:
      return { error: 'Invalid patch operation' };
  }
  return { result: value };
};

export default {
  getUser,
  createNewUser,
  updateUser,
  deleteUser
};
