import React from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Modal,Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import paginationFactory from 'react-bootstrap-table2-paginator';


import NavbarOut from '../../../containers/glob/navbarOut';
import { API_ROOT } from '../../../apis/api2';
import Form from "react-jsonschema-form";
import schema from "../../../containers/formSchema/userSchema";
import addSchema from "../../../containers/formSchema/addUserSchema";
import "../index.css"


class User extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            selectedRow: null,
            selectedUser: [],
            
            editHandle: false,
            addHandle: false,
            delHandle : false,

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
        this.editModal = this.editModal.bind(this);
        this.addModal = this.addModal.bind(this);
        this.delModal = this.delModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editOnSubmit = this.editOnSubmit.bind(this);
        this.addOnsubmit = this.addOnsubmit.bind(this);
    }
    fecth(){

        if(this.props.auth.role === 'admin'){
            axios
            .get(`${API_ROOT}/admin/users/`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
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
            
              axios
              .get(`${API_ROOT}/admin/users/${this.state.selectedRow}`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
              .then(res => {
                  console.log('res.date', res.data);
                      this.setState({
                        selectedUser: res.data,
                      })
                      this.setState(() => ({
                        editHandle: true
                      }))
              
              });
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
                .delete(`${API_ROOT}/admin/users/${this.state.selectedRow}`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
                .then(res => {
                    this.setState(() => ({
                    addHandle: false,
                    selectedRow: null
                    }))
                        this.fecth();
                        swal({
                        title: "ลบสำเร็จ",
                        text: "ลบหผู้ใช้งานสำเร็จ",
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
                text: `เพิ่มผู้ใช้งาน: ${event.formData.username}`,
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
                <div className = "wrap">
                    <div className="header">จัดการผู้ใช้งาน
    
                    </div>
                    <div className = "container" style={{ marginTop: 20 }}>

                      <BootstrapTable 
                        striped
                        hover
                        keyField='_id' 
                        data={ this.state.data } 
                        columns={ this.state.columns } 
                        selectRow={ SelectRow }
                        bordered={ false }
                        pagination={ paginationFactory() }
                       />   

                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" onClick={this.editModal} style={{marginRight: 10}}>แก้ไข</button>
                        <button type="button" className="btn btn-success" onClick={this.addModal} style={{marginRight: 10}}>เพิ่ม</button>
                        <button type="button" className="btn btn-danger" onClick={this.delModal} style={{marginRight: 10}}>ลบ</button>
                    </div>
                </div>
                    <Modal show={this.state.editHandle} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>แก้้ไขผู้ใช้งาน</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form
                                schema={schema.schema}
                                //onChange={log("changed")}
                                onSubmit={this.editOnSubmit}
                                //onError={log("errors")}
                                uiSchema={schema.uiSchema}
                                formData={schema.formData=this.state.selectedUser}> 
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
                            <Modal.Title>เพิ่มผู้ใช้งาน</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form
                                schema={addSchema.schema}
                                //onChange={log("changed")}
                                onSubmit={this.addOnsubmit}
                                //onError={log("errors")}
                                uiSchema={addSchema.uiSchema}
                                formData={addSchema.formData}> 
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

export default connect(mapStateToProps, {  })(User);