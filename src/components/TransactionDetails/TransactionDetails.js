import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TransactionDetailsContainer,
  TransactionTable,
  NoDataMessage,
} from "./TransactionDetails.styled";
import Pagination from "../Pagination/Pagination";
import { formatDate } from "../../utils/dateUtils";

const TRANSACTIONS_PER_PAGE = 5;

const TransactionDetails = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!transactions || transactions.length === 0) {
    return (
      <TransactionDetailsContainer>
        <h3>Transaction Details</h3>
        <NoDataMessage>
          No transactions found for the selected month.
        </NoDataMessage>
      </TransactionDetailsContainer>
    );
  }

  const totalPages = Math.ceil(transactions.length / TRANSACTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * TRANSACTIONS_PER_PAGE;
  const endIndex = startIndex + TRANSACTIONS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <TransactionDetailsContainer>
      <h3>Transaction Details</h3>
      <TransactionTable>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Points Earned</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{formatDate(transaction.date)}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.points}</td>
            </tr>
          ))}
        </tbody>
      </TransactionTable>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </TransactionDetailsContainer>
  );
};

TransactionDetails.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.number,
      points: PropTypes.number,
    })
  ),
};

export default TransactionDetails;
