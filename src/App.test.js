
import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as api from './api/transactions'; 

const mockTransactionsData = [
  { customerId: 'cust1', transactionId: 't1', amount: 120.00, date: '2024-03-15' },
  { customerId: 'cust1', transactionId: 't2', amount: 75.50, date: '2024-02-20' },
  { customerId: 'cust2', transactionId: 't3', amount: 110.25, date: '2024-01-05' },
];

describe('App', () => {
  beforeEach(() => {
    
    jest.spyOn(api, 'fetchTransactions').mockResolvedValue(mockTransactionsData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/loading transactions/i)).toBeInTheDocument();
  });

  test('displays customer list after data loads', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.queryByText(/loading transactions/i)).not.toBeInTheDocument();
      expect(screen.getByText('Customer ID')).toBeInTheDocument();
      expect(screen.getByText('cust1')).toBeInTheDocument();
      expect(screen.getByText('cust2')).toBeInTheDocument();
    });
  });

  test('displays customer rewards when a customer is selected', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('cust1')).toBeInTheDocument());

    await act(async () => {
      userEvent.click(screen.getAllByRole('button', { name: /view details/i })[0]); 
    });

    await waitFor(() => {
      expect(screen.getByText(/rewards for customer: cust1/i)).toBeInTheDocument();
      expect(screen.getByText('March 2024')).toBeInTheDocument(); 
      expect(screen.getByText('February 2024')).toBeInTheDocument(); 
      expect(screen.getByText('90')).toBeInTheDocument(); 
      expect(screen.getByText('25')).toBeInTheDocument(); 
      expect(screen.getByText('Total Rewards')).toBeInTheDocument();
      expect(screen.getByText('115')).toBeInTheDocument();
    });
  });

  test('displays transaction details for selected customer and filters', async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText('cust1')).toBeInTheDocument());

    await act(async () => {
      userEvent.click(screen.getAllByRole('button', { name: /view details/i })[0]);
    });

    await waitFor(() => {
      expect(screen.getByText(/transaction details for customer: cust1/i)).toBeInTheDocument();
      expect(screen.getByText('Transaction ID')).toBeInTheDocument();
      expect(screen.getByText('t1')).toBeInTheDocument();
      expect(screen.getByText('t2')).toBeInTheDocument();
    });

  
    await act(async () => {
      userEvent.selectOptions(screen.getByLabelText(/filter by month/i), '3'); // March
    });

    await waitFor(() => {
      expect(screen.getByText('t1')).toBeInTheDocument();
      expect(screen.queryByText('t2')).not.toBeInTheDocument(); // t2 is in Feb
    });
  });

  test('handles API error gracefully', async () => {
    jest.spyOn(api, 'fetchTransactions').mockRejectedValue(new Error('Network Error'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/error: network error/i)).toBeInTheDocument();
      expect(screen.queryByText(/loading transactions/i)).not.toBeInTheDocument();
    });
  });

  test('pagination works correctly', async () => {
  
    const largeMockData = Array.from({ length: 12 }, (_, i) => ({
      customerId: 'cust1',
      transactionId: `trans${i}`,
      amount: 60 + i, 
      date: `2024-03-${(i % 20) + 1}`,
    }));
    jest.spyOn(api, 'fetchTransactions').mockResolvedValue(largeMockData);

    render(<App />);
    await waitFor(() => expect(screen.getByText('cust1')).toBeInTheDocument());

    await act(async () => {
      userEvent.click(screen.getAllByRole('button', { name: /view details/i })[0]);
    });

    await waitFor(() => {
     
      expect(screen.getByText('trans0')).toBeInTheDocument();
      expect(screen.queryByText('trans5')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    });

    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /next/i }));
    });

    await waitFor(() => {
      expect(screen.queryByText('trans0')).not.toBeInTheDocument();
      expect(screen.getByText('trans5')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled();
    });
  });
});