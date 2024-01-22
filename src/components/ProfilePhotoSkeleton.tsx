import styles from "../styles/profile-photo-skeleton.module.css";

const ProfilePhotoSkeleton = ({ type }: { type: "overlay" | "topbar" }) => {
  return (
    <div
      className={
        type === "overlay"
          ? styles.overlay_skeleton_profile_photo
          : styles.topbar_skeleton_profile_photo
      }
    ></div>
  );
};

export default ProfilePhotoSkeleton;
