import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",  // Center the buttons
    alignItems: "center",
    margin: "20px 0",          // Add some margin
  };

  const buttonStyle = {
    margin: "0 5px",           // Add space between buttons
    padding: "5px 10px",
    cursor: "pointer",
  };

  return (
    <div style={paginationStyle}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={buttonStyle}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          style={{
            ...buttonStyle,
            fontWeight: currentPage === page ? "bold" : "normal",
          }}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
