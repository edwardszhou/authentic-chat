import mongoose from 'mongoose';

export type TUser = {
  username: string;
  password: string;
  refreshToken?: string;
  profileImg?: string;
};

export enum UserSchemaFields {
  username = 'username',
  password = 'password',
  refreshToken = 'refreshToken',
  profileImg = 'profileImg'
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
  refreshToken: String,
  profileImg: String
});

export default mongoose.model('User', UserSchema);
