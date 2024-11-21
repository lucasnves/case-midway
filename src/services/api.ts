import { Account, Card, Payment, Simulation } from "../interfaces/interfaces";
import { dataJSON } from "../lists/json";


export const getAcountInfo = (): Promise<Account> => {
  return new Promise((resolve) => {
    resolve(dataJSON.account);
  });
};

export const getPayment = (): Promise<Payment> => {
  return new Promise((resolve) => {
    resolve(dataJSON.payment);
  });
};

export const fetchCreditCards = (): Promise<Card[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(dataJSON.account.cards);
    }, 1000);
  });
};

export const getSimulations = (): Promise<Simulation[]> => {
  return new Promise((resolve, reject) => {
    resolve(
      dataJSON.payment.simulation.sort(
        (a, b) => b.installments - a.installments
      )
    );
  });
};

export const getPaymentByTransactionId = (
  transactionId: string
): Promise<Payment | null> => {
  return new Promise((resolve, reject) => {
    const payment =
      dataJSON.payment.transactionId === transactionId
        ? dataJSON.payment
        : null;
    setTimeout(() => {
      resolve(payment);
    }, 1500);
  });
};

export const processPix = (amount: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const account = dataJSON.account;

    if (amount > account.balance) {
      resolve(false);
    } else {
      account.balance -= amount;
      resolve(true);
    }
  });
};