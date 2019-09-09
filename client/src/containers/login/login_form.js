import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import Form from "react-jsonschema-form";
import swal from 'sweetalert';


import { signIn, fechChanel, fechCat, fechOrgan } from '../../actions';


import schema from "./formSchema"
 
const log = (type) => console.log.bind(console, type);

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
            signInAdmin: false,
            signInUser: false
        }
        this.props.fechChanel();
        this.props.fechCat();
        this.props.fechOrgan();

        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(event) {
        this.props.signIn(event.formData)
        .then(() => {
            if(this.props.auth.role === 'admin'){
                this.setState(() => ({
                    signInAdmin: true
                  }))
            }
            else if (this.props.auth.role === 'user'){
                this.setState(() => ({
                    signInUser: true
                  }))
            }
            else{
                console.log('Im ERR');
                swal("ผิดพลาด", "user หรือ password ไม่ถูกต้อง", "error");
            }
        });
        
    };


    render() {
        if (this.state.signInAdmin === true) {
            return <Redirect to='/admin/issues' />
          }
        else if(this.state.signInUser === true){
            console.log('user logined');
            return <Redirect to='/user/issues' />
        }

        return (
        <div className="auth-form">
            <Form
                
                schema={schema.schema}
                //onChange={log("changed")}
                onSubmit={this.onSubmit}
                onError={log("errors")}
                uiSchema={schema.uiSchema}
                formData={schema.formData}> 
                <div>
                    <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                </div>
            </Form>
        </div>   
            
        );
    }


}

const mapStateToProps = (state) => {
    return { auth: state.auth,
        chanelList: state.chanelList, 
        catList: state.catList,
        organList: state.organList,
     }
}

export default connect(mapStateToProps, { signIn, fechChanel, fechCat, fechOrgan })(LoginForm);
