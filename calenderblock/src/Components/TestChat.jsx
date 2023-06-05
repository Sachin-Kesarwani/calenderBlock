import { Button } from '@chakra-ui/react';
import React from 'react';

const Google = () => {
  const handleGoogleAuth = async() => {
  await  fetch('http://localhost:8080/google/auth/google')
      .then((response) => response.json())
      .then((data) => {
        console.log('Google authentication successful:', data);
        // Store the received user data or perform any other actions
      })
      .catch((error) => {
        console.error('Google authentication error:', error);
      });
  };

  return (
    <div>
      <h1>Google Authentication</h1>
      <Button onClick={handleGoogleAuth}>Authenticate with Google</Button>
    </div>
  );
};

export default Google;
