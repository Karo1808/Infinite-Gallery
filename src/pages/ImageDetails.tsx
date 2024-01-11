import { useParams } from "react-router-dom";
import { usePhotoById } from "../hooks";
import MobileImageWrapper from "../components/MobileImageWrapper";
import Image from "../components/Image";

const ImageDetails = () => {
  const { id: currentId } = useParams();
  const { photo } = usePhotoById({ id: currentId || "" });
  console.log(currentId, photo);
  if (!photo) return null;
  return (
    <div>
      <MobileImageWrapper
        username={photo.username}
        profilePhoto={photo.userProfileImage}
        id={photo.id}
        profileLink={photo.userProfileLink}
        downloadLink={photo.downloadLink}
      >
        {<Image imageType="full" {...photo} />}
      </MobileImageWrapper>
    </div>
  );
};

export default ImageDetails;
