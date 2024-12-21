import {Button, Form} from 'react-bootstrap';
import {useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';

import UserContext from '../context/UserContext';

import { Notyf } from 'notyf';

export default function Register(){
	const {user} = useContext(UserContext);

	const notyf = new Notyf();
    const [username, setUsername] = useState('')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	//this state will determine whether the register button is enabled or not
	const [isActive, setIsActive] = useState(false);

	useEffect(()=> {
		if( username !== "" && email !== "" &&  password === confirmPassword  ){
			setIsActive(true);
		}else{
			setIsActive(false);
		}
		

	}, [username, email, password, confirmPassword])


	const registerUser = (event) => {
		event.preventDefault();



		fetch(`http://localhost:4000/users/register`, {
			method: 'POST',
			headers: {
				"Content-Type" : 'application/json'
			},
			body: JSON.stringify({
                username,
				email,
				password
			})
		})
		.then(response => response.json())
		.then(data => {
        console.log(data)
			
			if(data.message === 'Registered successfully'){
                setUsername('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				notyf.success("Registration successful!");

			} else if(data.message === "Email invalid"){

				notyf.error('Email is invalid');

			} else if (data.message === "Mobile number invalid"){

				notyf.error('Mobile number is invalid');

			} else if(data.message === "Password must be at least 8 characters long"){

				notyf.error("Password must be at least 8 characters");

			} else {

				notyf.error("Something went wrong!");
			}
			
		})

	}



	return (
		(user.id !== null) 
		?
		<Navigate to="/login" />
		:
		<Form className ="col-6 mx-auto" onSubmit = {event => registerUser(event)}>
			<h1 className = 'my-5 text-center'>Register</h1>

            <Form.Group className="mb-3" >
		        <Form.Label>Username:</Form.Label>
		        <Form.Control 
		        	type="text" 
		        	placeholder="Enter Username" 
		        	value = {username}
		        	onChange = {event => setUsername(event.target.value)}
		        	required/>
		      </Form.Group>  

		      <Form.Group className="mb-3" >
		        <Form.Label>Email address:</Form.Label>
		        <Form.Control 
		        	type="email" 
		        	placeholder="Enter email" 
		        	value = {email}
		        	onChange = {event => setEmail(event.target.value)}
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Password:</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Password (atleast 8 characters)" 
		        	value = {password}
		        	onChange = {event => setPassword(event.target.value)}
		        	required/>
		      </Form.Group>

		      <Form.Group className="mb-3">
		        <Form.Label>Confirm Password:</Form.Label>
		        <Form.Control 
		        	type="password" 
		        	placeholder="Confirm your Password" 
		        	value = {confirmPassword}
		        	onChange = {event => setConfirmPassword(event.target.value)}
		        	required/>
		      </Form.Group>

		      {
		      	isActive ?
		      		<Button variant="primary" type="submit">
		      		  Register
		      		</Button>
		      	:
		      		<Button variant="danger" type="submit" disabled>
		        		Register
		      		</Button>
		      }
		      
		      
		</Form>
		)
}