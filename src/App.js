import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import EmployeeProfile from './components/EmployeeProfile';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div class="ui container">
          <Switch>
              <Route exact path = "/" component = {ListEmployeeComponent}></Route>
              <Route path = "/employees" component = {ListEmployeeComponent}></Route>
              <Route path = "/add-employee" component = {AddEmployeeComponent} ></Route>
              <Route path = "/edit-employee/:id" component = {AddEmployeeComponent}></Route>
              <Route exact path = "/view-employee/:id" component = {EmployeeProfile}></Route>
            </Switch>
        </div>
        </Router>
    </div>
  );
}

export default App;

