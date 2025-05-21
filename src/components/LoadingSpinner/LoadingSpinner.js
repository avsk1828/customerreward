import React from 'react';
import { SpinnerContainer, Spinner } from './LoadingSpinner.styled';

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
