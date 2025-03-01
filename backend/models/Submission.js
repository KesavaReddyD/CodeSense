// models/Submission.js
import mongoose from "mongoose";

const generativeQnASchema = new mongoose.Schema({
  question: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: Array },
  expectedAnswer: { type: String, required: true },
  expectedKeywords: { type: Array },
  studentAnswer: { type: String, default: '' }, // Initially empty
  aiFeedback: { type: String, default: '' }, // Initially empty
});

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  generativeQnA: [generativeQnASchema],
  grade: { type: Number, default: 0 },
  evaluatedByTeacher: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Submission", submissionSchema);