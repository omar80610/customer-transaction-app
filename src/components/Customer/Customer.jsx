// Customer.jsx

import React from "react";
import CustomerTable from "../CustomerTable/CustomerTable";

const Customer = () => {
  return (
    <div className="container mt-4">
      <h2 className="h1 fw-bold mb-4">Customer Table</h2>
      <CustomerTable />
    </div>
  );
};

export default Customer;
