import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true},
    passwordHash: String
})

UserSchema.virtual('password').set(function (value) {
    this.passwordHash = bcrypt.hashSync(value, 8)
})

export default model('User', UserSchema)