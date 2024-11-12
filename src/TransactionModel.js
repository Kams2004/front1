// src/TransactionModel.js
export class Transaction {
    constructor(id, amount, commission, transactionDate) {
      this.id = id;
      this.amount = amount;
      this.commission = commission;
      this.transactionDate = transactionDate;
    }
  }
  