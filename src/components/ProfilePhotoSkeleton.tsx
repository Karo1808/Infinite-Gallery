const ProfilePhotoSkeleton = ({ type }: { type: "overlay" | "topbar" }) => {
  return (
    <div
      className={`skeleton-profile-photo ${type}-skeleton-profile-photo`}
    ></div>
  );
};

export default ProfilePhotoSkeleton;
