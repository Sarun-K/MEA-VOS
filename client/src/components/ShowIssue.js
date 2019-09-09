import React, { Component } from 'react';
import '../containers/add-issue/index.css'
import ShowIssueTable from '../containers/ShowIssue/showIssueTable'

export default class showIssueTable extends Component {
    render() {
      return (
        <div>
          <ShowIssueTable/>
        </div>
      );
    }
  }