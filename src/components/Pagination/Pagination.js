import React from 'react';
import PropTypes from 'prop-types';
import {
  PaginationContainer,
  PageButton,
  CurrentPageSpan,
} from './Pagination.styled';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          active={page === currentPage}
        >
          {page}
        </PageButton>
      ))}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
