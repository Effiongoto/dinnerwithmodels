import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ModelScreen from './screens/ModelScreen';
import LoginScreen from './screens/LoginScreen';
import ModelLoginScreen from './screens/ModelLoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ModelRegisterScreen from './screens/ModelRegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ModelProfileScreen from './screens/ModelProfileScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} exact />
          <Route path='/register' component={RegisterScreen} exact />
          <Route path='/profile' component={ProfileScreen} exact />
          <Route path='/login/model' component={ModelLoginScreen} exact />
          <Route path='/register/model' component={ModelRegisterScreen} exact />
          <Route path='/profile/model' component={ModelProfileScreen} exact />
          <Route path='/model/:id' component={ModelScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
