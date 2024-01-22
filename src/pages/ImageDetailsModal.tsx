import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useArrowKeys, useInfiniteQueryImages, useModalClose } from "../hooks";
import Image from "../components/Image";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRootLocationContext } from "../context/root-location-context";
import { useEffect } from "react";
import DownloadButton from "../components/DownloadButton";
import styles from "../styles/image-details-modal.module.css";

const ImageDetailsModal = () => {
  const { id: currentId } = useParams();
  const navigate = useNavigate();
  const { rootLocation } = useRootLocationContext();
  const [searchParams, _] = useSearchParams();

  const { photos, fetchNextPage, fetchPreviousPage } = useInfiniteQueryImages();
  const handleClose = () => {
    navigate(
      { pathname: "/", search: searchParams.toString() },
      { replace: true }
    );
  };
  const modalRef = useModalClose({ handler: handleClose });

  const currentPhoto = photos?.find((photo) => photo.id === currentId);
  const currentIndex = photos?.findIndex((photo) => photo.id === currentId);

  useEffect(() => {
    if (photos) {
      if (currentIndex === photos.length - 1) fetchNextPage();
      if (currentIndex === 0) fetchPreviousPage();
    }
  }, [currentIndex]);

  const handleNextPhoto = () => {
    const nextIndex = currentIndex !== undefined ? currentIndex + 1 : 0;

    if (photos && photos.length > nextIndex) {
      2;
      navigate(
        {
          pathname: `/image/${photos[nextIndex].id}`,
          search: searchParams.toString(),
        },
        {
          state: { background: rootLocation },
          replace: true,
        }
      );
    } else {
      console.error("Invalid currentIndex or no photos available");
    }
  };

  const handlePreviousPhoto = () => {
    const previousIndex = currentIndex !== undefined ? currentIndex - 1 : 0;

    if (photos && photos.length > previousIndex) {
      2;
      navigate(
        {
          pathname: `/image/${photos[previousIndex].id}`,
          search: searchParams.toString(),
        },
        {
          state: { background: rootLocation },
          replace: true,
        }
      );
    } else {
      console.error("Invalid currentIndex or no photos available");
    }
  };

  useArrowKeys({
    handleNextPage: handleNextPhoto,
    handlePreviousPage: handlePreviousPhoto,
  });

  if (!currentPhoto) return;

  return (
    <div className={styles.modal} ref={modalRef}>
      <main className={styles.modal_content}>
        <section className={styles.modal_topbar}>
          <UserInfo
            username={currentPhoto.username}
            profileLink={currentPhoto.userProfileLink}
            profilePhoto={currentPhoto.userProfileImage}
            type="topbar"
            key={`${currentPhoto.id}2`}
          />
          <button onClick={handleClose} className={styles.modal_close}>
            <IoMdClose size={30} />
          </button>
        </section>
        <div className={styles.modal_image}>
          <Image
            key={`${currentPhoto.id}2`}
            imageType="full"
            currentId={currentPhoto.id}
          />
        </div>
        <BottomBar>
          <DownloadButton
            downloadLink={currentPhoto.downloadLink}
            type="full"
            id={currentPhoto.id}
          />
        </BottomBar>
      </main>
      <button
        onClick={handlePreviousPhoto}
        className={`${styles.modal_btn_direction} ${styles.modal_btn_left}`}
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={handleNextPhoto}
        className={`${styles.modal_btn_direction} ${styles.modal_btn_right}`}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default ImageDetailsModal;
