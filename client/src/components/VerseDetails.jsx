import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-purple-500 h-12 w-12 mb-4"></div>
  </div>
);

const VerseDetails = () => {
  const { chapterId, verseId } = useParams();
  const navigate = useNavigate();
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVerseDetails = async () => {
      try {
        const response = await axios.get(
          `https://radhakrishnavaani-server.onrender.com/api/chapters/${chapterId}/verse/${verseId}`
        );
        setVerse(response.data);
      } catch (err) {
        setError("Error fetching verse details");
      } finally {
        setLoading(false);
      }
    };

    fetchVerseDetails();
  }, [chapterId, verseId]);

  const handleNextVerse = () => {
    const nextVerseId = parseInt(verseId) + 1;
    navigate(`/chapters/${chapterId}/verse/${nextVerseId}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!verse) {
    return <p className="text-center text-lg text-gray-600">Verse not found</p>;
  }

  return (
    <div className="verse-details relative min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 py-10">
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-2xl mx-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-pink-200 opacity-30 rounded-lg"></div>
        <div className="absolute inset-0 animate-pulse bg-purple-300 opacity-20 rounded-lg"></div>

        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={handleNextVerse}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200 shadow-lg"
          >
            Next Verse
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-purple-900 relative z-10 mb-6 text-shadow animate-bounce font-sans">
          Chapter {verse.chapter}, Verse {verse.verse}
        </h1>
        <p className="mt-6 text-gray-800 relative z-10 text-shadow text-lg font-serif leading-relaxed">
          <strong className="text-purple-600">Original Text:</strong>{" "}
          {verse.text}
        </p>
        <p className="mt-4 text-gray-800 relative z-10 text-shadow text-lg font-serif leading-relaxed">
          <strong className="text-purple-600">Commentaries:</strong>{" "}
          {verse.commentaries}
        </p>
        <p className="mt-4 text-gray-800 relative z-10 text-shadow text-lg font-serif leading-relaxed">
          <strong className="text-purple-600">Translation:</strong>{" "}
          {verse.translations}
        </p>
      </div>
    </div>
  );
};

export default VerseDetails;
