import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  // public execute({ title, value, type }: Request): Transaction {
  public execute({ title, value, type }: Request): void {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      console.log(balance);

      if (value > balance.total) {
        throw new Error('No sufficient funds');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
