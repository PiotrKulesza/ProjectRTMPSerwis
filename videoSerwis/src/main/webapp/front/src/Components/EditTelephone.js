import React from "react";
import { withRouter } from "react-router";
import axios from 'axios';
import {Button, Card, Col, Form,ListGroup} from "react-bootstrap";
import Avatar from "react-avatar";

class EditTelephone extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            telephone: '',
            userType:''
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


        const params = new URLSearchParams();
        params.append('Id',this.state.userId+'');

        axios({
            method:'put',
            url:'http://localhost:8080/putUserTelephone?userId='+this.state.userId+'&telephone='+this.state.telephone,
        });
        window.location = "/"+this.state.userType+"/profil";
        this.forceUpdate();
        event.preventDefault();
    }

    componentDidMount() {
        this.state.userId = localStorage.getItem('loggedUser')
        if ('USER' === localStorage.getItem('typeOfUser') && 'MODERATOR' === localStorage.getItem('typeOfUser')) {
            this.state.userType="user"
        }else{
            this.state.userType="admin"
        }
    }

    render() {
        return (
            <Card className={"border border-light bg-light text-black"}>

                    <Form  onSubmit={this.submitSearch} id={"searchFormId"}>
                        <Card.Body>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formBasicPriceForFood">
                                    <Form.Label>Nowy numer użytkonwika</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        autoComplete={"off"}
                                        name={"telephone"}
                                        value={this.state.telephone}
                                        onChange={this.valueChange}
                                        placeholder="telephone"
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



export default EditTelephone;