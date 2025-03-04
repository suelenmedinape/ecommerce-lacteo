export interface Address {
    id?: number;
    street: string;
    number: string;
    neighborhood: string;
    state: string;
  }
  
  export interface Client {
    name: string;
    email: string;
    phone: string | null;
    address: Address | null;
    cpf: string | null;
  }
  