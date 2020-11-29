import React from "react";
import {Button, Card, Col, Form, Alert} from "react-bootstrap";
import axios from "axios";
import "./css/Video.css"
import Avatar from "react-avatar";
import ReactPlayer from "react-player";

class StartStream extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description:'',
            tag:'',
            title:'',
            userId: '',
            isStarted:false,
            videoId:'',
            video:{}
        }
        this.valueChange = this.valueChange.bind(this)
        this.submitChange = this.submitChange.bind(this)


    }

    valueChange  (event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    componentDidMount() {
        this.state.userId = localStorage.getItem('loggedUser')

    }


    submitChange (event) {


            axios({
                method:'put',
                url:'http://localhost:8080/postVideo?tag='
                    +this.state.tag
                    +'&title='
                    +this.state.title
                    +'&description='
                    +this.state.description
                    +'&userId='
                    +this.state.userId,
            }).then(response => response.data)
                .then((data) =>{
                    this.setState({video: data});
                    if(typeof this.state.video.videoState === "STREAM"){
                        this.state.isStarted=true
                        this.forceUpdate()
                    }


                });


        event.preventDefault();
    }


    render() {

        if(this.state.isStarted===false)
        return(
            <Card className="border border-light bg-light text-black">
                <Form  onSubmit={this.submitSearch}>
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Tytuł strumienia</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"title"}
                                    value={this.state.title}
                                    onChange={this.valueChange}
                                    placeholder="title"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Opis strumienia</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    required
                                    type="text"
                                    autoComplete={"off"}
                                    name={"description"}
                                    value={this.state.description}
                                    onChange={this.valueChange}
                                    placeholder="description"
                                    className={"bg-light text-black"}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Opis strumienia</Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    autoComplete={"off"}
                                    name={"tag"}
                                    value={this.state.tag}
                                    onChange={this.valueChange}
                                    className={"bg-light text-black"}
                                >
                                    <option>PEGI8</option>
                                    <option>PEGI10</option>
                                    <option>PEGI12</option>
                                    <option>PEGI16</option>
                                    <option>PEGI18</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Card.Body>
                    <Card.Footer>
                        <div >
                            <Button size="sm" variant="success" type="submit" style={{"textAlign":"center"}}>
                                Rozpocznij
                            </Button>{" "}
                        </div>
                    </Card.Footer>

                </Form>
            </Card>
        )
        else return (
            <Card>
                <Card.Header>
                    <Avatar name={this.state.video.userPOJO.login} size="50" round={true}></Avatar>
                    <b className={"login"}>{this.state.video.userPOJO.login}</b>
                    <p></p>
                    <p><b className={"title"}>{this.state.video.title}</b></p>


                </Card.Header>
                <Card.Body>

                        {this.state.video.videoState==="STREAM" ?
                            <ReactPlayer
                            url={'videos/Pexels_Videos_2881.mp4'}
                            className='react-player'
                            playing
                            width='100%'
                            height='100%'
                            controls = {true}/>:
                            <ReactPlayer
                                url={'videos/Pexels_Videos_2881.mp4'}
                                className='react-player'
                                playing
                                width='100%'
                                height='100%'
                                controls = {true}/>
                        }


                </Card.Body>
                <Card.Footer>



                    <p><b className={"description"}>{this.state.video.description} </b></p>

                </Card.Footer>
            </Card>
        )


    }

}



export default StartStream;