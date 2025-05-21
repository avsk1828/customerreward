import React from "react";
import PropTypes from "prop-types";
import {
  CustomerListContainer,
  CustomerTable,
  CustomerRow,
} from "./CustomerList.styled";

const CustomerList = ({ customers, selectedCustomerId, onSelectCustomer }) => {
  return (
    <CustomerListContainer>
      <h2>All Customers Rewards</h2>
      <CustomerTable>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Total Rewards Points</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              selected={customer.id === selectedCustomerId}
              onClick={() => onSelectCustomer(customer.id)}
            >
              <td>{customer.id}</td>
              <td>{customer.totalRewards}</td>
            </CustomerRow>
          ))}
        </tbody>
      </CustomerTable>
    </CustomerListContainer>
  );
};

CustomerList.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      totalRewards: PropTypes.number.isRequired,
    })
  ),
  selectedCustomerId: PropTypes.string,
  onSelectCustomer: PropTypes.func.isRequired,
};

export default CustomerList;
