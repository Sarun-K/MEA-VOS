import React, { Component } from 'react';

export default class LoginHeader extends Component {

    constructor(props){
        super(props);

        this.state = {term: ''};

    }

    render() {
        return (
            
            <div className="heading">
                <h1>เข้าสู่ระบบ</h1>
                <h3>Customer Complaints</h3>
            </div>

        );
    }
}