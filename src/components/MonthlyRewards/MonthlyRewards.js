import React from 'react';
import PropTypes from 'prop-types';
import {
  MonthlyRewardsContainer,
  MonthlyTable,
  MonthlyRow,
  NoDataMessage,
} from './MonthlyRewards.styled';

const MonthlyRewards = ({
  monthlyRewards,
  selectedMonthYear,
  onSelectMonthYear,
}) => {
  if (!monthlyRewards || monthlyRewards.length === 0) {
    return (
      <MonthlyRewardsContainer>
        <h2>Monthly Rewards</h2>
        <NoDataMessage>
          No monthly rewards data available for this customer.
        </NoDataMessage>
      </MonthlyRewardsContainer>
    );
  }

  return (
    <MonthlyRewardsContainer>
      <h2>Monthly Rewards</h2>
      <MonthlyTable>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Total Rewards Points</th>
          </tr>
        </thead>
        <tbody>
          {monthlyRewards.map((yearData) =>
            yearData.months.map((monthData) => (
              <MonthlyRow
                key={`${yearData.year}-${monthData.month}`}
                selected={
                  selectedMonthYear?.year === yearData.year &&
                  selectedMonthYear?.month === monthData.month
                }
                onClick={() =>
                  onSelectMonthYear({
                    year: yearData.year,
                    month: monthData.month,
                  })
                }
              >
                <td>{yearData.year}</td>
                <td>{monthData.monthName}</td>
                <td>{monthData.totalPoints}</td>
              </MonthlyRow>
            ))
          )}
        </tbody>
      </MonthlyTable>
    </MonthlyRewardsContainer>
  );
};

MonthlyRewards.propTypes = {
  monthlyRewards: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      months: PropTypes.arrayOf(
        PropTypes.shape({
          month: PropTypes.number.isRequired,
          monthName: PropTypes.string.isRequired,
          year: PropTypes.number.isRequired,
          totalPoints: PropTypes.number.isRequired,
          transactions: PropTypes.array.isRequired,
        })
      ).isRequired,
    })
  ),
  selectedMonthYear: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
  }),
  onSelectMonthYear: PropTypes.func.isRequired,
};

export default MonthlyRewards;
