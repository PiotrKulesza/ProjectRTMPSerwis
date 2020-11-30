import React from "react";
import {Button, Form, Card, Col} from "react-bootstrap";
import axios from 'axios';
import "./css/Login.css"
import {ip} from "./config/config.json"


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            user:{},
            textError:""
        }

        this.valueChange = this.valueChange.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }

    submitLogin(event){
        axios({
            method:'get',
            url:'http://'+ip+':8080/getUserByEmailAndPass?email='+this.state.email+'&password='+this.state.password
        }).then(response => response.data)
            .then((data)=>{
                this.setState({user:data});
                if ('null' !== this.state.user.userId && typeof this.state.user.userId !== "undefined" && this.state.user.role !== null) {
                    localStorage.setItem('loggedUser', this.state.user.userId);
                    localStorage.setItem('typeOfUser', this.state.user.role.roleName);
                    window.location = "/test";
                }
                else {
                    this.state.textError="Podano niewałaściwy email albo hasło.";
                    this.forceUpdate();
                }
            });
        event.preventDefault();
    }

    valueChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
        return(
            <Card className="border border-light bg-light text-black">
                <Card.Header>Zaloguj się</Card.Header>
                <Form onSubmit={this.submitLogin} id={"loginFormId"}>
                    <Card.Body>

                        <Form.Group  controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                name={"email"}
                                value={this.state.email}
                                onChange={this.valueChange}
                                placeholder="name@example.com"
                                className={"bg-light text-black"}

                            />
                            <Form.Text id = {"emailTextError"}>
                                <p>{this.state.textError}</p>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group  controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name={"password"}
                                value={this.state.password}
                                onChange={this.valueChange}
                                placeholder="Password"
                                className={"bg-light text-black"}
                            />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            Zaloguj
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>

        );
    }

}

export default Login;