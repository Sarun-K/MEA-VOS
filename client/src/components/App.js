import React from 'react';
import { BrowserRouter, Route, Link} from 'react-router-dom';

import login from './login/Login';
import userList from './UserList';
import issues from './admin/issues/issues';
import chanel from './admin/chanel/chanel';
import permissionError from './error/permission';
import cat from './admin/categories/categories';
import organ from './admin/organization/organization'
import user from './admin/user/user'
import userIssues from './user/issues'
import addIssueUser from './user/addissues'
import editIssue from './admin/issues/editIssue'
import editIssueUser from './user/editIssue'
import userEdit from '../components/user/userEdit'


import Main from '../components/main';


const PageTwo = () => {
  return (
    <div>
      PageTwo
      <Link to = "/">nav to 1</Link>
    </div>
  );
};

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Main}/>
          <Route path="/login" exact component={login}/>

          
          <Route path="/admin/issues" exact component={issues}/>
          <Route path="/admin/issues/:id" exact component={editIssue}/>
          <Route path="/admin/chanel" exact component={chanel}/>
          <Route path="/admin/categories" exact component={cat}/>
          <Route path="/admin/organization" exact component={organ}/>
          <Route path="/admin/user" exact component={user}/>
          
          
          <Route path="/user/issues" exact component={userIssues}/>
          <Route path="/user/issues/:id" exact component={editIssueUser}/>
          <Route path="/user/addIssue" exact component={addIssueUser}/>
          <Route path="/user/edit" exact component={userEdit}/>


          <Route path="/error" exact component={permissionError}/>
          
          <Route path="/pagetwo" exact component={PageTwo}/>
          <Route path="/users" exact component={userList}/>
          
        </div>
      </BrowserRouter>
    </div>
  ); 
};

export default App;