import styled from 'styled-components';

export const TransactionDetailsContainer = styled.div`
  margin-top: 30px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
`;

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const NoDataMessage = styled.p`
  text-align: center;
  color: #555;
  margin-top: 20px;
`;
