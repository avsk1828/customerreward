const mockTransactions = [
  {
    customerId: 'C001',
    transactionId: 'T001',
    amount: 120.0,
    date: '2025-03-15',
  },
  {
    customerId: 'C001',
    transactionId: 'T002',
    amount: 75.5,
    date: '2025-03-20',
  },
  {
    customerId: 'C001',
    transactionId: 'T003',
    amount: 200.0,
    date: '2025-03-25',
  },
  {
    customerId: 'C001',
    transactionId: 'T004',
    amount: 45.0,
    date: '2025-02-10',
  },
  {
    customerId: 'C001',
    transactionId: 'T005',
    amount: 150.75,
    date: '2025-02-18',
  },
  {
    customerId: 'C001',
    transactionId: 'T006',
    amount: 90.0,
    date: '2025-01-05',
  },
  {
    customerId: 'C001',
    transactionId: 'T007',
    amount: 110.0,
    date: '2025-01-12',
  },
  {
    customerId: 'C001',
    transactionId: 'T008',
    amount: 60.25,
    date: '2024-12-01',
  },
  {
    customerId: 'C001',
    transactionId: 'T009',
    amount: 130.0,
    date: '2024-11-20',
  },
  {
    customerId: 'C002',
    transactionId: 'T010',
    amount: 80.0,
    date: '2025-03-01',
  },
  {
    customerId: 'C002',
    transactionId: 'T011',
    amount: 110.0,
    date: '2025-03-08',
  },
  {
    customerId: 'C002',
    transactionId: 'T012',
    amount: 55.0,
    date: '2025-02-05',
  },
  {
    customerId: 'C002',
    transactionId: 'T013',
    amount: 180.0,
    date: '2025-02-14',
  },
  {
    customerId: 'C002',
    transactionId: 'T014',
    amount: 99.99,
    date: '2025-01-22',
  },
  {
    customerId: 'C002',
    transactionId: 'T015',
    amount: 101.0,
    date: '2025-01-28',
  },
  {
    customerId: 'C002',
    transactionId: 'T016',
    amount: 40.0,
    date: '2024-10-10',
  },
  {
    customerId: 'C003',
    transactionId: 'T017',
    amount: 105.0,
    date: '2025-03-03',
  },
  {
    customerId: 'C003',
    transactionId: 'T018',
    amount: 60.0,
    date: '2025-03-10',
  },
  {
    customerId: 'C003',
    transactionId: 'T019',
    amount: 130.0,
    date: '2025-02-01',
  },
  {
    customerId: 'C003',
    transactionId: 'T020',
    amount: 70.0,
    date: '2025-02-11',
  },
  {
    customerId: 'C003',
    transactionId: 'T021',
    amount: 190.0,
    date: '2025-01-19',
  },
  {
    customerId: 'C003',
    transactionId: 'T022',
    amount: 85.0,
    date: '2025-01-26',
  },
  {
    customerId: 'C003',
    transactionId: 'T023',
    amount: 300.0,
    date: '2025-03-07',
  },
];

export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        reject(new Error('Failed to fetch transactions. Network error.'));
      } else {
        resolve(mockTransactions);
      }
    }, 1000);
  });
};
