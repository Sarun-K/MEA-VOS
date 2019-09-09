import React from 'react';
import Navbar from '../containers/glob/navbar';
import { connect } from 'react-redux';
import equal from 'fast-deep-equal';

import { signOut } from '../actions';
import IssueForm from '../containers/unAuth/issueForm';
import '../containers/add-issue/index.css';
import { fechChanel } from '../actions/index';

class Main extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],

        }
        
    }
    
    componentDidMount() {
        this.props.fechChanel();
    }
    /*
    componentDidUpdate(prevProps) {
        if(!equal(this.props.chanelList, prevProps.chanelList)) 
        {
            console.log('update');
            this.setState(this.state);
        }
    } 
*/
    

    render() {
        return <div><Navbar/>
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
    }

}
const mapStateToProps = (state) => {
    return { 
        auth: state.auth,
        chanelList: state.chanelList,
    }
}

export default connect(mapStateToProps, { signOut, fechChanel })(Main);
