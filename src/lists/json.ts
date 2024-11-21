import { DataJSON } from "../interfaces/interfaces";

export const dataJSON: DataJSON = {
  account: {
    accountId: "123456789",
    balance: 2023.0,
    currency: "BRL",
    status: "active",
    owner: {
      name: "John Doe",
      id: "987654321",
    },
    cards: [
      {
        cardId: "153455-15312323",
        name: "Platinum",
        securityCode: "***",
        cardNumber: "**********181",
        holder: "John Doer",
        expirationDate: "12/2025",
        brand: "Visa",
        favorite: true,
        used: true,
      },
      {
        cardId: "153455-15312313",
        name: "NuCard",
        securityCode: "***",
        cardNumber: "**********222",
        holder: "John Doe",
        expirationDate: "08/2024",
        brand: "Master",
        favorite: false,
        used: false,
      },
    ],
  },
  payment: {
    transactionId: "abc123",
    amount: 100.0,
    currency: "BRL",
    receiver: {
      name: "Maria da Silca",
      id: "45648941",
    },
    method: "credit_card",
    simulation: [
      {
        amountToPay: 103.0,
        installmentAmount: 103.0,
        installments: 1,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 0.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 106.0,
        installmentAmount: 53.0,
        installments: 2,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 3.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 108.0,
        installmentAmount: 36.0,
        installments: 3,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 5.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 110.0,
        installmentAmount: 27.5,
        installments: 4,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 7.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 112.0,
        installmentAmount: 22.4,
        installments: 5,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 9.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 114.0,
        installmentAmount: 19.0,
        installments: 6,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 11.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 116.0,
        installmentAmount: 16.57,
        installments: 7,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 13.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 118.0,
        installmentAmount: 14.75,
        installments: 8,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 15.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 120.0,
        installmentAmount: 13.33,
        installments: 9,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 17.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 122.0,
        installmentAmount: 12.2,
        installments: 10,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 19.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 124.0,
        installmentAmount: 11.27,
        installments: 11,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 21.0,
            percentage: 0.01,
          },
        },
      },
      {
        amountToPay: 126.0,
        installmentAmount: 10.5,
        installments: 12,
        fees: {
          fixed: {
            amount: 3.0,
            percentage: 0.03,
          },
          installments: {
            amount: 23.0,
            percentage: 0.01,
          },
        },
      },
    ],
  },
};
