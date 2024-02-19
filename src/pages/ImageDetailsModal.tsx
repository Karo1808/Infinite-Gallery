import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  useArrowKeys,
  useInfiniteQueryImages,
  useInfinityQueryByUser,
  useModalClose,
  useUpdateColumnWidth,
} from "../hooks";
import Image from "../components/Image";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import { IoMdClose, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRootLocationContext } from "../context/root-location-context";
import { useEffect, useRef } from "react";
import DownloadButton from "../components/DownloadButton";
import styles from "../styles/image-details-modal.module.css";
import PhotoInfo from "../components/PhotoInfo";
import MiniGallery from "../components/MiniGallery";
import { formatSearchParams } from "../utils";
import { useIsUserContext } from "../context/is-user-context";
import ShareButton from "../components/ShareButton";

const ImageDetailsModal = () => {
  const { id: currentId } = useParams();
  const navigate = useNavigate();
  const { rootLocation } = useRootLocationContext();
  const [searchParams] = useSearchParams();
  const { isUser, setIsUser } = useIsUserContext();
  const scrollRef = useRef<HTMLElement | null>(null);
  const {
    photos: allPhotos,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQueryImages();

  const { photos: photosByUsername } = useInfinityQueryByUser();

  const photos = isUser ? photosByUsername : allPhotos;

  const handleClose = () => {
    setIsUser(false);
    navigate({
      pathname: rootLocation?.pathname,
      search: searchParams.toString(),
    });
  };

  const modalRef = useModalClose({ handler: handleClose });

  const currentPhoto = photos?.find((photo) => photo.id === currentId);
  const currentIndex = photos?.findIndex((photo) => photo.id === currentId);

  const query = searchParams.get("query");

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
          search: formatSearchParams({
            query,
            username: photos[nextIndex].usernameId,
          }),
        },
        {
          state: { background: rootLocation },
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
          search: formatSearchParams({
            query,
            username: photos[previousIndex].usernameId,
          }),
        },
        {
          state: { background: rootLocation },
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

  useEffect(() => {
    console.log("fired");
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentId]);

  if (!currentPhoto) return;

  return (
    <div className={styles.modal} ref={modalRef}>
      <main className={styles.modal_content} ref={scrollRef}>
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
            user={isUser ? currentPhoto.usernameId : ""}
          />
        </div>
        <section className={styles.bottom_bar}>
          <BottomBar>
            <PhotoInfo
              description={currentPhoto.altDescription}
              location={currentPhoto.location}
              date={currentPhoto.date}
            />
            <div className={styles.button_container}>
              <ShareButton imageLink={currentPhoto.rawLink} />
              <DownloadButton
                downloadLink={currentPhoto.downloadLink}
                type="full"
                id={currentPhoto.id}
              />
            </div>
          </BottomBar>
        </section>
        <footer className={styles.footer}>
          <p className={styles.more_images}>
            More images by {currentPhoto.username}
          </p>
          <MiniGallery />
        </footer>
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
