import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

class UserList extends React.Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    
    
    renderList() {
        return this.props.users.map(user => {
            return (
            <div className="item" key={user._id}>
                <i className="large middle align icon user"/>
                <div className="content">
                    <div className="description">
                        <h2>{user.username}</h2>
                        <h2>{user.role}</h2>
                        <p>{user._id}</p>
                    </div>
                </div>
            </div>
            );
        });
    }

    render() {
        console.log(this.props.users);
        return <div>{this.renderList()}</div>;
    }
}



const mapStateToProps = (state) => {
    return { users: state.userList}
}

export default connect(mapStateToProps, {fetchUser})(UserList);