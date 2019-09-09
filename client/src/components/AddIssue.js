import React, { Component } from 'react';

import IssueForm from '../containers/add-issue/issue-form'
import '../containers/add-issue/index.css'

export default class AddIssue extends Component {
    constructor(props){
        super(props);

        this.state = {term: ''};

    }

    render() {
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