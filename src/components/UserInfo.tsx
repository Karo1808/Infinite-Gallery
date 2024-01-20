import { useState } from "react";
import ProfilePhotoSkeleton from "./ProfilePhotoSkeleton";

interface Props {
  username: string;
  profilePhoto: string;
  profileLink: string;
  type: "overlay" | "topbar" | "image-details";
}

const UserInfo = ({ username, profilePhoto, profileLink, type }: Props) => {
  const [isPhotoLoading, setIsPhotoLoading] = useState<boolean>(true);

  return (
    <div
      className={
        type === "image-details"
          ? "details-userinfo-container userinfo-container"
          : "userinfo-container"
      }
    >
      <a href={`${profileLink}`} target="_blank">
        {isPhotoLoading && (
          <ProfilePhotoSkeleton
            type={type === "image-details" ? "topbar" : type}
          />
        )}
        <img
          style={{ display: isPhotoLoading ? "none" : "block" }}
          className={`userinfo-profile-photo ${type}-profile-photo`}
          src={profilePhoto}
          alt="profile photo"
          onLoad={() => setIsPhotoLoading(false)}
        />
      </a>
      <a
        className={`userinfo-username ${
          type === "overlay" ? "overlay-username" : "topbar-username"
        }`}
        href={`${profileLink}`}
        target="_blank"
      >
        {username}
      </a>
    </div>
  );
};

export default UserInfo;
