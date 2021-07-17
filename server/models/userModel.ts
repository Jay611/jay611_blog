import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add your name.'],
      trim: true,
      maxLength: [20, 'Your name is up to 20 chars long.'],
    },
    account: {
      type: String,
      required: [true, 'please add your email or phone.'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please add your password.'],
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dhkcdaal8/image/upload/v1626467456/blog/noAvatar_ohldtt.png',
    },
    role: {
      type: String,
      default: 'user', // or admin
    },
    type: {
      type: String,
      default: 'normal', // or fase
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
