import { useState, useEffect, useCallback } from 'react';
import { fetchTransactions } from '../api/transactions';
import { calculateRewardPoints } from '../utils/rewardsCalculator';
import { getMonthName } from '../utils/dateUtils';

const useRewardsCalculator = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const processTransactions = useCallback((data) => {
    const customerMap = new Map();

    data.forEach((transaction) => {
      const { customerId, amount, date, transactionId } = transaction;
      const transactionDate = new Date(date);
      const year = transactionDate.getFullYear();
      const month = transactionDate.getMonth(); // 0-indexed month

      const points = calculateRewardPoints(amount);

      if (!customerMap.has(customerId)) {
        customerMap.set(customerId, {
          id: customerId,
          totalRewards: 0,
          monthlyRewards: new Map(), // Stores {year: {month: {totalPoints, transactions: []}}}
        });
      }

      const customer = customerMap.get(customerId);
      customer.totalRewards += points;

      if (!customer.monthlyRewards.has(year)) {
        customer.monthlyRewards.set(year, new Map());
      }
      const yearData = customer.monthlyRewards.get(year);

      if (!yearData.has(month)) {
        yearData.set(month, {
          totalPoints: 0,
          transactions: [],
        });
      }

      const monthData = yearData.get(month);
      monthData.totalPoints += points;
      monthData.transactions.push({ transactionId, amount, date, points });
    });

    // Convert Maps to plain objects for easier consumption in components
    const processedCustomers = Array.from(customerMap.values()).map(
      (customer) => {
        const monthlyRewardsArray = Array.from(
          customer.monthlyRewards.entries()
        ).map(([year, monthsMap]) => {
          const monthsArray = Array.from(monthsMap.entries()).map(
            ([month, data]) => ({
              month: month,
              monthName: getMonthName(month),
              year: year,
              totalPoints: data.totalPoints,
              transactions: data.transactions,
            })
          );
          return { year, months: monthsArray };
        });
        return {
          ...customer,
          monthlyRewards: monthlyRewardsArray,
        };
      }
    );

    setCustomers(processedCustomers);
    setTransactions(data); // Keep raw transactions for filtering
  }, []);

  useEffect(() => {
    const getTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTransactions();
        processTransactions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTransactions();
  }, [processTransactions]);

  return { customers, transactions, loading, error };
};

export default useRewardsCalculator;
