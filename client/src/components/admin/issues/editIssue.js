import React, { Component } from 'react';
import Form from "react-jsonschema-form";
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import _ from 'lodash';

import schema from '../../../containers/formSchema/adminIssueEdit';
import '../../../containers/add-issue/index.css';
import NavbarOut from '../../../containers/glob/navbarOut';
import { API_ROOT } from '../../../apis/api2';

var file;
var url;



class AdminEditIssue extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            data: [],
            authStat: null,
            selectedData: [],
            param: [],
            fileload: [],
            name:[],
            isReload: false
            
        };
        this.editModal=this.editModal.bind(this);
        this.downloadPDF=this.downloadPDF.bind(this);
        
       
        
    }
    
    componentDidMount(){
        console.log('chanel props', this.props.chanelList);
        const id = this.props.match.params.id;
        
        if(this.props.auth.role === 'admin'){
          axios
              .get(`${API_ROOT}/admin/issues/${id}`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
              .then(res => {
                this.setState({
                    selectedData: res.data,
                    param: id,
                  })
                  file = this.state.selectedData.file
                  if(file[0].files===undefined)
                    {

                    }
                else{
                    
                      
                    const fileHandle = file[0].files;
                    var arr = fileHandle.split(',')
                    /// file name
                
                    var temp = arr[0].split(';')
                    var name = temp[1].split('=');

                      this.setState({
                        name: name[1]
                      })
                      console.log('name', name[1]);
                      console.log('file.state.name', this.state.name);
                }  
              });
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


    downloadPDF(){

        if(file[0].files===undefined)
            {
                swal({
                    title: "ไม่มีเอกสารแนบ",
                    text: "ข้อร้องเรียนนี้ไม่มีเอกสารแนบ",
                    icon: "warning",
                    button: "ปิด",
                  }); 
            }
        else{
            const fileHandle = file[0].files;
        var arr = fileHandle.split(',')
        /// file name
        
        var temp = arr[0].split(';')
        //var name = temp[1].split('=');
        
        /////// file name
        var type = temp[0].split(':');
        /////// file type

        ////// file type
            // decode base64 string, remove space for IE compatibility
            var binary = atob(arr[1]);
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
            }
            
            // create the blob object with content-type "application/pdf"               
            var blob1 = new Blob( [view], { type: type[1] });
            
            url = URL.createObjectURL(blob1);
            window.open(url, "_blank");
            }
        
            
    }
    
    editModal(event){

        const id = this.props.match.params.id;
        
            axios
            .put(`${API_ROOT}/admin/issues/${id}`,{
                title: event.formData.title,
                issueType: event.formData.issueType,
                chanel: event.formData.chanel,
                description: event.formData.description,
                file: event.formData.file,
                organization: event.formData.organization,
                    firstname: event.formData.customer.firstname,
                    lastname: event.formData.customer.lastname,
                    address: event.formData.customer.address,
                    phone: event.formData.customer.phone,
                    email: event.formData.customer.email,
                    status: event.formData.status,
                    createdBy: event.formData.createdBy,
                }, 
                { headers: {"x-access-token" : `${this.props.auth.token}`} })
            .then(res => {
                console.log('event.form.data.lastname',event.formData)
                swal({
                    title: "แก้ไขสำเร็จ",
                    text: "",
                    icon: "success",
                    button: "ปิด",
                  }); 
                  this.props.history.push(`/admin/issues`); 
            })
        
        
       
        console.log('event.form.data.lastname',event.formData)
        
    }

    render() {
        if(this.state.authStat === false){
            
            return <Redirect to='/error' />
 
         }
        return (
            <div>
                <NavbarOut/>
                <div style={{ marginTop: 20 }}>
                <div className='issue-page'>
                    <div className='container'>
                        <div className='row issue-form'>
                            <div className='col'/>
                            <div className='col-10'>
                                <div className="card">
                                <div className='issue-form'>
                                <Form
                                    schema={schema.schema}
                                    //onChange={log("changed")}
                                    //onSubmit={log("submitted")}
                                    onSubmit = {this.editModal}
                                    //onError={log("errors")}
                                    uiSchema={schema.uiSchema}
                                    formData={schema.formData=this.state.selectedData}
                                    chanelEnum = {schema.schema.definitions.chanelEnum.enum = _.map(this.props.chanelList.name, 'name')}
                                    departEnum = {schema.schema.definitions.departEnum.enum = _.map(this.props.organList, 'name')}
                                    typeEnum = {schema.schema.definitions.typeEnum.enum = _.map(this.props.catList, 'name')}
                                    > 
                                        <div className="row" style={{marginBottom:20}}>
                                        <div className="col-sm-6">
                                            <p>{`เอกสราแนบ:${this.state.name}`}</p>
                                            
                                        </div>
                                        <div>
                                        <Link to={`/admin/issues/${this.state.param}`}>
                                            <button  className="btn btn-info" onClick={this.downloadPDF }>เปิดเอกสารแนบ</button>
                                        </Link>
                                        </div>
                                        </div>
                                        
                                        
                                        <div className="row">
                                            <div className="col-sm-3">
                                            <Link to="/admin/issues">
                                                <button type="cancle" className="btn btn-danger btn-lg btn-block">ยกเลิก</button>
                                            </Link>
                                                
                                            </div>
                                                <div className="col-6">
                                            </div>
                                            <div className="col-sm-3 text-right">
                                                <button type="submit" className="btn btn-primary btn-lg btn-block" >ยืนยัน</button>
                                            </div>
                                        </div>
                                    </Form>
                                    
                                                 
                                            
                        
                                    </div>
                                </div>
                            </div>
                            <div className='col'/>
                        </div>
                    </div>
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

export default connect(mapStateToProps, {  })(AdminEditIssue);