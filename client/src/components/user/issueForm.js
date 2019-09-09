import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import _ from 'lodash';


import '../../containers/add-issue/index.css';
import schema from '../../containers/formSchema/addIssueUser';
import NavOutUser from '../../containers/glob/navOutUser';
import { API_ROOT } from '../../apis/api2';

const log = (type) => console.log.bind(console, type);

class AddIssueUser extends Component {
    constructor(props){
        super(props);
        

        this.state = {term: ''};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        
        console.log("Data submitted: ",  event.formData);
        const obj = {
            title: event.formData.title,
            issueType: event.formData.issueType,
            chanel: event.formData.chanel,
            description: event.formData.description,
            complaneDate: Date.now(),
            file: event.formData.file,
            organization: event.formData.organization,
                firstname: event.formData.customer.firstname,
                lastname: event.formData.customer.lastname,
                address: event.formData.customer.address,
                phone: event.formData.customer.phone,
                email: event.formData.customer.email,

            status: event.formData.status,
            createdBy: this.props.auth.username,
            createdById : this.props.auth.id,
            
        }
        
        axios.post(`${API_ROOT}/issues`, obj)
        .then(res => {
            swal({
                title: "เพิ่มสำเร็จ",
                text: "ข้อร้องเรียนถูกเพิ่มเข้าสู่ระบบเรียบร้อย",
                icon: "success",
                button: "ปิด",
              }); 
            this.setState(this.state);
        });
        console.log("Data submitted: obj",  obj);
    }

    render() {
        return (
            <div><NavOutUser/>
            <div style={{ marginTop: 50 }}>
            <div className='issue-form' >
            <Form
                schema={schema.schema}
                //onChange={log("changed")}
                //onSubmit={log("submitted")}
                onSubmit = {this.onSubmit}
                onError={log("errors")}
                uiSchema={schema.uiSchema}
                chanelEnum = {schema.schema.definitions.chanelEnum.enum = _.map(this.props.chanelList.name, 'name')}
                departEnum = {schema.schema.definitions.departEnum.enum = _.map(this.props.organList, 'name')}
                typeEnum = {schema.schema.definitions.typeEnum.enum = _.map(this.props.catList, 'name')}
                > 
                

                <div className="row">
                    <div className="col-sm-3">
                    <Link to="/user/issues">
                    <button type="submit" className="btn btn-danger btn-lg btn-block">ยกเลิก</button>
                    </Link>
                    </div>
                    <div className="col-6">
                    </div>
                    <div className="col-sm-3 text-right">
                        <button type="cancle" className="btn btn-primary btn-lg btn-block">ยืนยัน</button>
                    </div>
                </div>
            </Form>
        </div>  
        </div> 
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { 
        auth: state.auth,

        chanelList: state.chanelList, 
        catList: state.catList,
        organList: state.organList,
    }
}
export default connect(mapStateToProps, {  })(AddIssueUser);