import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';


import IssueForm from './issueForm'
import '../../containers/add-issue/index.css'

class AddIssueUser extends Component {
    constructor(props){
        super(props);
       
        this.state = {term: '',

             authStat: null,
    };

    }
    componentDidMount(){
        if(this.props.auth.role === 'user'){
            this.setState(() => ({
                authStat: true
              }))
        }
        else{
            this.setState(() => ({
                authStat: false
              }))
        }
    }

    render() {
        if(this.state.authStat === false){
            
            return <Redirect to='/error' />
 
         }
        return (
            <div>
                <div className='issue-page'>
                    <div className='container'>
                        <div className='row issue-form'>
                            <div className='col'/>
                            <div className='col-10'>
                                <div className="card">
                                <IssueForm/>
                                </div>
                            </div>
                            <div className='col'/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, {  })(AddIssueUser);

