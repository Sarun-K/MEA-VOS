import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import schema from './formSchema'
import axios from 'axios';
import '../../containers/add-issue/index.css'

const log = (type) => console.log.bind(console, type);

export default class AddIssue extends Component {
    constructor(props){
        super(props);
        

        this.state = {term: ''};

    }

    onSubmit(event) {
        
        console.log("Data submitted: ",  event.formData);
        const obj = {
            title: event.formData.issue,
            issueType: event.formData.type,
            chanel: event.formData.chanel,
            description: event.formData.detail,
            complaneDate: Date.now(),
            file: event.formData.file,
            organization: event.formData.department,
                firstname: event.formData.stringFormats.firstname,
                lastname: event.formData.stringFormats.lastname,
                address: event.formData.stringFormats.address,
                phone: event.formData.stringFormats.tel,
                email: event.formData.stringFormats.email,
                status: event.formData.status,
                createdBy: event.formData.createdBy,
            
        }
        console.log('obj', obj);
        axios.post('http://localhost:3000/api/issues', obj)
        .then(res => console.log(res.data));
    }

    render() {
        return (
            <div className='issue-form'>
            <Form
                schema={schema.schema}
                //onChange={log("changed")}
                //onSubmit={log("submitted")}
                onSubmit = {this.onSubmit}
                onError={log("errors")}
                uiSchema={schema.uiSchema}> 

                <div className="row">
                    <div className="col-sm-3">
                        <button type="submit" className="btn btn-danger btn-lg btn-block">ยกเลิก</button>
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