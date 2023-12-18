import React, { useState, useEffect } from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import { Button, Message } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from '../services/EmployeeService';

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const history = useHistory();
  const { id } = useParams();

  // Validation state variables
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailIdError, setEmailIdError] = useState('');
  const [joiningDateError, setJoiningDateError] = useState('');

  // Validation function
  const validateForm = () => {
    let isValid = true;

    // First Name validation
    if (!firstName.trim()) {
      setFirstNameError('First Name is required');
      isValid = false;
    } else {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(firstName)) {
        setFirstNameError('First Name should only contain letters');
        isValid = false;
      } else {
        setFirstNameError('');
      }
    }

    // Last Name validation
    if (!lastName.trim()) {
      setLastNameError('Last Name is required');
      isValid = false;
    } else {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(lastName)) {
        setLastNameError('Last Name should only contain letters');
        isValid = false;
      } else {
        setLastNameError('');
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailId)) {
      setEmailIdError('Invalid Email');
      isValid = false;
    } else {
      setEmailIdError('');
    }

    // Joining Date validation
    if (!joiningDate) {
      setJoiningDateError('Joining Date is required');
      isValid = false;
    } else {
      setJoiningDateError('');
    }

    return isValid;
  };

  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();

    const isValidForm = validateForm();
    if (isValidForm) {
      const employee = { firstName, lastName, emailId, joiningDate };

      try {
        if (id) {
          await EmployeeService.updateEmployee(id, employee);
          toast.success('Employee details updated successfully');
        } else {
          await EmployeeService.createEmployee(employee);
          toast.success('Employee details added successfully');
        }

        history.push('/employees');
      } catch (error) {
        console.error(error);
        toast.error('Error saving/updating employee');
      }
    }
  };

  useEffect(() => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmailId(response.data.emailId);
        setJoiningDate(response.data.joiningDate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const title = () => {
    if (id) {
      return <h2 className="ui container center aligned">Update Employee</h2>;
    } else {
      return <h2 className="ui container center aligned">Add Employee</h2>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> First Name :</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  ></input>
                  {firstNameError && (
                    <Message size="tiny" color="red" compact>
                      {firstNameError}{' '}
                    </Message>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Last Name :</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  ></input>
                  {lastNameError && (
                    <Message size="tiny" color="red" compact>
                      {lastNameError}{' '}
                    </Message>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Email Id :</label>
                  <input
                    type="email"
                    placeholder="Enter email Id"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                  ></input>
                  {emailIdError && (
                    <Message size="tiny" color="red" compact>
                      {emailIdError}{' '}
                    </Message>
                  )}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Joining Date :</label>
                  <input
                    type="date"
                    name="joiningDate"
                    className="form-control"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                  ></input>
                  {joiningDateError && (
                    <Message size="tiny" color="red" compact>
                      {joiningDateError}{' '}
                    </Message>
                  )}
                </div>

                <Button
                  color="green"
                  onClick={(e) => saveOrUpdateEmployee(e)}>
                  Submit
                </Button>
                <Link to="/employees">
                  <Button color="red">Cancel</Button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployeeComponent;
