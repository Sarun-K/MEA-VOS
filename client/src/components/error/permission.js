import React from 'react';
import { Link } from 'react-router-dom';


import './index.css';


class permission extends React.Component {
    render() {
        
        return <div className="trim">
                    <div className="head-line">
                        <p>
                        Access Denied: You must login
                        </p>
                        <p>
                        ท่านไม่มีสิทธ์ในการเข้าถึงส่วนนี้ กรุณาเข้าสู่ระบบ
                        </p>
                        <div>
                        <Link to="/login">
                        <button type="button" className="btn btn-primary btn-lg" style={{marginRight: 15}}>เข้าสู่ระบบ</button>
                        </Link>
                        <Link to="/">
                        <button type="button" className="btn btn-success btn-lg" style={{marginLeft: 15}}>กลับหน้าหลัก</button>
                        </Link>
                        </div>
                    </div>
                
            </div>
            
    }

}

export default permission;