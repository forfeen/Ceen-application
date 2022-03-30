export default interface Review {
    id: string,
    description: string,
    price:number ,
    location: string,
    effects: string,
    currentDose: number,
    firstDose: string,
    secondDose: string,
    thridDose: string,
    fourthDose: string,
    like: number,
    dislike: number,
    date: string
  }