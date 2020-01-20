import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React, { Component } from "react";

import About from "./About";
import AuthRoute from "./AuthRoute";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import NotFound from "./NotFound";
import Profile from "./Profile";

import "./assets/css/App.css";

class App extends Component {
  // const [user, setUser] = useState(null);
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      authenticated: false,
      nickname: "",
      profile_image: "",
      email: ""
    };
  }

  login(user) {
    this.setState({
      authenticated: true,
      user: {
        nickname: user.nickname,
        profile_image: user.profile_image,
        email: user.email
      }
    });
  }

  logout() {
    this.setState({
      authenticated: false
    });
  }

  render() {
    return (
      <div className="page">
        <Router>
          <div className="menu">
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/about">
              <button>About</button>
            </Link>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
            {this.state.authenticated ? (
              <Link to="/">
                <Logout logout={this.logout} />
              </Link>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
          </div>
          <div className="main">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <AuthRoute
                authenticated={this.state.authenticated}
                path="/profile"
                render={props => <Profile user={this.state.user} {...props} />}
              />
              <Route
                path="/login"
                render={props => (
                  <Login
                    authenticated={this.state.authenticated}
                    login={this.login}
                    {...props}
                  />
                )}
              />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
