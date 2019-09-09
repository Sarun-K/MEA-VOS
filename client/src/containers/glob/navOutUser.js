import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal,Button } from 'react-bootstrap';
import Form from "react-jsonschema-form";
import swal from 'sweetalert';

import { API_ROOT } from '../../apis/api2';
import schema from "../../containers/formSchema/userSchemaUserEdit";
import './index.css'

class Navbar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            editHandle: false,
        }
        this.editModal=this.editModal.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.editOnSubmit=this.editOnSubmit.bind(this);
    }


    handleClose(){
        this.setState(() => ({
            editHandle: false,
          }))
    }

    editModal(){

        axios
        .get(`${API_ROOT}/user/edit/${this.props.auth.id}`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
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
    editOnSubmit(event){
        axios
        .put(`${API_ROOT}/user/edit/${this.props.auth.id}`,{
                username: this.props.auth.username,
                email: event.formData.email,
                firstname: event.formData.firstname,
                lastname: event.formData.lastname,
                role: this.props.auth.role,
                areaCode: event.formData.areaCode,
            }, 
            { headers: {"x-access-token" : `${this.props.auth.token}`} })
        .then(res => {
            console.log('event.form.data.lastname',event.formData)
            this.setState(() => ({
                editHandle: false,
              }))
            swal({
                title: "แก้ไขสำเร็จ",
                text: "",
                icon: "success",
                button: "ปิด",
              }); 
              
        })
        
    }

    render() {
        return <div>
            <nav className="navbar navbar-expand-sm navbar-dark fixed-top setNavOut">
                <ul className="navbar-nav mr-auto" >

                    <li className="nav-item">
                        <NavLink exact to="/user/addissue" activeClassName="active" className="nav-link">เพิ่มข้อร้องเรียน</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact to="/user/issues" activeClassName="active" className="nav-link">ข้อร้องเรียน</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-sm-2"> 
                    <button type="button" onClick={this.editModal} className="btn btn-info">แก้ไขผู้ใช้</button>
                    </li>
                    <li className="nav-item mr-sm-2">
                        <Link to="/">
                            <button type="button" className="btn btn-primary">Logout</button>
                        </Link>
                    </li>
                </ul>
        </nav>


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

      </div>;
    }

}

const mapStateToProps = (state) => {
    return { auth: state.auth }
}

export default connect(mapStateToProps, {  })(Navbar);