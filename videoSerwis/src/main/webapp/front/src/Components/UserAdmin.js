import React from "react";
import {Form, Card, Col, Button} from "react-bootstrap";
import {ip} from "./config/config.json"
import axios from "axios";
import Avatar from "react-avatar";
import "./css/Login.css";

class UserAdmin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded:false,
            userId: '',
            roleName:"USER",
            state:"ACTIVATED",
            user: [],

        };
        this.onChangeRoleName = this.onChangeRoleName.bind(this)
        this.submitRoleName = this.submitRoleName.bind(this)
        this.onChangeState = this.onChangeState.bind(this)
        this.submitState = this.submitState.bind(this)
    }

    submitState (event) {
        axios({
            method:'put',
            url:'http://'+ip+':8080/putState?state='
                +this.state.state
                +'&userId='
                +this.state.user.userId
        });
        event.preventDefault();
    }

    submitRoleName (event) {
        axios({
            method:'put',
            url:'http://'+ip+':8080/putUserRole?roleName='
                +this.state.roleName
                +'&userId='
                +this.state.user.userId
        });
        event.preventDefault();
    }

    onChangeRoleName(event) {
        this.setState({ roleName: event.target.value })
    }

    onChangeState(event) {
        this.setState({ state: event.target.value })
    }

    componentDidMount() {
        axios({
            method:'get',
            url:'http://'+ip+':8080/getUsersById?userId='+this.props.match.params.userId,
        }).then(response => response.data)
            .then((data) =>{
                this.setState({user: data});
                this.setState({isLoaded: true});
            });
    }

    render() {
        if(this.state.isLoaded===true)
            return (
                <Card className={"border border-light bg-light text-black"}>
                   <Card.Header>
                       <Avatar name={this.state.user.login} size="50" round={true}></Avatar>
                       <b className={"login"}>{this.state.user.login}</b>
                   </Card.Header>
                    <Card.Body>
                        {'HEAD_ADMIN' === localStorage.getItem('typeOfUser')?
                        <div>
                            {this.state.user.role.roleName==='HEAD_ADMIN' ?
                                <div>
                                    <b>Nie można nic zrobić. Wszelkie zmiany muszą zostać wykoane
                                        z posiomu serwara bazy danych.</b>
                                </div>
                            :
                                <div>
                                    <Form onSubmit={this.submitRoleName}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Zmień dostęp</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    required
                                                    autoComplete={"off"}
                                                    name={"roleName"}
                                                    value={this.state.roleName}
                                                    onChange={this.onChangeRoleName}
                                                    className={"bg-light text-black"}
                                                >
                                                    <option value = {"USER"}>USER</option>
                                                    <option value = {"MODERATOR"}>MODERATOR</option>
                                                    <option value = {"ADMIN"}>ADMIN</option>
                                                </Form.Control>
                                                <Button size={"sm"} variant="success" type="submit" style={{"textAlign":"center", "align":"right"}}>
                                                    Zmień
                                                </Button>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                    <p></p>
                                    <Form onSubmit={this.submitState}>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Zmień stan</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    required
                                                    autoComplete={"off"}
                                                    name={"state"}
                                                    value={this.state.state}
                                                    onChange={this.onChangeState}
                                                    className={"bg-light text-black"}
                                                >
                                                    <option value = {"BANNED"}>BANNED</option>
                                                    <option value = {"ACTIVATED"}>ACTIVATED</option>
                                                    <option value = {"INACTIVATED"}>INACTIVATED</option>
                                                </Form.Control>
                                                <Button size={"sm"} variant="success" type="submit" style={{"textAlign":"center", "align":"right"}}>
                                                    Zmień
                                                </Button>
                                            </Form.Group>

                                        </Form.Row>
                                    </Form>
                                </div>
                            }
                        </div>
                            :
                            <div>
                                {(this.state.user.role.roleName==='HEAD_ADMIN' || this.state.user.role.roleName==='ADMIN') ?
                                    <div>
                                        <b>Nie można nic zrobić. Wszelkie zmiany muszą zostać wykoane
                                            z posiomu serwara bazy danych.</b>
                                    </div>
                                    :
                                    <div>
                                        <Form onSubmit={this.submitRoleName}>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Zmień dostęp</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        required
                                                        autoComplete={"off"}
                                                        name={"roleName"}
                                                        value={this.state.roleName}
                                                        onChange={this.onChangeRoleName}
                                                        className={"bg-light text-black"}
                                                    >
                                                        <option value = {"USER"}>USER</option>
                                                        <option value = {"MODERATOR"}>MODERATOR</option>
                                                    </Form.Control>
                                                    <Button size={"sm"} variant="success" type="submit" style={{"textAlign":"center", "align":"right"}}>
                                                        Zmień
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                        <p></p>
                                        <p></p>
                                        <p></p>
                                        <p></p>
                                        <Form onSubmit={this.submitState}>
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Zmień stan</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        required
                                                        autoComplete={"off"}
                                                        name={"state"}
                                                        value={this.state.state}
                                                        onChange={this.onChangeState}
                                                        className={"bg-light text-black"}
                                                    >
                                                        <option value = {"BANNED"}>BANNED</option>
                                                        <option value = {"ACTIVATED"}>ACTIVATED</option>
                                                        <option value = {"INACTIVATED"}>INACTIVATED</option>
                                                    </Form.Control>
                                                    <Button size={"sm"} variant="success"
                                                            type="submit"
                                                            style={{"textAlign":"center", "align":"right"}}>
                                                        Zmień
                                                    </Button>
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>
                                    </div>
                                }
                            </div>
                        }
                    </Card.Body>
                </Card>
            );else return(<h1>Loading!</h1>)
    }
}

export default UserAdmin;