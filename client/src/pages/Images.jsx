import { useState } from "react";
import Masonry from "react-masonry-css";
import Modal from "react-modal";
import useFetch from "../hooks/useFetch.jsx";
import { ClipLoader } from "react-spinners";

const Images = () => {
  const { data: images, loading, error } = useFetch("https://radhakrishnavaani-server.onrender.com/api/images");

  const [filter, setFilter] = useState("all");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    filter === "all" ? images : images.filter((img) => img.category === filter);

  const openLightbox = (img) => {
    setSelectedImage(img);
    setModalIsOpen(true);
  };

  const closeLightbox = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={60} color={"#6B46C1"} loading={loading} />
      </div>
    );
  }

  if (error) {
    let errorMessage = "An error occurred while fetching images.";

    if (error.message) {
      if (error.message.includes("NetworkError")) {
        errorMessage = "Network error: Please check your internet connection.";
      } else if (error.message.includes("404")) {
        errorMessage = "Error 404: The resource could not be found.";
      } else if (error.message.includes("500")) {
        errorMessage = "Server error: Please try again later.";
      } else {
        errorMessage = `Unexpected error: ${error.message}`;
      }
    }

    return <div className="text-red-500">{errorMessage}</div>;
  }

  if (!images || images.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No images available to display.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Image Gallery</h1>

      <Masonry
        breakpointCols={3}
        className="flex justify-center"
        columnClassName="my-masonry-grid_column"
      >
        {filteredImages.map((image) => (
          <div key={image.id} className="p-1">
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-50 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl hover:brightness-90"
              onClick={() => openLightbox(image)}
            />
          </div>
        ))}
      </Masonry>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeLightbox}
        contentLabel="Image Lightbox"
        ariaHideApp={false}
        className="flex items-center justify-center"
      >
        {selectedImage && (
          <div className="relative">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="m-40 max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-40 right-40 p-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Images;
