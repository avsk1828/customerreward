import styled from 'styled-components';

export const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 960px;
  margin: 0 auto;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

export const ErrorMessage = styled.div`
  color: #d8000c;
  background-color: #ffbaba;
  border: 1px solid #d8000c;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
`;
