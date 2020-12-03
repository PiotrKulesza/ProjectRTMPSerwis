import React from "react";
import axios from 'axios';
import {Button, Card, Col, Form,ListGroup} from "react-bootstrap";
import Avatar from "react-avatar";
import {ip} from "./config/config.json"

class UsersList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            text: '',
            users: []
        };
        this.valueChange = this.valueChange.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
    }

    valueChange  (event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitSearch (event) {
        this.state.userId = localStorage.getItem('loggedUser')
        axios({
            method:'get',
            url:'http://'+ip+':8080/getUserByText?text='+this.state.text,
        }).then(response => response.data)
            .then((data) =>{
                this.setState({users: data});
            });
        this.forceUpdate();
        event.preventDefault();
    }

    itemClicked = (user) => {
        window.location = "/admin/user/"+user.userId;
    }

    componentDidMount() {
        axios.get("http://"+ip+":8080/getUsers")
            .then(response => response.data)
            .then((data) =>{
                this.setState({users: data});
            });
        this.forceUpdate();
    }

    render() {
        return (
            <Card className={"border border-light bg-light text-black"}>
                <Card.Header>
                    <Form  onSubmit={this.submitSearch} id={"searchFormId"}>
                        <Form.Row>
                            <Form.Label>Użytkownicy</Form.Label>
                            <Form.Group as={Col} controlId="formBasicPriceForFood">
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"text"}
                                    value={this.state.text}
                                    onChange={this.valueChange}
                                    placeholder="login"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                            <div >
                                <Button size="sm" variant="success" type="submit" style={{"textAlign":"center"}}>
                                    Szukaj
                                </Button>{" "}
                            </div>
                        </Form.Row>
                    </Form>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        {this.state.users.length === 0 ?
                            <ListGroup.Item>
                                Nie znaleziono użytkowników.
                            </ListGroup.Item> :
                            this.state.users.map((user) => (
                                <ListGroup.Item action onClick={() => this.itemClicked(user)}>
                                    <Avatar name={user.login} size="25" round={true} />
                                    {user.login}   Ranga:{user.role.roleName}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default UsersList;