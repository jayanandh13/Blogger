import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], 
  },
  date: {
    type: Date,
    default: Date.now, 
  },
});


const EmailModel = mongoose.models.Email || mongoose.model('Email', EmailSchema);

export default EmailModel;
