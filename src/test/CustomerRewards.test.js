
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerRewards from '../components/MonthlyRewards/MonthlyRewards';
import { calculateRewardPoints } from '../utils/rewardsUtils'; 

describe('CustomerRewards', () => {
  
  const mockTransactions = [
    { transactionId: 't1', amount: 120.00, date: '2024-03-15' }, 
    { transactionId: 't2', amount: 75.50, date: '2024-03-20' },  
    { transactionId: 't3', amount: 150.00, date: '2024-02-01' }, 
    { transactionId: 't4', amount: 40.00, date: '2024-02-10' },  
    { transactionId: 't5', amount: 200.75, date: '2024-01-05' }, 
    { transactionId: 't6', amount: 60.00, date: '2023-12-25' },  
  ];

  test('renders correctly with monthly and total rewards', () => {
    render(
      <CustomerRewards
        transactions={mockTransactions}
        calculateRewardPoints={calculateRewardPoints}
      />
    );

    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();


    expect(screen.getByText('March 2024')).toBeInTheDocument();
    expect(screen.getByText('115')).toBeInTheDocument(); 

    expect(screen.getByText('February 2024')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument(); 

    expect(screen.getByText('January 2024')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();

    expect(screen.getByText('December 2023')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('Total Rewards')).toBeInTheDocument();

    expect(screen.getByText('525')).toBeInTheDocument();
  });

  test('displays "No reward data" message if transactions array is empty', () => {
    render(
      <CustomerRewards
        transactions={[]}
        calculateRewardPoints={calculateRewardPoints}
      />
    );

    expect(screen.getByText('No reward data for this customer.')).toBeInTheDocument();
    expect(screen.getByText('Total Rewards')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('correctly handles transactions for the same month but different years', () => {
    const transactionsDifferentYears = [
      { transactionId: 't7', amount: 120, date: '2024-03-01' }, 
      { transactionId: 't8', amount: 120, date: '2023-03-01' }, 
    ];
    render(
      <CustomerRewards
        transactions={transactionsDifferentYears}
        calculateRewardPoints={calculateRewardPoints}
      />
    );

    expect(screen.getByText('March 2023')).toBeInTheDocument();
    expect(screen.getByText('March 2024')).toBeInTheDocument();
    expect(screen.getAllByText('90').length).toBeGreaterThanOrEqual(2); 
    expect(screen.getByText('Total Rewards')).toBeInTheDocument();
    expect(screen.getByText('180')).toBeInTheDocument();
  });
});