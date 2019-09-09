import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import _ from 'lodash';




import '../add-issue/index.css';
import schema from '../formSchema/issueEdit';
import { API_ROOT } from '../../apis/api2';
import { fechChanel, fechCat, fechOrgan } from '../../actions/index';

class AddIssue extends Component {
    constructor(props){
        super(props);
        

        this.state = {
            term: '',
            chanel: []
        };
        

        this.onSubmit = this.onSubmit.bind(this);
        
    }
    
    componentDidMount(){
        this.props.fechChanel();
        this.props.fechCat();
        this.props.fechOrgan();
    }
        
    
        
    
    onSubmit(event) {
        
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
                createdBy: event.formData.createdBy,
            
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
        
    }

    render() {
        return (
            <div className='issue-form'>
            {console.log('is render')}
            <Form
                schema={schema.schema}
                //onChange={log("changed")}
                //onSubmit={log("submitted")}
                onSubmit = {this.onSubmit}
                //onError={log("errors")}
                uiSchema = {schema.uiSchema}
                chanelEnum = {schema.schema.definitions.chanelEnum.enum = _.map(this.props.chanelList.name, 'name')}
                departEnum = {schema.schema.definitions.departEnum.enum = _.map(this.props.organList, 'name')}
                typeEnum = {schema.schema.definitions.typeEnum.enum = _.map(this.props.catList, 'name')}
               
                > 
                 {console.log('schema for dynamic',schema.schema.definitions)}
                <div className="row">
                    <div className="col-sm-3">
                    <Link to="/">
                    <button type="submit" className="btn btn-danger btn-lg btn-block">ล้างข้อมูล</button>
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

export default connect(mapStateToProps, { fechChanel, fechCat, fechOrgan })(AddIssue);