import { useParams } from "react-router-dom";
import { usePhotoById } from "../hooks";
import Image from "../components/Image";
import UserInfo from "../components/UserInfo";
import BottomBar from "../components/BottomBar";
import DownloadButton from "../components/DownloadButton";

const ImageDetails = () => {
  const { id: currentId } = useParams();
  const { photo } = usePhotoById({ id: currentId || "" });
  console.log(currentId, photo);
  if (!photo) return null;
  return (
    <>
      <div className="image-details-page">
        <UserInfo
          username={photo.username}
          profilePhoto={photo.userProfileImage}
          profileLink={photo.userProfileLink}
          type="image-details"
        />
        <Image byId={true} imageType="full" currentId={currentId || ""} />
        <BottomBar>
          <DownloadButton
            downloadLink={photo.downloadLink}
            type="full"
            id={photo.id}
          />
        </BottomBar>
      </div>
    </>
  );
};

export default ImageDetails;
