import mongoose from 'mongoose'
import crypto from 'crypto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'El nombre es requerido'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Correo ya registrado',
    match: [/.+\@.+\..+/, 'Ingrese una dirección de correo válida'],
    required: 'Ingrese una dirección de correo'
  },
  hashed_password: {
    type: String,
    required: "La contraseña es requerida"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false 
  },
  about: {
    type: String,
    trim: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'La contraseña debe contener al menos 6 carácteres')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'La contraseña es requerida')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },
  generateVerificationToken: function () {
    const user = this;
    const verificationToken = jwt.sign(
        { ID: user._id },
        process.env.USER_VERIFICATION_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    return verificationToken; }
}
export default mongoose.model('User', UserSchema)

