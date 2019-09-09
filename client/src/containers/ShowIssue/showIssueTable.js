import React, { Component } from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';





export default class ShowIssueTable extends Component {

    constructor(props){
        super(props);

        this.state = {
            data:[],
        };
    }
    componentWillMount() {
        axios
            .get("http://localhost:5000/api/get/issues")
            .then(response => {
                this.setState({
                  data: response.data,
                  
                });
              })
              .catch(error => this.setState({ error, isLoading: false }));

     }   
     
     

    render() {
        const { data } = this.state; 
          console.log('quantity', data);
          function enumFormatter(cell, row, enumObject) {
            return enumObject[cell];
          }

        function onRowSelect(row, isSelected, e) {
            console.log(row._id);
          }
        const selectRowProp = {
            mode: 'radio',
            onSelect: onRowSelect,
          };
        
        
        return (
            
            <div>
                <div>
                {console.log('test2', this.state.data)}
                {console.log('test4', data[1])}
                {console.log('enum', enumFormatter.enumObject)}
                  
                    <BootstrapTable data={data} striped hover condensed selectRow={ selectRowProp }>
                        <TableHeaderColumn isKey dataField='_id' hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn width='170' dataField='title'>เรื่อง</TableHeaderColumn>
                        <TableHeaderColumn width='170' dataField='issueType'>ประเภท</TableHeaderColumn>
                        <TableHeaderColumn width='170' dataField='organization' >หน่วยงาน</TableHeaderColumn>
                        <TableHeaderColumn width='170' dataField='chanel'>ช่องทาง</TableHeaderColumn>
                        <TableHeaderColumn width='170' dataField='complaneDate' >วันร้องเรียน</TableHeaderColumn>
                    </BootstrapTable>
                    
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr align="center">
                            <th>ID</th>
                            <th>เรื่อง</th>
                            <th>วันที่ร้องเรียน</th>
                            <th>วันที่รับเรื่อง</th>
                            <th>สถานะ</th>
                            <th>ประเภท</th>
                            <th>ช่องทาง</th>
                            <th>หน่วยงานที่รับเรื่อง</th>
                            <th>วันที่เสร็จสิ้น</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr align="center">
                            <th>1</th>
                            <td>2-2-62</td>
                            <td>2-2-62</td>
                            <td className="table-success">เสร็จสิ้น</td>
                            <td>lorem</td>
                            <td>ipsum</td>
                            <td>dollas</td>
                            <td>lorem</td>
                            <td>2-2-62</td>        
                            <td>
                            <div className="dropdown">
  <a className="btn btn-secondary dropdown-toggle" href="#drop" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    ตัวเลือก
  </a>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div>
                            </td>                      
                        </tr>
                    </tbody>
                </table>
            </div>
            

        );
    }
}