import DownloadButton from "./DownloadButton";
import UserInfo from "./UserInfo";
import styles from "../styles/mobile-image-wrapper.module.css";

interface Props {
  children: React.ReactNode;
  username: string;
  profilePhoto: string;
  profileLink: string;
  id: string;
  downloadLink: string;
}

const MobileImageWrapper = ({
  children,
  username,
  profilePhoto,
  profileLink,
  downloadLink,
  id,
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
        <DownloadButton downloadLink={downloadLink} type="full" id={id} />
      </section>
    </figure>
  );
};

export default MobileImageWrapper;
