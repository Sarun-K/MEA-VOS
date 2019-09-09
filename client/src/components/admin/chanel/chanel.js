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
import { fechChanel } from '../../../actions/index';
import "../index.css"


class Chanel extends React.Component {
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
                text: 'ช่องทางการร้องเรียน'
              },
              
             ]
        }
        this.editChanelModal = this.editChanelModal.bind(this);
        this.addChanelModal = this.addChanelModal.bind(this);
        this.delChanelModal = this.delChanelModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editOnSubmit = this.editOnSubmit.bind(this);
        this.addOnsubmit = this.addOnsubmit.bind(this);
        

    }
    fecthChanel(){

        if(this.props.auth.role === 'admin'){
            axios
            .get(`${API_ROOT}/chanels`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
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
    this.fecthChanel();
}
    
    editChanelModal(){
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
    addChanelModal(){
            this.setState(() => ({
                addHandle: true
              }))
    }

    delChanelModal(){
        if(this.state.selectedRow === null){
            swal("ผิดพลาด!", "กรุณาเลือกรายการลบ", "warning");
        }
        else{
            axios
                .delete(`${API_ROOT}/chanels/${this.state.selectedRow}`, { headers: {"x-access-token" : `${this.props.auth.token}`} })
                .then(res => {
                    this.setState(() => ({
                    addHandle: false,
                    selectedRow: null
                    }))
                        this.fecthChanel();
                        this.props.fechChanel();
                        swal({
                        title: "ลบสำเร็จ",
                        text: "ลบช่องทางการติดต่อสำเร็จ",
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
        .post(`${API_ROOT}/chanels`,{name: event.formData.name} , { headers: {"x-access-token" : `${this.props.auth.token}`} })
        .then(res => {
            this.setState(() => ({
                addHandle: false,
              }))
            this.fecthChanel();
            this.props.fechChanel();
            swal({
                title: "เพิ่มสำเร็จ",
                text: `เพิ่มช่องทางการติดต่อ: ${event.formData.name}`,
                icon: "success",
                button: "ปิด",
              }); 
              
        })
    }
    editOnSubmit(event){
        axios
        .put(`${API_ROOT}/chanels/${this.state.selectedRow}`,{name: event.formData.name} , 
            { headers: {"x-access-token" : `${this.props.auth.token}`} })
        .then(res => {
            this.setState(() => ({
                editHandle: false,
              }))
            this.fecthChanel();
            this.props.fechChanel();
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
                    <div className="header">จัดการช่องทางการร้องเรียน
    
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
                        <button type="button" className="btn btn-primary" onClick={this.editChanelModal} style={{marginRight: 10}}>แก้ไข</button>
                        <button type="button" className="btn btn-success" onClick={this.addChanelModal} style={{marginRight: 10}}>เพิ่ม</button>
                        <button type="button" className="btn btn-danger" onClick={this.delChanelModal} style={{marginRight: 10}}>ลบ</button>
                    </div>
                </div>
                    <Modal show={this.state.editHandle} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>แก้้ไขช่องทางร้องเรียน</Modal.Title>
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
                            <Modal.Title>เพิ่มช่องทางร้องเรียน</Modal.Title>
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
        chanelList: state.chanelList,
    }
}

export default connect(mapStateToProps, { fechChanel })(Chanel);
