import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/2.jpg";

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/chapters`);
        const data = await response.json();
        setChapters(data);
      } catch (error) {
        console.error("Failed to fetch chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  return (
    <div className="bg-gradient-to-b from-pink-50 to-purple-200 min-h-screen p-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30 z-0">
        <img
          src={bg}
          alt="Floral Design"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <h1 className="text-5xl font-extrabold text-purple-800 mb-4">
          Chapters of <span className="text-yellow-600">Bhagavad Gita</span>
        </h1>
        <p className="text-lg text-gray-700 mb-10 italic">
          Explore the sacred verses from each chapter of the Bhagavad Gita.
        </p>

        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {chapters.map((chapter) => (
              <Link
                key={chapter._id}
                to={`/chapters/${chapter.BhagavadGitaChapter[0].chapter}`}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out text-purple-900 hover:text-purple-600 relative overflow-hidden border-l-4 border-yellow-500"
              >
                <h2 className="text-2xl font-bold mb-2">
                  Chapter {chapter.BhagavadGitaChapter[0].chapter}
                </h2>
                <p className="text-md text-gray-600">
                  Discover the wisdom of Chapter{" "}
                  {chapter.BhagavadGitaChapter[0].chapter}
                </p>
                {/* Radha's silhouette effect on hover */}
                <div className="absolute inset-0 bg-pink-200 opacity-0 hover:opacity-50 transition duration-300 rounded-lg"></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chapters;
