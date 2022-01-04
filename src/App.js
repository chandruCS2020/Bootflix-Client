import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Subscribe from './components/Subscribe/Subscribe';
import Watchlist from './pages/watchlist/watchlist'
import Watch from './pages/watch/Watch';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/subscribe' component={Subscribe} />
            <Route path='/watchlist' component={Watchlist} />
            <Route path='/movie/:id/watch' component={Watch} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
