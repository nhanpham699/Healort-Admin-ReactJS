import './App.css';
import DrawerMenu from './components/DrawerMenu'
import ManageUsers from './pages/ManageUsers'
import ManageDoctors from './pages/ManageDoctors'
import ManageSchedules from './pages/ManageSchedules'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 

function App() {
  return (
    <Router>
      <div className="App">
          <div className="left-content">
            <DrawerMenu />
          </div>
          <div className="right-content">
            <Route path='/users' component={ManageUsers} />
            <Route path='/doctors' component={ManageDoctors} />
            <Route path='/schedules' component={ManageSchedules} />
          </div>
      </div>
    </Router>
  );
}

export default App;
