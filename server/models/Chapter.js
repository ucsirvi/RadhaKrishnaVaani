import mongoose from "mongoose";

const VerseSchema = new mongoose.Schema({
  chapter: { type: Number, required: true },
  verse: { type: Number, required: true },
  text: { type: String, required: true },
  commentaries: { type: String, required: true },
  translations: { type: String, required: true },
});

const BhagavadGitaChapterSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  BhagavadGitaChapter: [VerseSchema],
});

export default mongoose.model("BhagavadGitaChapter", BhagavadGitaChapterSchema);
