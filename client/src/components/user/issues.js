import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Modal,Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import paginationFactory from 'react-bootstrap-table2-paginator';


import NavbarOut from '../../containers/glob/navOutUser';
import { API_ROOT } from '../../apis/api2';
import Form from "react-jsonschema-form";
import schema from "../../containers/formSchema/userSchema";
import issuesSchema from "../../containers/formSchema/issueEdit";
import './index.css';


class issuesList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            authStat: null,
            selectedRow: null,
            selectedData: [],
            
            editHandle: false,
            addHandle: false,
            delHandle : false,

            
        }
        this.editModal = this.editModal.bind(this);
        this.addModal = this.addModal.bind(this);
        this.delModal = this.delModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editOnSubmit = this.editOnSubmit.bind(this);
        this.addOnsubmit = this.addOnsubmit.bind(this);
    }
    fecth(){
        console.log('role', this.props.auth.id);
        if(this.props.auth.role === 'user'){
            axios
            .get(`${API_ROOT}/issues/user/${this.props.auth.id}`,{

            }, 
            { headers: {"x-access-token" : `${this.props.auth.token}`} })
            .then(res => {
                console.log('res.date', res.data);
                    this.setState({
                        data: res.data,
                    })
            
            });
            this.setState(() => ({
                authStat: true
              }))
        }
        else{
            console.log('logout');
            this.setState(() => ({
                authStat: false
              }))
        }
    }

componentDidMount(){
    this.fecth();
}
    
editModal(){
        if(this.state.selectedRow === null){
            this.setState(() => ({
                editHandle: false
              }))
              swal("ผิดพลาด!", "กรุณาเลือกรายการแก้ไข", "warning");
        }
        else{
            this.props.history.push(`/user/issues/${this.state.selectedRow}`)
            
        }
        
    }
    addModal(){
            this.setState(() => ({
                addHandle: true
              }))
    }

    delModal(){
        if(this.state.selectedRow === null){
            swal("ผิดพลาด!", "กรุณาเลือกรายการลบ", "warning");
        }
        else{
            axios
                .delete(`${API_ROOT}/user/issues/${this.state.selectedRow}`, 
                { headers: {"x-access-token" : `${this.props.auth.token}`} })

                .then(res => {
                    this.setState(() => ({
                    addHandle: false,
                    selectedRow: null
                    }))
                        this.fecth();
                        swal({
                        title: "ลบสำเร็จ",
                        text: "ลบข้อร้องเรียนสำเร็จ",
                        icon: "success",
                        button: "ปิด",
                    }); 
              
        })
        }
    }
    handleClose(){
        this.setState(() => ({
            editHandle: false,
            addHandle:false
          }))
    }
    addOnsubmit(event){
        console.log('add chanel',event.formData)
        axios
        .post(`${API_ROOT}/users/register`,{
                username: event.formData.username,
                password: event.formData.password,
                email: event.formData.email,
                firstname: event.formData.firstname,
                lastname: event.formData.lastname,
                role: event.formData.role,
                areaCode: event.formData.areaCode,
        } , 
        
            { headers: {"x-access-token" : `${this.props.auth.token}`} })
        .then(res => {
            this.setState(() => ({
                addHandle: false,
              }))
            this.fecth();
            swal({
                title: "เพิ่มสำเร็จ",
                text: "เพิ่มข้อร้องเรียนสำเร็จ",
                icon: "success",
                button: "ปิด",
              }); 
              
        })
    }
    editOnSubmit(event){
        axios
        .put(`${API_ROOT}/admin/users/${this.state.selectedRow}`,{
                username: event.formData.username,
                email: event.formData.email,
                firstname: event.formData.firstname,
                lastname: event.formData.lastname,
                role: event.formData.role,
                areaCode: event.formData.areaCode,
            }, 
            { headers: {"x-access-token" : `${this.props.auth.token}`} })
        .then(res => {
            console.log('event.form.data.lastname',event.formData)
            this.setState(() => ({
                editHandle: false,
              }))
            this.fecth();
            swal({
                title: "แก้ไขสำเร็จ",
                text: "",
                icon: "success",
                button: "ปิด",
              }); 
              
        })
        
    }

    render() {

        const columns= [
            {
                dataField: 'title',
                text: 'เรื่อง'
            },
            {
                dataField: 'issueType',
                text: 'ประเภท'
            },
            {
                dataField: 'chanel',
                text: 'ช่องทางร้องเรียน'
            },
            {
                dataField: 'organization',
                text: 'หน่วยงานร้องเรียน'
            },
            {
                dataField: 'status',
                text: 'สถานะ',
                formatter: (cellContent, row) => {
                    console.log('gxbf-hvihvgiupo',row);
                    if (row.status === 'เปิดข้อร้องเรียน') {
                      return (
                        <h5>
                          <span className="badge badge-primary"> เปิดข้อร้องเรียน</span>
                        </h5>
                      );
                    }
                    else if(row.status === 'กำลังดำเนินการ'){
                        return (
                            <h5>
                              <span className="badge badge-warning"> กำลังดำเนินการ</span>
                            </h5>
                          );
                    }
                    else if(row.status === 'เสร็จสิ้น'){
                        return (
                            <h5>
                              <span className="badge badge-success"> เสร็จสิ้น</span>
                            </h5>
                          );
                    }
                    
                  }
                
            },
            {
                dataField: 'createdBy',
                text: 'ร้องเรียนโดย'
            },
           ];


        if(this.state.authStat === false){
            
           return <Redirect to='/error' />

        }
        const SelectRow = {
            mode: 'radio',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                this.setState({
                    selectedRow: row._id,
                })
              }
          };
        
        return <div className = "container"><NavbarOut/>
                <div className="wrap">
                    <div className="header">จัดข้อร้องเรียน
    
                    </div>
                    <div className = "container" style={{ marginTop: 20 }}>

                      <BootstrapTable 
                        striped
                        hover
                        keyField='_id' 
                        data={ this.state.data } 
                        columns={columns } 
                        selectRow={ SelectRow }
                        bordered={ false }
                        pagination={ paginationFactory() }
                       />   

                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={this.editModal} style={{marginRight: 10}}>แก้ไข</button>
                        <button type="button" className="btn btn-danger" onClick={this.delModal} style={{marginRight: 10}}>ลบ</button>
                    </div>
                </div>
                    <Modal show={this.state.editHandle} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>แก้้ข้อร้องเรียน</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form
                                schema={issuesSchema.schema}
                                //onChange={log("changed")}
                                onSubmit={this.editOnSubmit}
                                //onError={log("errors")}
                                uiSchema={issuesSchema.uiSchema}
                                formData={issuesSchema.formData=this.state.selectedData}> 
                                <div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">บันทึก</button>
                                </div>
                            </Form>

                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            ปิด
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal show={this.state.addHandle} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>เพิ่มข้อร้องเรียน</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form
                                schema={schema.schema}
                                //onChange={log("changed")}
                                onSubmit={this.addOnsubmit}
                                //onError={log("errors")}
                                uiSchema={schema.uiSchema}
                                formData={schema.formData}> 
                                <div>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">บันทึก</button>
                                </div>
                            </Form>

                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            ปิด
                        </Button>
                    </Modal.Footer>
                </Modal>
                
        </div>;
    }

}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, {  })(issuesList);