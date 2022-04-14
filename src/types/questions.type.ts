export default interface Question {
  items?: any;
  "#"?: string;
  ownerName: string;
  ownerId: string;
  title?: string;
  type?: string;
  description?: string;
  likes?: number;
  dislikes?: number;
  date?: string;
}
