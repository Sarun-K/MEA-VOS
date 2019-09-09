import React, { Component } from 'react';
import LoginForm from '../../containers/login/login_form'
import LoginHeader from '../../containers/login/login_header'


import '../../containers/login/index.css'

class login extends Component {
    render() {
      return (
        <div>
          
          <div className="auth-page">
            <LoginHeader/>
            <div className="card">
              <LoginForm/>
            </div>
          </div>
        </div>
        
      );
    }
  }

  export default login;