import { useDownloadFile } from "react-downloadfile-hook";
import { GoDownload } from "react-icons/go";
import { handleDownload } from "../utils";
import { APP_NAME } from "../constants";
import { RefObject, SyntheticEvent, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  const handleClickImage = (e: SyntheticEvent, ref: RefObject<HTMLElement>) => {
    if (ref.current && e.target === ref.current) {
      navigate(`image/${id}`, { state: { previousLocation: location } });
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
        <div className="overlay-userinfo-container">
          <a href={`${profileLink}`} target="_blank">
            <img
              className="overlay-profile-photo"
              src={profilePhoto}
              alt="profile photo"
            />
          </a>
          <a
            className="overlay-username"
            href={`${profileLink}`}
            target="_blank"
          >
            {username}
          </a>
        </div>
        <button
          onClick={() => {
            handleDownload({
              imageLink: downloadLink,
              fileName: `${APP_NAME}.${id}.png`,
            });
          }}
          className="overlay-download-btn"
        >
          <GoDownload color={"#e9ecef"} size={25} />
        </button>
      </div>
    </>
  );
};

export default ImageOverlay;
