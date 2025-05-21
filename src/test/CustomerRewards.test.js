import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerRewards from "../components/MonthlyRewards/MonthlyRewards";
import { calculateRewardPoints } from "../utils/rewardsCalculator.js";

describe("CustomerRewards", () => {
  const mockTransactions = [
    { transactionId: "t1", amount: 120.0, date: "2024-03-15" },
    { transactionId: "t2", amount: 75.5, date: "2024-03-20" },
    { transactionId: "t3", amount: 150.0, date: "2024-02-01" },
    { transactionId: "t4", amount: 40.0, date: "2024-02-10" },
    { transactionId: "t5", amount: 200.75, date: "2024-01-05" },
    { transactionId: "t6", amount: 60.0, date: "2023-12-25" },
  ];

  test('displays "No reward data" message if transactions array is empty', () => {
    render(
      <CustomerRewards
        transactions={[]}
        calculateRewardPoints={calculateRewardPoints}
      />
    );
  });
});
