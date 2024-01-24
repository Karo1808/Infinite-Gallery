import { RefObject, SyntheticEvent, useRef } from "react";
import UserInfo from "./UserInfo";
import DownloadButton from "./DownloadButton";
import styles from "../styles/overlay.module.css";

interface Props {
  username: string;
  profilePhoto: string;
  profileLink: string;
  id: string;
  downloadLink: string;
  handleClick: (e: SyntheticEvent, ref: RefObject<HTMLElement>) => void;
}

const ImageOverlay = ({
  username,
  profilePhoto,
  profileLink,
  id,
  downloadLink,
  handleClick,
}: Props) => {
  const userRef = useRef(null);
  const imageRef = useRef(null);
  return (
    <>
      <div
        onClick={(e) => handleClick(e, imageRef)}
        className={styles.overlay_background}
        ref={imageRef}
      />

      <div
        onClick={(e) => handleClick(e, userRef)}
        className={styles.overlay_user}
        ref={userRef}
      >
        <UserInfo
          username={username}
          profileLink={profileLink}
          profilePhoto={profilePhoto}
          type="overlay"
        />
        <DownloadButton id={id} downloadLink={downloadLink} type="overlay" />
      </div>
    </>
  );
};

export default ImageOverlay;
