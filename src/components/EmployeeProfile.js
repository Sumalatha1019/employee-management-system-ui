import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeProfile = () => {
	const { id } = useParams();

	const [employee, setEmployee] = useState({
		firstName: "",
		lastName: "",
		emailId: "",
		joiningDate: "",
	});

	
	useEffect(() => {
		const loadEmployee = async () => {
		  try {
			const result = await axios.get(`http://localhost:8080/api/v1/employees/${id}`);
			setEmployee(result.data);
		  } catch (error) {
			console.error('Error loading employee:', error);
		  }
		};
	  
		loadEmployee(); 
	  
	  }, [id]);

	return (
		<section
			className="shadow"
			style={{ backgroundColor: "whitesmoke" }}
		>
			<div class="ui container">
				<h1 class="ui center aligned header">Employee Profile</h1>
			</div>
			<div className="container py-5">
				<div className="row">
					<div className="col-lg-3">
						<div className="card mb-4">
							<div className="card-body text-center">
								<img
									src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
									alt="avatar"
									className="rounded-circle img-fluid"
									style={{ width: 150 }}
								/>
								<h5 className="my-3">
									{`${employee.firstName} ${employee.lastName}`}
								</h5>
						
							</div>
						</div>
					</div>

					<div className="col-lg-9">
						<div className="card mb-4">
							<div className="card-body">
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											First Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.firstName}
										</p>
									</div>
								</div>

								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Last Name
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.lastName}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">Email</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.emailId}
										</p>
									</div>
								</div>
								<hr />

								<div className="row">
									<div className="col-sm-3">
										<h5 className="mb-0">
											Joining Date
										</h5>
									</div>

									<div className="col-sm-9">
										<p className="text-muted mb-0">
											{employee.joiningDate}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EmployeeProfile;
