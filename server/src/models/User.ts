import mongoose from 'mongoose';

export type TUser = {
  username: string;
  password: string;
  refreshToken?: string;
  profileImg?: string;
  firstName?: string;
  lastName?: string;
};

export enum UserSchemaFields {
  username = 'username',
  password = 'password',
  refreshToken = 'refreshToken',
  profileImg = 'profileImg',
  firstName = 'firstName',
  lastName = 'lastName'
}

const UserSchema = new mongoose.Schema<TUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^\S*$/ // no whitespace
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  refreshToken: String,
  profileImg: String
});

export default mongoose.model('User', UserSchema);
