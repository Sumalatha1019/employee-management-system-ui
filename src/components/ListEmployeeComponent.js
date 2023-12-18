import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import EmployeeService from '../services/EmployeeService';

const ListEmployeeComponent = () => {
    const [deleteMessage, setDeleteMessage] = useState('');

    const [employees, setEmployees] = useState([])

    useEffect(() => {

        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
       EmployeeService.deleteEmployee(employeeId).then((response) =>{
        getAllEmployees();
        setDeleteMessage(`Employee details with ID ${employeeId} deleted successfully!!`);
        
        setTimeout(() => {
          setDeleteMessage('');
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        setDeleteMessage('Error deleting employee');
      });
  };


    return (
        <div className = "ui container center aligned">
            
            <Link to={`/add-employee`}>
            <button class="ui primary button"><i class="icon user"></i>Add Employee</button>
            </Link>
            <br></br>
            <br></br>
            <h2> List of Employees </h2>
            
            
            <table className="ui celled table">
                <thead className="center aligned">
                    <th> Employee Id </th>
                    <th> Employee First Name </th>
                    <th> Employee Last Name </th>
                    <th> Employee Email Id </th>
                    <th> Joining Date </th>
                    <th> Actions </th>
                </thead>
                <tbody className="center aligned">
                    {
                        employees.map(
                            employee =>
                            <tr key = {employee.id}> 
                                <td> {employee.id} </td>
                                <td> {employee.firstName} </td>
                                <td>{employee.lastName}</td>
                                <td>{employee.emailId}</td>
                                <td>{employee.joiningDate}</td>
                                <td>
                                    
                                    <Link to={`/edit-employee/${employee.id}`}>
                                        {/* <Button color="blue" icon labelPosition="left"><Icon name="edit" />Update</Button> */}
                                        <div class="ui animated blue button" tabindex="0">
                                            <div class="hidden content">Update</div>
                                            <div class="visible content">
                                                <i class="edit icon"></i>
                                                </div>
                                            </div>
                                    </Link>


                                        {/* <Button color="red" onClick={() => deleteEmployee(employee.id)}style={{ marginLeft: "10px" }}iconlabelPosition="left">
                                            <Icon name="trash" />Delete</Button> */}
                                            <Button color="red" animated="vertical" onClick={() => deleteEmployee(employee.id)} style={{ marginLeft: "10px" }}>
                                                <Button.Content hidden>Delete</Button.Content><Button.Content visible>
                                                    <Icon name="trash" /></Button.Content></Button>


                                            <Link to={`/view-employee/${employee.id}`}>
                                                {/* <Button color="blue" icon labelPosition="left"><Icon name="eye" />View</Button> */}
                                                <div class="ui animated green button" tabindex="0">
                                            <div class="hidden content">View</div>
                                            <div class="visible content">
                                                <i class="eye icon"></i>
                                                </div>
                                            </div>
                                            </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <div>
                <p style={{ color: 'red', fontWeight: 'bold' }}>{deleteMessage}</p>
            </div>
        </div>

        
    )
}

export default ListEmployeeComponent
