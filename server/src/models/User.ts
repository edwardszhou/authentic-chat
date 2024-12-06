import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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
  stats: Map,
  refreshToken: String
});

/**
 * Search for user's templates by template name
 *
 * @param {String} name
 * @returns promise resolving to template document
 */
// UserSchema.methods.getTemplateByName = function (name) {
//   return Template.findOne({ parentUser: this._id, name: name });
// };

export default mongoose.model('User', UserSchema);
