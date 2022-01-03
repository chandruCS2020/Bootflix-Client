import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Subscribe from './components/Subscribe/Subscribe';


function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/subscribe' component={Subscribe} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
