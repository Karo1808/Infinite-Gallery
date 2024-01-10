import DownloadButton from "./DownloadButton";
import UserInfo from "./UserInfo";

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
    <figure className="mobile-image-container">
      <section className="mobile-view-topbar">
        <UserInfo
          username={username}
          profilePhoto={profilePhoto}
          profileLink={profileLink}
          type="topbar"
        />
      </section>
      <section>{children}</section>
      <section className="mobile-view-bottombar">
        <DownloadButton downloadLink={downloadLink} type="full" id={id} />
      </section>
    </figure>
  );
};

export default MobileImageWrapper;
