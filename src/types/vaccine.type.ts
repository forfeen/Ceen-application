export default interface Vaccine {
  #:string,
  id: string,
  name: string,
  type: string,
  short_description: string,
  long_description: string,
  manufacturer: string,
  effects: string,
  average_per_dose: number,
  performance: number,
  link_info: string,
  review: number
}