import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Subscribe from './components/Subscribe/Subscribe';
import Watchlist from './pages/watchlist/watchlist'
import Watch from './pages/watch/Watch';
import { useContext, useEffect } from 'react';
import { login } from './context/apicalls';
import { AuthContext } from "./context/AuthContext";
import Myaccount from './pages/myaccount/Myaccount';
import Logins from './pages/login/Login';
import VideoPlayer from './components/Player/VideoPlayer';
import Genre from './pages/genre/Genre';
import LogoutAll from './pages/logout/LogoutAll';

function App() {
  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
      login(dispatch);
  }, [dispatch])
  return (
    <div className="App">
      <Router>
          <Switch>
            
            
            <Route path='/' exact component={Home} />
            
            <Route path='/movie/:id/watch' component={VideoPlayer} />
            <Route path='/trailer/:id/watch' component={VideoPlayer} />
            <Route path='/movie/:id' component={Watch} />
            <Route path='/myaccount' component={Myaccount} />
            <Route path='/genre/:genre' component={Genre} />
            <Route path='/logoutall' component={LogoutAll} />
            <Route path='/search' component={Genre} />
            <Route path='/movie' component={Genre} />
            <Route path='/genre' component={Genre} />
            <Route path='/login' component={Logins} />
            <Route path='/subscribe' component={Subscribe} />
            <Route path='/wishlist' component={Watchlist} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
