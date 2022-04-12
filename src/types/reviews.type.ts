export default interface Review {
  items?: any;
  "#"?: string;
  id: string;
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
  dislikes: number;
  date: string;
  isLike: boolean;
  isDislike: boolean;
}
