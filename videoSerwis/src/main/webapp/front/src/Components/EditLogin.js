import React from "react";
import axios from 'axios';
import {Button, Card, Col, Form} from "react-bootstrap";
import {ip} from "./config/config.json"

class EditLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            login: '',
            userType:'',
            returnedValue:''
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
            url:'http://'+ip+':8080/putUserLogin?userId='+this.state.userId+'&login='+this.state.login,
        }).then(response => response.data)
            .then((data) =>{
                this.setState({returnedValue: data});
            });
        this.forceUpdate();

        if(this.state.returnedValue===1){
            alert("Taki użytkonwik już istnieje.")
        }else if(this.state.returnedValue===''){
            alert("Ups doś poszło nie tak spróbuj ponownie zmienić login.")
        }else window.location = "/"+this.state.userType+"/profil";
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

                <Form  onSubmit={this.submitSearch} id={"searchFormId"}>
                    <Card.Body>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formBasicPriceForFood">
                                <Form.Label>Nowy login użytkonwika</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"login"}
                                    value={this.state.login}
                                    onChange={this.valueChange}
                                    placeholder="login"
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



export default EditLogin;