import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';

import { API_ROOT } from '../../apis/api2';

class UserEdit extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    dataField: 'username',
                    text: 'Username'
                },
                {
                    dataField: 'email',
                    text: 'Email'
                },
                {
                    dataField: 'firstname',
                    text: 'Firstname'
                },
                {
                    dataField: 'lastname',
                    text: 'Lastname'
                },
                {
                    dataField: 'role',
                    text: 'Role'
                },
                {
                    dataField: 'areaCode',
                    text: 'Area code'
                },
                
                
               ]
        }

    }

    componentDidMount(){
        this.fech();
    }

    fech(){
        
        axios
        .get(`${API_ROOT}/user/edit/5caa46b55027e50152ecd865`)
            .then(res => {
                console.log('res.date', res.data);
                    this.setState({
                        data: res.data,
                    })
            });
    }

    renderTable(){
        const SelectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.setState({
                    selectedRow: row._id,
                })
              }
          };
        return(
            <div className = "container" style={{ marginTop: 20 }}>
                    <BootstrapTable 
                    striped
                    hover
                    keyField='_id' 
                    data={ this.state.data } 
                    columns={ this.state.columns } 
                    selectRow={ SelectRow }
                    />   
            </div>
        )
    }


    render() {
        if(!this.state.data){
            return <div>Loading...</div>
        }
        
        return <div>zfhzfghzfghzfghzfghzfg
        </div>
    }

}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, {  })(UserEdit);