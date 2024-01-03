import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQueryImages, useModalClose } from "../hooks";
import Image from "../components/Image";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRootLocationContext } from "../context/root-location-context";
import { useEffect } from "react";

const ImageDetails = () => {
  const { id: currentId } = useParams();
  const navigate = useNavigate();
  const { rootLocation } = useRootLocationContext();

  const { photos, fetchNextPage, fetchPreviousPage } = useInfiniteQueryImages();
  const handleClose = () => {
    navigate("/");
  };
  const modalRef = useModalClose({ handler: handleClose });

  const currentPhoto = photos?.find((photo) => photo.id === currentId);
  const currentIndex = photos?.findIndex((photo) => photo.id === currentId);

  useEffect(() => {
    console.log("Component has been mounted");
    // You can return a cleanup function here if needed
    return () => {
      console.log("Component will unmount"); // Optional cleanup logic
    };
  }, []);

  useEffect(() => {
    if (photos) {
      if (currentIndex === photos?.length - 1) fetchNextPage();
      if (currentIndex === 0) fetchPreviousPage();
    }
  }, [currentIndex]);

  const handleNextPhoto = () => {
    const nextIndex = currentIndex !== undefined ? currentIndex + 1 : 0;

    if (photos && photos.length > nextIndex) {
      2;
      navigate(`/image/${photos[nextIndex].id}`, {
        state: { background: rootLocation },
        replace: true,
      });
    } else {
      console.error("Invalid currentIndex or no photos available");
    }
  };

  const handlePreviousPhoto = () => {
    const previousIndex = currentIndex !== undefined ? currentIndex - 1 : 0;

    if (photos && photos.length > previousIndex) {
      2;
      navigate(`/image/${photos[previousIndex].id}`, {
        state: { background: rootLocation },
      });
    } else {
      console.error("Invalid currentIndex or no photos available");
    }
  };

  if (!currentPhoto) return;

  return (
    <div className="modal" ref={modalRef}>
      <main className="modal-content">
        <section className="modal-topbar">
          <UserInfo
            username={currentPhoto.username}
            profileLink={currentPhoto.userProfileLink}
            profilePhoto={currentPhoto.userProfileImage}
            type="topbar"
          />
          <button onClick={handleClose} className="btn-modal-close">
            <IoMdClose size={30} />
          </button>
        </section>
        <div className="modal-image">
          <Image {...currentPhoto} imageType="full" />
        </div>
        <BottomBar />
      </main>
      <button
        onClick={handlePreviousPhoto}
        className="modal-btn-direction modal-btn-left"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={handleNextPhoto}
        className="modal-btn-direction modal-btn-right"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default ImageDetails;
