import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Navbar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
        }
    }
    componentDidMount() {
      console.log('clear auth');

    }

    render() {
        return <div className="setNav"><nav className="navbar navbar-expand-sm navbar-light">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-sm-2">
          <Link to="/login">
            <button type="button" className="btn btn-primary" >Login</button>
          </Link>
          </li>
        </ul>
      </nav></div>;
    }

}



export default Navbar;
