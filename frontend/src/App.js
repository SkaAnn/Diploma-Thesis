import React from 'react'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
    </>
  );
}

export default App;
