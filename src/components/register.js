import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from 'axios';
import '../css/error__item.css';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom'
import Login from './auth/Login';
import { createBrowserHistory } from 'history';
import logo from '../assets/image/logo.png'
const history = createBrowserHistory();

class Register extends Component {
    constructor() {
        super();
        this.state = {
            fullname: "",
            email: "",
            username: "",
            password: "",
            password2: "",
            errors: [],
            redirect: false
        };
    }

    onChange = e => {


        this.setState({ [e.target.id]: e.target.value });


    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            fullname: this.state.fullname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        };

        axios({
            method: 'post',
            // url: 'http://localhost:3000/register',
            url: 'https://server-project-1.herokuapp.com',
            data: newUser
        })
            .then(response => {
                console.log(response);

                if (response.status == 200) {
                    this.setState({
                        errors: response.data
                    })
                    console.log(this.state.errors);
                } else if (response.status == 201) {
                    alert('Check your email to Active User before Login');
                    this.setState({
                        redirect: true
                    })
                }

            })
            .catch(function (error) {
                console.log(error);
            });


    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }


    render() {
        const { errors } = this.state;

        return (
            <>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src={logo} id="icon" alt="User Icon" style={{ padding: "15px" }} />
                            <h1>Welcome,</h1>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <input
                                className="fadeIn second"
                                placeholder="Full Name"
                                onChange={this.onChange}
                                value={this.state.fullname}
                                error={errors.fullname}
                                id="fullname"
                                type="text" />
                            <input
                                className="fadeIn second"
                                placeholder="Email"
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
                            />
                            <input
                                className="fadeIn second"
                                placeholder="Username"
                                onChange={this.onChange}
                                value={this.state.username}
                                error={errors.username}
                                id="username"
                                type="text" />
                            <input
                                className="fadeIn third"
                                name="login"
                                placeholder="Password"
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id="password"
                                type="password" />
                            <input
                                className="fadeIn third"
                                name="login"
                                placeholder="Confirm password"
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password" />
                            <p className="grey-text text-darken-1">
                                Already have an account? <Link to="/login">Log in</Link>
                            </p>
                            <ul>
                                {errors.map(error =>
                                    <li className="error__item" key={error}>{error}</li>
                                )}
                            </ul>
                            <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
                        </form>
                    </div>
                </div>
                
            </>
        );
    }
}

export default Register