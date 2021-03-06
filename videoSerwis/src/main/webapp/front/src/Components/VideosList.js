import React from "react";
import axios from 'axios';
import {Button, Card, Col, Form,ListGroup} from "react-bootstrap";
import {ip} from "./config/config.json"
import Avatar from "react-avatar";

class VideosList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            videos: []
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
        axios({
            method:'get',
            url:'http://'+ip+':8080/getVideosByText?text='+this.state.text,
        }).then(response => response.data)
            .then((data) =>{
                this.setState({videos: data});
            });
        this.forceUpdate();
        event.preventDefault();
    }

    itemClicked = (video) => {
        localStorage.setItem('chosenVideo', video.videoId)
        if ('USER' === localStorage.getItem('typeOfUser') || 'MODERATOR' === localStorage.getItem('typeOfUser')) {
            window.location = "/user/result";
        }else  window.location = "/result";
    }

    componentDidMount() {
        axios.get("http://"+ip+":8080/getVideosByText?text=@everything")
            .then(response => response.data)
            .then((data) =>{
                this.setState({videos: data});
            });
        this.forceUpdate();
    }

    render() {
        return (
            <Card className={"border border-light bg-light text-black"}>
                <Card.Header>
                    <Form  onSubmit={this.submitSearch} >
                        <Form.Row>
                            <Form.Label>Filmy</Form.Label>
                            <Form.Group as={Col} >
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"text"}
                                    value={this.state.text}
                                    onChange={this.valueChange}
                                    placeholder="Szukaj"
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
                        {this.state.videos.length === 0 ?
                            <ListGroup.Item>
                                Nie znaleziono żadnych trwajacych strumieni.
                            </ListGroup.Item> :
                            this.state.videos.map((video) => (
                                <ListGroup.Item action onClick={() => this.itemClicked(video)}>
                                    <div>
                                        <p><Avatar name={video.userPOJO.login} size="25" round={true}/>
                                            <b>{video.title}</b></p>
                                    </div>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default VideosList;