import { useCallback, useEffect, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import {
  Location,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BottomBar from "../components/BottomBar";
import DownloadButton from "../components/DownloadButton";
import Image from "../components/Image";
import MiniGallery from "../components/MiniGallery";
import PhotoInfo from "../components/PhotoInfo";
import ShareButton from "../components/ShareButton";
import UserInfo from "../components/UserInfo";
import {
  useArrowKeys,
  useInfiniteQueryImages,
  useInfinityQueryByUser,
  useModalClose,
  usePhotoById,
} from "../hooks";
import styles from "../styles/image-details-modal.module.css";
import { formatSearchParams } from "../utils";

const ImageDetailsModal = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state as {
    background?: Location;
    source?: "gallery" | "user";
  };
  const background = routeState?.background;
  const isUserGallery = routeState?.source === "user";
  const [searchParams] = useSearchParams();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const galleryQuery = useInfiniteQueryImages(!isUserGallery);
  const userQuery = useInfinityQueryByUser(undefined, isUserGallery);
  const activeQuery = isUserGallery ? userQuery : galleryQuery;
  const {
    photos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
  } = activeQuery;
  const currentIndex = photos.findIndex((photo) => photo.id === id);
  const listedPhoto = photos[currentIndex];
  const detailQuery = usePhotoById({ id, enabled: !listedPhoto });
  const currentPhoto = listedPhoto ?? detailQuery.photo;

  const handleClose = useCallback(() => {
    if (background) navigate(-1);
    else navigate("/", { replace: true });
  }, [background, navigate]);

  const modalRef = useModalClose({ handler: handleClose });

  useEffect(() => {
    if (
      currentIndex >= photos.length - 3 &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetchNextPageError
    ) {
      fetchNextPage();
    }
  }, [
    currentIndex,
    fetchNextPage,
    hasNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
    photos.length,
  ]);

  const navigateToPhoto = useCallback(
    (index: number) => {
      const photo = photos[index];
      if (!photo) return;

      navigate(
        {
          pathname: `/image/${photo.id}`,
          search: formatSearchParams({
            query: searchParams.get("query"),
            username: photo.usernameId,
          }),
        },
        {
          replace: true,
          state: {
            background,
            source: isUserGallery ? "user" : "gallery",
          },
        }
      );
    },
    [background, isUserGallery, navigate, photos, searchParams]
  );

  const handleNextPhoto = useCallback(
    () => navigateToPhoto(currentIndex + 1),
    [currentIndex, navigateToPhoto]
  );
  const handlePreviousPhoto = useCallback(
    () => navigateToPhoto(currentIndex - 1),
    [currentIndex, navigateToPhoto]
  );

  useArrowKeys({
    handleNextPage: handleNextPhoto,
    handlePreviousPage: handlePreviousPhoto,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement.current?.focus();
    };
  }, []);

  useEffect(() => closeButtonRef.current?.focus(), [currentPhoto]);

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab" || !scrollRef.current) return;
    const focusableElements = Array.from(
      scrollRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    if (focusableElements.length === 0) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!currentPhoto) {
    return (
      <div className={styles.modal} ref={modalRef} role="presentation">
        <div
          className={styles.modal_status}
          role="dialog"
          aria-modal="true"
          aria-label="Photo details"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className={styles.modal_close}
            aria-label="Close photo details"
          >
            <IoMdClose size={30} />
          </button>
          <p role="status">
            {detailQuery.isError
              ? "Unable to load this photo."
              : "Loading photo..."}
          </p>
        </div>
      </div>
    );
  }

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < photos.length - 1;

  return (
    <div className={styles.modal} ref={modalRef} role="presentation">
      <div
        className={styles.modal_content}
        ref={scrollRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo by ${currentPhoto.username}`}
        onKeyDown={handleDialogKeyDown}
      >
        <section className={styles.modal_topbar}>
          <UserInfo
            username={currentPhoto.username}
            profileLink={currentPhoto.userProfileLink}
            profilePhoto={currentPhoto.userProfileImage}
            type="topbar"
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className={styles.modal_close}
            aria-label="Close photo details"
          >
            <IoMdClose size={30} />
          </button>
        </section>
        <div className={styles.modal_image}>
          <Image key={currentPhoto.id} imageType="full" photo={currentPhoto} />
        </div>
        <section className={styles.bottom_bar}>
          <BottomBar>
            <PhotoInfo
              description={currentPhoto.altDescription}
              location={currentPhoto.location}
              date={currentPhoto.date}
            />
            <div className={styles.button_container}>
              <ShareButton />
              <DownloadButton photo={currentPhoto} type="full" />
            </div>
          </BottomBar>
        </section>
        <footer className={styles.footer}>
          <p className={styles.more_images}>
            More images by {currentPhoto.username}
          </p>
          <MiniGallery username={currentPhoto.usernameId} />
        </footer>
        <button
          type="button"
          onClick={handlePreviousPhoto}
          disabled={!canGoPrevious}
          aria-label="Previous photo"
          className={`${styles.modal_btn_direction} ${styles.modal_btn_left}`}
        >
          <IoIosArrowBack />
        </button>
        <button
          type="button"
          onClick={handleNextPhoto}
          disabled={!canGoNext}
          aria-label="Next photo"
          className={`${styles.modal_btn_direction} ${styles.modal_btn_right}`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ImageDetailsModal;
