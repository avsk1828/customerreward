import styled from 'styled-components';

export const CustomerListContainer = styled.div`
  margin-bottom: 20px;
`;

export const CustomerTable = styled.table`
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

  tr:hover {
    background-color: #e9e9e9;
  }
`;

export const CustomerRow = styled.tr`
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#e0f7fa' : 'inherit')};
  &:hover {
    background-color: #e0f7fa;
  }
`;
