import React from 'react';
import PropTypes from 'prop-types';
import { FiltersContainer, FilterLabel, Select } from './Filters.styled';
import { getMonthName } from '../../utils/dateUtils';

const Filters = ({
  availableMonths,
  availableYears,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <FiltersContainer>
      <FilterLabel htmlFor="month-select">Month:</FilterLabel>
      <Select
        id="month-select"
        value={selectedMonth !== null ? selectedMonth : ''}
        onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
      >
        {availableMonths.map((month) => (
          <option key={month} value={month}>
            {getMonthName(month)}
          </option>
        ))}
      </Select>

      <FilterLabel htmlFor="year-select">Year:</FilterLabel>
      <Select
        id="year-select"
        value={selectedYear}
        onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </FiltersContainer>
  );
};

Filters.propTypes = {
  availableMonths: PropTypes.arrayOf(PropTypes.number).isRequired,
  availableYears: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedMonth: PropTypes.number, // Can be null for "all months"
  selectedYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default Filters;
