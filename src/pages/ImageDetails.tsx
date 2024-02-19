import { useParams, useSearchParams } from "react-router-dom";
import { useInfinityQueryByUser, usePhotoById } from "../hooks";
import Image from "../components/Image";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import DownloadButton from "../components/DownloadButton";
import styles from "../styles/image-details-page.module.css";
import PhotoInfo from "../components/PhotoInfo";
import MiniGallery from "../components/MiniGallery";
import { useEffect } from "react";
import ShareButton from "../components/ShareButton";

const ImageDetails = () => {
  const { id: currentId } = useParams();
  const [searchParams] = useSearchParams();
  const { photo } = usePhotoById({ id: currentId || "" });
  const { photos: photosByUsername } = useInfinityQueryByUser();

  const usernameParam = searchParams.get("username");

  const currentPhoto = usernameParam
    ? photosByUsername?.find((photo) => photo.id === currentId)
    : photo;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentId]);

  if (!currentPhoto) return null;
  return (
    <div className={styles.container}>
      <main className={styles.image_details_page}>
        <section className={styles.image_details}>
          <Image
            byId={!usernameParam}
            key={`${currentPhoto.id}3`}
            imageType="full"
            currentId={currentId || ""}
            user={usernameParam ? currentPhoto.usernameId : ""}
          />
          <div className={styles.bottom}>
            <BottomBar>
              <UserInfo
                username={currentPhoto.username}
                profilePhoto={currentPhoto.userProfileImage}
                profileLink={currentPhoto.userProfileLink}
                type="image-details"
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
          </div>
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
