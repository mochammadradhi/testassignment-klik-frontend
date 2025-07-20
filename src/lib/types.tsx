export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  motorcycles: Motorcycle[];
}

export interface Motorcycle {
  name: string;
  plate: string;
}

export interface Service {
  name: string;
  description: string;
  price: number;
}
