// src/components/TransactionDetails.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TransactionDetails from './TransactionDetails';
import { calculateRewardPoints } from '../utils/rewardsCalculator'; 

describe('TransactionDetails', () => {
  const mockTransactions = [
    { customerId: 'cust1', transactionId: 'txn001', amount: 120.00, date: '2024-03-15' }, 
    { customerId: 'cust1', transactionId: 'txn002', amount: 75.50, date: '2024-02-20' },  
    { customerId: 'cust1', transactionId: 'txn003', amount: 49.99, date: '2024-01-10' },  
    { customerId: 'cust1', transactionId: 'txn004', amount: 100.00, date: '2024-03-01' }, 
  ];

  test('renders correctly with transaction details', () => {
    render(
      <TransactionDetails
        transactions={mockTransactions}
        calculateRewardPoints={calculateRewardPoints}
      />
    );


    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();
    expect(screen.getByText('txn001')).toBeInTheDocument();
    expect(screen.getByText('$120.00')).toBeInTheDocument();
    expect(screen.getAllByText('90')[0]).toBeInTheDocument(); 

  
    expect(screen.getByText('txn002')).toBeInTheDocument();
    expect(screen.getByText('$75.50')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();

   
    expect(screen.getByText('txn003')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getAllByText('0')[0]).toBeInTheDocument(); 


    expect(screen.getByText('txn004')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  test('displays "No transactions to display" message if transactions array is empty', () => {
    render(
      <TransactionDetails
        transactions={[]}
        calculateRewardPoints={calculateRewardPoints}
      />
    );

    expect(screen.getByText('No transactions to display.')).toBeInTheDocument();

    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
  });

  test('correctly formats date', () => {
    const singleTransaction = [
      { customerId: 'cust2', transactionId: 'tXdate', amount: 60.00, date: '2024-05-01T10:00:00Z' },
    ];
    render(
      <TransactionDetails
        transactions={singleTransaction}
        calculateRewardPoints={calculateRewardPoints}
      />
    );
    expect(screen.getByText(/2024/)).toBeInTheDocument();
   
  });
});