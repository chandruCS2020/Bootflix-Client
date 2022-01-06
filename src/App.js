import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Subscribe from './components/Subscribe/Subscribe';
import Watchlist from './pages/watchlist/watchlist'
import Watch from './pages/watch/Watch';
import { useContext, useEffect } from 'react';
import { login } from './context/apicalls';
import { AuthContext } from "./context/AuthContext";

function App() {
  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
      login(dispatch);
  }, [])
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
