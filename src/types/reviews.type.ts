export default interface Review {
  items?: any;
  "#"?: string;
  ownerName: string;
  ownerId: string;
  description: string;
  price: number;
  location: string;
  effects: string;
  currentDose: number;
  firstDose: string;
  secondDose: string;
  thirdDose: string;
  fourthDose: string;
  likes: number;
  date: string;
  isLike: string;
}
