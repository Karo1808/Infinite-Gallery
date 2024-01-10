import { RefObject, SyntheticEvent, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import UserInfo from "./UserInfo";
import { useRootLocationContext } from "../context/root-location-context";
import DownloadButton from "./DownloadButton";

interface Props {
  username: string;
  profilePhoto: string;
  profileLink: string;
  id: string;
  downloadLink: string;
}

const ImageOverlay = ({
  username,
  profilePhoto,
  profileLink,
  id,
  downloadLink,
}: Props) => {
  const imageRef = useRef(null);
  const userRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setRootLocation } = useRootLocationContext();
  const [searchParams, _] = useSearchParams();

  const handleClickImage = (e: SyntheticEvent, ref: RefObject<HTMLElement>) => {
    if (ref.current && e.target === ref.current) {
      setRootLocation(location);
      navigate(
        { pathname: `image/${id}`, search: searchParams.toString() },
        {
          state: { background: location },
        }
      );
    }
  };

  return (
    <>
      <div
        className="overlay-background"
        ref={imageRef}
        onClick={(e) => {
          handleClickImage(e, imageRef);
        }}
      />
      <div
        className="overlay-user"
        ref={userRef}
        onClick={(e) => {
          handleClickImage(e, userRef);
        }}
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
