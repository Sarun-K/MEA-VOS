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
import schema from "../../../containers/formSchema/formSchema";
import { fechOrgan } from '../../../actions/index';
import "../index.css"


class Organ extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            authStat: null,
            selectedRow: null,
            
            editHandle: false,
            addHandle: false,
            delHandle : false,

            columns: [
              {
                dataField: 'name',
                text: 'หน่วยงานรับเรื่อง'
              },
              
             ]
        }
        this.editModal = this.editModal.bind(this);
        this.adกModal = this.adกModal.bind(this);
        this.delModal = this.delModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editOnSubmit = this.editOnSubmit.bind(this);
        this.addOnsubmit = this.addOnsubmit.bind(this);
        

    }
    fecth(){

        if(this.props.auth.role === 'admin'){
            axios
            .get(`${API_ROOT}/organizations`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
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
            this.setState(() => ({
                editHandle: true
              }))
        }
        
    }
    adกModal(){
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
                .delete(`${API_ROOT}/organizations/${this.state.selectedRow}`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
                .then(res => {
                    this.setState(() => ({
                    addHandle: false,
                    selectedRow: null
                    }))
                    this.props.fechOrgan();
                        this.fecth();
                        swal({
                        title: "ลบสำเร็จ",
                        text: "ลบหน่วยงานรับเรื่องสำเร็จ",
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
        .post(`${API_ROOT}/organizations`,{name: event.formData.name} , { headers: {"x-access-token" : `${this.props.auth.token}`} })
        .then(res => {
            this.setState(() => ({
                addHandle: false,
              }))
              this.props.fechOrgan();
            this.fecth();
            swal({
                title: "เพิ่มสำเร็จ",
                text: `เพิ่มหน่วยงานรับเรื่อง: ${event.formData.name}`,
                icon: "success",
                button: "ปิด",
              }); 
              
        })
    }
    editOnSubmit(event){
        axios
        .put(`${API_ROOT}/organizations/${this.state.selectedRow}`,{name: event.formData.name} , 
            { headers: {"x-access-token" : `${this.props.auth.token}`} })
        .then(res => {
            this.setState(() => ({
                editHandle: false,
              }))
              this.props.fechOrgan();
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
                <div className="wrap">
                    <div className="header">จัดการหน่วยงานรับเรื่อง
    
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
                        <button type="button" className="btn btn-success" onClick={this.adกModal} style={{marginRight: 10}}>เพิ่ม</button>
                        <button type="button" className="btn btn-danger" onClick={this.delModal} style={{marginRight: 10}}>ลบ</button>
                    </div>
                </div>
                    <Modal show={this.state.editHandle} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>แก้้ไขหน่วยงานรับเรื่อง</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Form
                                schema={schema.schema}
                                //onChange={log("changed")}
                                onSubmit={this.editOnSubmit}
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


                <Modal show={this.state.addHandle} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>เพิ่มหน่วยงานรับเรื่อง</Modal.Title>
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
    return { 
        auth: state.auth,
        organList: state.organList,
    
    }
}

export default connect(mapStateToProps, { fechOrgan })(Organ);
