import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Subscribe from './components/Subscribe/Subscribe';
import Watchlist from './pages/watchlist/watchlist'
import Watch from './pages/watch/Watch';
import { useContext, useEffect } from 'react';
import { login } from './context/apicalls';
import { AuthContext } from "./context/AuthContext";
import Myaccount from './pages/myaccount/Myaccount';
import Login from './pages/login/Login';
import VideoPlayer from './components/Player/VideoPlayer';
import Genre from './pages/genre/Genre';
import LogoutAll from './pages/logout/LogoutAll';

function App() {
  const { isUser,dispatch } = useContext(AuthContext);
  useEffect(() => {
      login(dispatch);
  }, [])
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/subscribe' component={Subscribe} />
            <Route path='/wishlist' component={Watchlist} />
            <Route path='/movie/:id/watch' component={VideoPlayer} />
            <Route path='/trailer/:id/watch' component={VideoPlayer} />
            <Route path='/movie/:id' component={Watch} />
            <Route path='/myaccount' component={Myaccount} />
            <Route path='/login' component={Login} />
            <Route path='/genre/:genre' component={Genre} />
            <Route path='/logoutall' component={LogoutAll} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
