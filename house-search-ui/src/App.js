import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import HomePage from './pages/HomePage';
import HouseDetails from './pages/HouseDetails';
import AddHouse from './pages/AddHouse';
import EditHouse from './pages/EditHouse';
import DeleteHouse from './pages/DeleteHouse';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div id="page-body">
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/house-details/:id" component={HouseDetails}/>
            <Route path="/add-house" component={AddHouse}/>
            <Route path="/edit-house/:id" component={EditHouse}/>
            <Route path="/delete-house/:id" component={DeleteHouse}/>
          </Switch>
        </div>      
      </div>
    </Router>
  );
}

export default App;
