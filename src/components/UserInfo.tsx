interface Props {
  username: string;
  profilePhoto: string;
  profileLink: string;
  type: "overlay" | "topbar";
}

const UserInfo = ({ username, profilePhoto, profileLink, type }: Props) => {
  return (
    <div className="userinfo-container">
      <a href={`${profileLink}`} target="_blank">
        <img
          className={`userinfo-profile-photo ${
            type === "overlay"
              ? "overlay-profile-photo"
              : "topbar-profile-photo"
          }
            `}
          src={profilePhoto}
          alt="profile photo"
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
