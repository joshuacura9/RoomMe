import React from 'react';
import Header from './components/Header';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import DashboardContainer from './containers/DashboardContainer';
import Footer from './components/Footer';
import Contact from './components/Contact';
import About from './components/About';
function App() {
  return (
    <div className="container">
        <Header />
        <Switch>
              <Route exact path='/' component={ Home }/>
              <Route path='/dashboard' component={ DashboardContainer }/>
              <Route path='/Contact' component={ Contact }/>
              <Route path='/About' component={ About }/>
        </Switch>
        <Footer className="FooterComp" />
    </div>
  );
};

export default App;
