import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './index.css';

class Navbar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
        }
    }

    render() {
        return <div className="setNavOut">
            <nav className="navbar navbar-expand-sm navbar-dark  fixed-top setNavOut">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink exact to="/admin/issues" activeClassName="active" className="nav-link">ข้อร้องเรียน</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/admin/chanel" activeClassName="active" className="nav-link">ช่องทางการร้องเรียน</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/admin/categories" activeClassName="active" className="nav-link">ประเภทข้อร้องเรียน</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/admin/organization" activeClassName="active" className="nav-link">หน่วยงานที่รับเรื่อง</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/admin/user" activeClassName="active" className="nav-link">จัดการผู้ใช้</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    
                    <li className="nav-item mr-sm-2">
                        <Link to="/">
                            <button type="button" className="btn btn-primary" onClick={this.handleClick} >Logout</button>
                        </Link>
                    </li>
                </ul>
        </nav>
      </div>;
    }

}

export default Navbar;