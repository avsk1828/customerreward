
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerList from '../components/CustomerList/CustomerList';

describe('CustomerList', () => {
  const mockCustomers = [
    { id: 'custA' },
    { id: 'custB' },
    { id: 'custC' },
  ];
  const mockOnSelectCustomer = jest.fn();

  beforeEach(() => {
    mockOnSelectCustomer.mockClear(); 
  });

  test('renders correctly with a list of customers', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        onSelectCustomer={mockOnSelectCustomer}
        selectedCustomerId={null}
      />
    );

    expect(screen.getByText('Customer ID')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();

    expect(screen.getByText('custA')).toBeInTheDocument();
    expect(screen.getByText('custB')).toBeInTheDocument();
    expect(screen.getByText('custC')).toBeInTheDocument();

    const viewDetailsButtons = screen.getAllByRole('button', { name: /View Details/i });
    expect(viewDetailsButtons).toHaveLength(mockCustomers.length);
    viewDetailsButtons.forEach(button => {
      expect(button).toBeEnabled();
    });
  });

  test('calls onSelectCustomer with the correct ID when a customer is selected', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        onSelectCustomer={mockOnSelectCustomer}
        selectedCustomerId={null}
      />
    );

    const custBButton = screen.getByRole('button', { name: 'View Details' }).closest('tr').querySelector('td').textContent === 'custB'
    ? screen.getByRole('button', { name: 'View Details' })
    : screen.getAllByRole('button', { name: 'View Details' })[1]; 

    fireEvent.click(custBButton);

    expect(mockOnSelectCustomer).toHaveBeenCalledTimes(1);
    expect(mockOnSelectCustomer).toHaveBeenCalledWith('custB');
  });

  test('disables the "View Details" button for the currently selected customer', () => {
    render(
      <CustomerList
        customers={mockCustomers}
        onSelectCustomer={mockOnSelectCustomer}
        selectedCustomerId="custB"
      />
    );

    const custBRow = screen.getByText('custB').closest('tr');
    const custBButton = custBRow.querySelector('button');

    expect(custBButton).toBeDisabled();
    expect(custBButton).toHaveTextContent('Selected');
    const custAButton = screen.getByText('custA').closest('tr').querySelector('button');
    expect(custAButton).toBeEnabled();
    expect(custAButton).toHaveTextContent('View Details');
  });

  test('renders no customers message if customers array is empty', () => {
    render(
      <CustomerList
        customers={[]}
        onSelectCustomer={mockOnSelectCustomer}
        selectedCustomerId={null}
      />
    );
    expect(screen.queryByText('custA')).not.toBeInTheDocument();
    expect(screen.queryAllByRole('button', { name: /View Details/i })).toHaveLength(0);
    expect(screen.getByText('Customer ID')).toBeInTheDocument(); 
  });
});