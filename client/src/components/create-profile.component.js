import React, { Component } from 'react';
import axios from 'axios';


export default class CreateProfile extends Component {

    // in javascript classes, always call super when defining the constructor of a sub class
    constructor(props) {
        super(props);

        // binding the target value/methods to the this key word so it won't be undefined
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.onSubmit = this.onSubmit.bind(this);


        // setting the initial state of the component by assigning an object to this . state
        this.state = {
            // correlates to the mongo db document/models page
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''

            // state is how we create variables in react, and when you update the state it will update your page

        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
            firstName: e.target.value,
            lastName: e.target.value,
            email: e.target.value,
            password: e.target.value,
            confirmPassword: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // can set typical javascript variables if it is just being used in inside a single method
        const profile = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,


        }
        console.log(profile);

        //sending data to the back end connect the front and back together
        // axios sends a post to the back end end point, expects json so send the profile object as a second argument,  .then is a promise, 
        axios.post('http://localhost:5000/profile/add', profile)
            .then(res => console.log(res.data));

        this.setState({
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''


        });
    }

    render() {
        return (
            <div>
                <h5>Create new user</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <label>First Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.firstName}
                            onChange={this.onChangeUsername}
                        />
                        <label>Last Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.lastName}
                            onChange={this.onChangeUsername}
                        />
                        <label>Email: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeUsername}
                        />
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangeUsername}
                        />
                        <label>Confirm Passord: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.confirmPassword}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>


                </form>
            </div>
        )
    }
}