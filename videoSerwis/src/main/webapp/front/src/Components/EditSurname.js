import React from "react";
import axios from 'axios';
import {Button, Card, Col, Form,ListGroup} from "react-bootstrap";
import {ip} from "./config/config.json"

class EditSurname extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            surname: '',
            userType:''
        };
        this.valueChange = this.valueChange.bind(this)
        this.submitChange = this.submitChange.bind(this)
    }

    valueChange  (event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    submitChange (event) {
        const params = new URLSearchParams();
        params.append('Id',this.state.userId+'');
        axios({
            method:'put',
            url:'http://'+ip+':8080/putUserSurname?userId='+this.state.userId+'&surname='+this.state.surname,
        });
        window.location = "/"+this.state.userType+"/profil";
        this.forceUpdate();
        event.preventDefault();
    }

    componentDidMount() {
        this.state.userId = localStorage.getItem('loggedUser')
        if ('USER' === localStorage.getItem('typeOfUser') || 'MODERATOR' === localStorage.getItem('typeOfUser')) {
            this.state.userType="user"
        }else{
            this.state.userType="admin"
        }
    }

    render() {
        return (
            <Card className={"border border-light bg-light text-black"}>
                <Form  onSubmit={this.submitChange}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label>Nowe nazwisko użytkonwika</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"surname"}
                                    value={this.state.surname}
                                    onChange={this.valueChange}
                                    placeholder="surname"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer>
                        <div >
                            <Button size="sm" variant="success" type="submit" style={{"textAlign":"center"}}>
                                Zmień
                            </Button>{" "}
                        </div>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}



export default EditSurname;