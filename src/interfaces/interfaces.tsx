export interface Owner {
  name: string;
  id: string;
}

export interface Card {
  cardId: string;
  name: string;
  securityCode: string;
  cardNumber: string;
  holder: string;
  expirationDate: string;
  brand: string;
  favorite: boolean;
  used: boolean;
}

export interface Account {
  accountId: string;
  balance: number;
  currency: string;
  status: string;
  owner: Owner;
  cards: Card[];
}

export interface Fees {
  fixed: {
    amount: number;
    percentage: number;
  };
  installments: {
    amount: number;
    percentage: number;
  };
}

export interface Simulation {
  amountToPay: number;
  installmentAmount: number;
  installments: number;
  fees: Fees;
}

export interface Receiver {
  name: string;
  id: string;
}

export interface Payment {
  transactionId: string;
  amount: number;
  currency: string;
  receiver: Receiver;
  method: string;
  simulation: Simulation[];
}

export interface DataJSON {
  account: Account;
  payment: Payment;
}
