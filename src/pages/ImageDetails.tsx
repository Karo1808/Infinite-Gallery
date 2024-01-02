import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQueryImages, useUpdateColumnWidth } from "../hooks";
import Image from "../components/Image";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef } from "react";

const ImageDetails = () => {
  const { id: currentId } = useParams();

  const navigate = useNavigate();
  const modalRef = useRef<null | HTMLDivElement>(null);
  const { photos, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQueryImages();

  const [currentPhoto] =
    photos?.filter((photo) => photo.id === currentId) || [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && modalRef.current === e.target) {
        handleClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modalRef]);

  const handleClose = () => {
    navigate("/");
  };

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
    </div>
  );
};

export default ImageDetails;
