import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import DownloadButton from "../components/DownloadButton";
import Image from "../components/Image";
import MiniGallery from "../components/MiniGallery";
import PhotoInfo from "../components/PhotoInfo";
import ShareButton from "../components/ShareButton";
import UserInfo from "../components/UserInfo";
import { usePhotoById } from "../hooks";
import styles from "../styles/image-details-page.module.css";

const ImageDetails = () => {
  const { id = "" } = useParams();
  const { photo, isPending, isError, error } = usePhotoById({ id });

  useEffect(() => window.scrollTo(0, 0), [id]);

  if (isPending) {
    return <div className={styles.status}>Loading photo...</div>;
  }

  if (isError) {
    return (
      <div className={styles.status} role="alert">
        <h1>Unable to load this photo</h1>
        <p>{error instanceof Error ? error.message : "Please try again later."}</p>
      </div>
    );
  }

  if (!photo) {
    return (
      <div className={styles.status}>
        <h1>Photo not found</h1>
        <p>The requested image may no longer be available.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.image_details_page}>
        <section className={styles.image_details}>
          <Image key={photo.id} imageType="full" photo={photo} />
          <div className={styles.bottom}>
            <BottomBar>
              <UserInfo
                username={photo.username}
                profilePhoto={photo.userProfileImage}
                profileLink={photo.userProfileLink}
                type="image-details"
              />
              <div className={styles.button_container}>
                <ShareButton />
                <DownloadButton photo={photo} type="full" />
              </div>
            </BottomBar>
          </div>
          <section className={styles.details}>
            <PhotoInfo
              description={photo.altDescription}
              location={photo.location}
              date={photo.date}
            />
          </section>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.more_images}>More images by {photo.username}</p>
        <MiniGallery username={photo.usernameId} />
      </footer>
    </div>
  );
};

export default ImageDetails;
