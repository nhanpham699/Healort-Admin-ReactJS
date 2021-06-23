import Login from './pages/Login'
import Home from './pages/Home'
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
