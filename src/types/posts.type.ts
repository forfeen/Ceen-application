export default interface Post {
  items?: any;
  "#"?: string;
  ownerName: string;
  ownerId: string;
  id: string;
  title: string;
  description: string;
  like: number;
  date: string;
  isLike: string;
  comments: number
}
