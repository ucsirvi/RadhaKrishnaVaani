import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaBook, FaQuoteRight } from "react-icons/fa";

const ChapterDetails = () => {
  const { chapterId } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVerses, setFilteredVerses] = useState([]);

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        const response = await fetch(`/api/chapters/${chapterId}`);
        const data = await response.json();
        setChapter(data);
        setFilteredVerses(data.BhagavadGitaChapter);
      } catch (error) {
        console.error("Failed to fetch chapter details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapterDetails();
  }, [chapterId]);

  useEffect(() => {
    if (chapter) {
      const filtered = chapter.BhagavadGitaChapter.filter(
        (verse) =>
          verse.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          verse.verse.toString().includes(searchQuery)
      );
      setFilteredVerses(filtered);
    }
  }, [searchQuery, chapter]);

  if (!chapter && !loading)
    return <div className="text-center text-red-600">Chapter not found.</div>;

  return (
    <div className="bg-gradient-to-b from-pink-50 to-purple-200 min-h-screen p-10 relative">
      <div className="max-w-6xl mx-auto text-center z-10 relative">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <h1 className="text-5xl font-extrabold text-purple-800 mb-4">
              Chapter {chapter.BhagavadGitaChapter[0].chapter}
            </h1>
            <p className="text-lg text-gray-700 mb-8 italic">
              <FaQuoteRight className="inline-block mr-2 text-purple-600" />
              Dive into the profound wisdom of this chapter.
              <FaQuoteRight className="inline-block mr-2 text-purple-600" />
            </p>

            <div className="mb-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search verse by number..."
                className="w-full max-w-md px-4 py-2 text-lg text-gray-700 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-600 transition"
              />
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredVerses.length > 0 ? (
                filteredVerses.map((verse) => (
                  <Link
                    key={verse.verse}
                    to={`/chapters/${chapterId}/verse/${verse.verse}`}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out text-purple-900 hover:text-purple-600 relative overflow-hidden border-l-4 border-yellow-500"
                  >
                    <div className="flex items-center mb-4">
                      <FaBook className="text-3xl text-purple-600 mr-2" />
                      <h2 className="text-2xl font-bold">
                        Verse {verse.verse}
                      </h2>
                    </div>
                    <p className="mt-2 text-md text-gray-600">{verse.text}</p>
                  </Link>
                ))
              ) : (
                <div className="col-span-3 text-red-600 font-semibold">
                  No verses match your search query.
                </div>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterDetails;
