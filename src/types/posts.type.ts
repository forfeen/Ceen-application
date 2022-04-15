export default interface Post {
  items?: any;
  "#"?: string;
  ownerName: string;
  ownerId: string;
  id: string;
  title: string;
  description: string;
  like: number;
  dislike: number;
  date: string;
}
