import { useState } from "react";
import ProfilePhotoSkeleton from "./ProfilePhotoSkeleton";
import styles from "../styles/user-info.module.css";

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
          ? `${styles.details_userinfo_container} ${styles.userinfo_container}`
          : styles.userinfo_container
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
          className={`${styles.userinfo_profile_photo} ${
            type === "image-details"
              ? styles.image_details_profile_photo
              : type === "overlay"
              ? styles.overlay_profile_photo
              : styles.topbar_profile_photo
          }`}
          src={profilePhoto}
          alt="profile photo"
          onLoad={() => setIsPhotoLoading(false)}
        />
      </a>
      <a
        className={`${styles.userinfo_username} ${
          type === "overlay" ? styles.overlay_username : styles.topbar_username
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
