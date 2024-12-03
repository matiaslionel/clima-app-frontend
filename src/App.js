import React from "react";
import Clima from "./Clima";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const H2 = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 2.5rem;
  background: linear-gradient(90deg, #4c9beb 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    background: linear-gradient(90deg, #a855f7 0%, #4c9beb 100%);
    -webkit-background-clip: text;
    background-clip: text;
    transform: scale(1.05);
  }
`;

function App() {
  return (
    <Container>
      <H2>Temperatura en Andorra</H2>
      <Clima />
    </Container>
  );
}

export default App;
