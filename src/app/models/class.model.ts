export interface IClassInstructor {
  first_name: string;
  last_name: string;
  portrait_image: string;
}
export interface IClassLocation {
  timezone: string;
}
export interface IClassPricing {
  amount: number;
  currency: string;
  valid_until: number;
}
export interface IClass {
  id: number;
  dates: any[];
  instructors: IClassInstructor[];
  location: IClassLocation;
  pricing: IClassPricing;
}

export class ClassDate {
  startDateTime: Date;
  endDateTime: Date;

  constructor(init?: Partial<ClassDate>) {
    Object.assign(this, init);
  }
}
export class Class {
  id: number;
  timeZone: string;
  instructorName: string;
  instructorImage: string;
  pricingAmount: number;
  pricingCurrency: string;
  priceValidUntil: Date;

  dates: ClassDate[];

  constructor(init?: Partial<Class>) {
    Object.assign(this, init);
  }
}
