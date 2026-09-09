export interface Photo {
  altDescription: string | null;
  blurHash: string | null;
  height: number;
  width: number;
  id: string;
  src: string;
  srcFull: string;
  srcMobile: string;
  username: string;
  usernameId: string;
  userProfileImage: string;
  userProfileLink: string;
  downloadLink: string;
  downloadLocation: string;
  location: string | null;
  date: string;
  rawLink: string;
}
