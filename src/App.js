import React, { useState, useEffect, useMemo, useCallback } from 'react';
import useRewardsCalculator from './hooks/useRewardsCalculator';
import CustomerList from './components/CustomerList/CustomerList';
import MonthlyRewards from './components/MonthlyRewards/MonthlyRewards';
import TransactionDetails from './components/TransactionDetails/TransactionDetails';
import Filters from './components/Filters/Filters';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { AppContainer, Header, ErrorMessage } from './App.styled';
import { getMonthName } from './utils/dateUtils';

const App = () => {
  const { customers, loading, error } = useRewardsCalculator();
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedMonthYear, setSelectedMonthYear] = useState(null);
  const [selectedYearFilter, setSelectedYearFilter] = useState(2025);
  const allAvailableYears = useMemo(() => {
    const years = new Set();
    customers.forEach((customer) => {
      customer.monthlyRewards.forEach((yearData) => {
        years.add(yearData.year);
      });
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [customers]);

  const allAvailableMonths = useMemo(() => {
    const months = new Set();
    if (selectedCustomerId) {
      const selectedCustomer = customers.find(
        (c) => c.id === selectedCustomerId
      );
      if (selectedCustomer) {
        selectedCustomer.monthlyRewards.forEach((yearData) => {
          if (yearData.year === selectedYearFilter) {
            yearData.months.forEach((monthData) => months.add(monthData.month));
          }
        });
      }
    } else {
      customers.forEach((customer) => {
        customer.monthlyRewards.forEach((yearData) => {
          if (yearData.year === selectedYearFilter) {
            yearData.months.forEach((monthData) => months.add(monthData.month));
          }
        });
      });
    }
    if (months.size === 0 && allAvailableYears.includes(selectedYearFilter)) {
      const today = new Date();
      for (let i = 0; i < 3; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        if (d.getFullYear() === selectedYearFilter) {
          months.add(d.getMonth());
        }
      }
    }
    return Array.from(months).sort((a, b) => a - b);
  }, [customers, selectedCustomerId, selectedYearFilter, allAvailableYears]);

  useEffect(() => {
    if (
      allAvailableYears.length > 0 &&
      !allAvailableYears.includes(selectedYearFilter)
    ) {
      setSelectedYearFilter(allAvailableYears[0]);
    }
  }, [allAvailableYears, selectedYearFilter]);

  const filteredMonthlyRewards = useMemo(() => {
    if (!selectedCustomerId) return [];
    const customer = customers.find((c) => c.id === selectedCustomerId);
    if (!customer) return [];

    const yearData = customer.monthlyRewards.find(
      (yr) => yr.year === selectedYearFilter
    );
    if (!yearData) return [];

    let filteredMonths = yearData.months;

    if (selectedMonthYear) {
      filteredMonths = filteredMonths.filter(
        (m) => m.month === selectedMonthYear.month
      );
    }
    return [{ year: selectedYearFilter, months: filteredMonths }];
  }, [customers, selectedCustomerId, selectedMonthYear, selectedYearFilter]);

  const filteredTransactions = useMemo(() => {
    if (!selectedCustomerId || !selectedMonthYear) return [];
    const customer = customers.find((c) => c.id === selectedCustomerId);
    if (!customer) return [];

    const yearData = customer.monthlyRewards.find(
      (yr) => yr.year === selectedMonthYear.year
    );
    if (!yearData) return [];

    const monthData = yearData.months.find(
      (m) => m.month === selectedMonthYear.month
    );
    return monthData ? monthData.transactions : [];
  }, [customers, selectedCustomerId, selectedMonthYear]);

  const handleSelectCustomer = useCallback(
    (customerId) => {
      setSelectedCustomerId(customerId);
      setSelectedMonthYear(null);
      const customer = customers.find((c) => c.id === customerId);
      if (
        customer &&
        !customer.monthlyRewards.some((yr) => yr.year === selectedYearFilter)
      ) {
        const mostRecentCustomerYear = customer.monthlyRewards
          .map((yr) => yr.year)
          .sort((a, b) => b - a)[0];
        if (mostRecentCustomerYear) {
          setSelectedYearFilter(mostRecentCustomerYear);
        } else {
          setSelectedYearFilter(new Date().getFullYear());
        }
      }
    },
    [customers, selectedYearFilter]
  );

  const handleSelectMonthYear = useCallback(({ year, month }) => {
    setSelectedMonthYear({ year, month });
  }, []);

  const handleMonthChange = useCallback(
    (month) => {
      if (selectedCustomerId) {
        setSelectedMonthYear({ year: selectedYearFilter, month });
      }
    },
    [selectedCustomerId, selectedYearFilter]
  );

  const handleYearChange = useCallback((year) => {
    setSelectedYearFilter(year);
    setSelectedMonthYear(null);
  }, []);

  if (loading) {
    return (
      <AppContainer>
        <Header>Customer Rewards Program</Header>
        <LoadingSpinner />
        <p style={{ textAlign: 'center' }}>Fetching data...</p>
      </AppContainer>
    );
  }

  if (error) {
    return (
      <AppContainer>
        <Header>Customer Rewards Program</Header>
        <ErrorMessage>Error: {error}</ErrorMessage>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header>Customer Rewards Program</Header>

      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomerId}
        onSelectCustomer={handleSelectCustomer}
      />

      {selectedCustomerId && (
        <>
          <Filters
            availableMonths={allAvailableMonths}
            availableYears={allAvailableYears}
            selectedMonth={selectedMonthYear?.month}
            selectedYear={selectedYearFilter}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
          <MonthlyRewards
            monthlyRewards={filteredMonthlyRewards}
            selectedMonthYear={selectedMonthYear}
            onSelectMonthYear={handleSelectMonthYear}
          />
        </>
      )}

      {selectedCustomerId && selectedMonthYear && (
        <TransactionDetails transactions={filteredTransactions} />
      )}
    </AppContainer>
  );
};

export default App;
