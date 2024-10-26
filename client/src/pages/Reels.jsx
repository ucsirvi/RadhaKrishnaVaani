import { useEffect, useState, useRef } from "react";

const MuteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12H3m9-9l7 7-7 7M4 4l16 16"
    />
  </svg>
);

const UnmuteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v18m9-9H3"
    />
  </svg>
);

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef([]);
  const observer = useRef(null);

  const shuffleArray = (array) => {
    let currentIndex = array.length,
      randomIndex;

    const shuffledArray = [...array];

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }

    return shuffledArray;
  };

  useEffect(() => {
    fetch("https://radhakrishnavaani-server.onrender.com/api/reels")
      .then((res) => res.json())
      .then((data) => {
        const shuffledVideos = shuffleArray(data);
        setVideos(shuffledVideos);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  useEffect(() => {
    if (videos.length > 0) {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const videoElement = entry.target.querySelector("video");
            if (entry.isIntersecting) {
              videoElement.play();
            } else {
              videoElement.pause();
            }
          });
        },
        { threshold: 0.7 }
      );

      videoRefs.current.forEach((ref) => {
        if (ref) {
          observer.current.observe(ref);
        }
      });

      scrollToFirstVideo();

      return () => {
        if (observer.current) observer.current.disconnect();
      };
    }
  }, [videos]);

  const scrollToFirstVideo = () => {
    if (videoRefs.current[0]) {
      videoRefs.current[0].scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    videoRefs.current.forEach((reelContainer) => {
      const videoElement = reelContainer.querySelector("video");
      if (videoElement) {
        videoElement.muted = !muted;
      }
    });
  };

  const handleVideoClick = (videoElement) => {
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  return (
    <div className="flex justify-center h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory">
      <div className="flex w-full max-w-5xl">
        <div className="flex-1 flex flex-col items-center w-full h-screen overflow-y-scroll snap-y snap-mandatory">
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <div
                key={video._id}
                ref={(el) => (videoRefs.current[index] = el)}
                className="snap-start w-full max-w-md h-screen relative flex justify-center"
              >
                <video
                  src={video.url}
                  className="w-full h-full object-cover"
                  loop
                  muted={muted}
                  onClick={(e) => handleVideoClick(e.target)}
                ></video>

                <div className="absolute top-4 right-4 z-10">
                  <button
                    className="bg-white p-2 rounded-full text-black"
                    onClick={toggleMute}
                  >
                    {muted ? <MuteIcon /> : <UnmuteIcon />}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reels;
