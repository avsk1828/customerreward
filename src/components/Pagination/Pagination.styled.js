import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 10px;
`;

export const PageButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #007bff;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#007bff')};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? '#0056b3' : '#e6f2ff')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CurrentPageSpan = styled.span`
  font-weight: bold;
  margin: 0 10px;
`;
