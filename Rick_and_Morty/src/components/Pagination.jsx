import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
      <span>{page} of {totalPages}</span>
      <button onClick={handleNext} disabled={page === totalPages}>Next</button>
    </div>
  );
};

export default Pagination;
