import Login from './pages/login'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
