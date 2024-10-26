import express from "express";
import BhagavadGitaChapter from "../models/Chapter.js";

const app = express();

export const getAllChapters = async (req, res) => {
  try {
    const chapters = await BhagavadGitaChapter.find();
    res.json(chapters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load chapters" });
  }
};

export const getChapterById = async (req, res) => {
  const { chapterId } = req.params;

  try {
    const chapter = await BhagavadGitaChapter.findOne({
      "BhagavadGitaChapter.chapter": Number(chapterId),
    });

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.json(chapter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load chapter" });
  }
};

export const getVerseById = async (req, res) => {
  const { chapterId, verseId } = req.params;

  try {
    const chapter = await BhagavadGitaChapter.findOne({
      "BhagavadGitaChapter.chapter": Number(chapterId),
    });

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    const verse = chapter.BhagavadGitaChapter.find(
      (v) => v.verse === Number(verseId)
    );

    if (!verse) {
      return res.status(404).json({ message: "Verse not found" });
    }

    res.json(verse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load verse details" });
  }
};
