import styles from "../styles/overlay.module.css";
import { Photo } from "../types";
import DownloadButton from "./DownloadButton";
import UserInfo from "./UserInfo";

interface Props {
  photo: Photo;
  openPhoto: () => void;
}

const ImageOverlay = ({ photo, openPhoto }: Props) => (
  <>
    <button
      type="button"
      onClick={openPhoto}
      className={styles.overlay_background}
      aria-label={`View ${photo.altDescription ?? `photo by ${photo.username}`}`}
    />
    <div className={styles.overlay_user}>
      <UserInfo
        username={photo.username}
        profileLink={photo.userProfileLink}
        profilePhoto={photo.userProfileImage}
        type="overlay"
      />
      <DownloadButton photo={photo} type="overlay" />
    </div>
  </>
);

export default ImageOverlay;
