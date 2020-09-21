import React from 'react';
import { Container, Image } from 'react-bootstrap';

const SplashPage = () => {
  return (
    <Container className="md-container">
      <Image src={'/images/splash.svg'} />
    </Container>
  );
};

export default SplashPage;
