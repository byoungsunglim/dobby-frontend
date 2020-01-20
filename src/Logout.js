import { withRouter } from 'react-router-dom';
import React from 'react';

function Logout({ logout }) {
  return <button onClick={logout}>Logout</button>;
}

export default Logout;