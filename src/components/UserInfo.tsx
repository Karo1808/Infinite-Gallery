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
  const [photoStatus, setPhotoStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  return (
    <div
      className={
        type === "image-details"
          ? `${styles.details_userinfo_container} ${styles.userinfo_container}`
          : styles.userinfo_container
      }
    >
      <a href={profileLink} target="_blank" rel="noreferrer">
        {photoStatus === "loading" && (
          <ProfilePhotoSkeleton
            type={type === "image-details" ? "topbar" : type}
          />
        )}
        <img
          style={{ display: photoStatus === "loaded" ? "block" : "none" }}
          className={`${styles.userinfo_profile_photo} ${
            type === "image-details"
              ? styles.image_details_profile_photo
              : type === "overlay"
              ? styles.overlay_profile_photo
              : styles.topbar_profile_photo
          }`}
          src={profilePhoto}
          alt={`${username}'s profile`}
          onLoad={() => setPhotoStatus("loaded")}
          onError={() => setPhotoStatus("error")}
        />
        {photoStatus === "error" && (
          <span className={styles.profile_fallback} aria-hidden="true">
            {username.charAt(0).toUpperCase()}
          </span>
        )}
      </a>
      <a
        className={`${styles.userinfo_username} ${
          type === "overlay" ? styles.overlay_username : styles.topbar_username
        }`}
        href={profileLink}
        target="_blank"
        rel="noreferrer"
      >
        {username}
      </a>
    </div>
  );
};

export default UserInfo;
