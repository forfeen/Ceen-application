export default interface Question {
  items?: any;
  "#"?: string;
  ownerName: string;
  ownerId: string;
  title?: string;
  typePrice: boolean;
  typeLocation: boolean;
  typeEffect: boolean;
  description?: string;
  likes?: number;
  dislikes?: number;
  date?: string;
}
