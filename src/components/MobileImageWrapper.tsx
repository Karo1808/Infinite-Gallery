import DownloadButton from "./DownloadButton";
import UserInfo from "./UserInfo";
import styles from "../styles/mobile-image-wrapper.module.css";
import { Photo } from "../types";

interface Props {
  children: React.ReactNode;
  username: string;
  profilePhoto: string;
  profileLink: string;
  photo: Photo;
}

const MobileImageWrapper = ({
  children,
  username,
  profilePhoto,
  profileLink,
  photo,
}: Props) => {
  return (
    <figure className={styles.mobile_view_wrapper}>
      <section className={styles.mobile_view_topbar}>
        <UserInfo
          username={username}
          profilePhoto={profilePhoto}
          profileLink={profileLink}
          type="topbar"
        />
      </section>
      <section>{children}</section>
      <section className={styles.mobile_view_bottombar}>
        <DownloadButton photo={photo} type="full" />
      </section>
    </figure>
  );
};

export default MobileImageWrapper;
