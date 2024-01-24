import { useParams } from "react-router-dom";
import { useInfinityQueryByUser, usePhotoById } from "../hooks";
import Image from "../components/Image";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import DownloadButton from "../components/DownloadButton";
import styles from "../styles/image-details-page.module.css";
import PhotoInfo from "../components/PhotoInfo";
import MiniGallery from "../components/MiniGallery";
import { useIsUserContext } from "../context/is-user-context";

const ImageDetails = () => {
  const { id: currentId } = useParams();
  const { isUser } = useIsUserContext();
  const { photo } = usePhotoById({ id: currentId || "" });
  const { photos: photosByUsername } = useInfinityQueryByUser();

  const currentPhoto = isUser
    ? photosByUsername?.find((photo) => photo.id === currentId)
    : photo;

  if (!currentPhoto) return null;
  return (
    <div className={styles.container}>
      <main className={styles.image_details_page}>
        <section className={styles.image_details}>
          <Image
            byId={true}
            key={`${currentPhoto.id}3`}
            imageType="thumbnail"
            currentId={currentId || ""}
            user={isUser ? currentPhoto.usernameId : ""}
          />
          <BottomBar>
            <UserInfo
              username={currentPhoto.username}
              profilePhoto={currentPhoto.userProfileImage}
              profileLink={currentPhoto.userProfileLink}
              type="image-details"
            />
            <DownloadButton
              downloadLink={currentPhoto.downloadLink}
              type="full"
              id={currentPhoto.id}
            />
          </BottomBar>
          <section className={styles.details}>
            <PhotoInfo
              description={currentPhoto.altDescription}
              location={currentPhoto.location}
              date={currentPhoto.date}
            />
          </section>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.more_images}>
          More images by {currentPhoto.username}
        </p>
        <MiniGallery />
      </footer>
    </div>
  );
};

export default ImageDetails;
