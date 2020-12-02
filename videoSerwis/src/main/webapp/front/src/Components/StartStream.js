import React from "react";
import {Button, Card, Col, Form} from "react-bootstrap";
import axios from "axios";
import "./css/Video.css"
import ReactPlayer from "react-player";
import {ip} from "./config/config.json"

class StartStream extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description:'',
            tag:"PEGI8",
            title:'',
            userId: '',
            isStarted:false,
            videoId:'',
            video:{},
            user:{}
        }
        this.valueChange = this.valueChange.bind(this)
        this.submitStart = this.submitStart.bind(this)
        this.submitStop = this.submitStop.bind(this)
        this.onChangeTag = this.onChangeTag.bind(this)

    }

    valueChange  (event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }



    componentDidMount() {
        this.state.userId = localStorage.getItem('loggedUser')
        axios({
            method:'put',
            url:'http://'+ip+':8080/putEndToAllVideoStreams?userId='
                +this.state.userId
        })
        this.forceUpdate()
    }

    onChangeTag(event) {
        this.setState({ tag: event.target.value })

    }

    submitStop (event) {
        axios({
            method:'put',
            url:'http://'+ip+':8080/putEndVideoStream?videoId='
                +this.state.video.videoId
        }).then(response => response.data)
            .then((data) =>{
                    this.state.isStarted=false
                    this.forceUpdate()


            });
        event.preventDefault();
    }

    componentWillUnmount() {
        if(this.state.isStarted==true)axios({
            method:'put',
            url:'http://'+ip+':8080/putEndVideoStream?videoId='
                +this.state.video.videoId
        }).then(response => response.data)
            .then((data) =>{
                this.state.isStarted=false
                this.forceUpdate()
            });
    }


    submitStart (event) {

            axios({
                method:'post',
                url:'http://'+ip+':8080/postVideo?tag='
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
                        this.state.isStarted=true
                        this.forceUpdate()

                });


        event.preventDefault();
    }


    render() {

        if(this.state.isStarted===false)
        return(
            <Card className="border border-light bg-light text-black">
                <Form  onSubmit={this.submitStart}  id={"startStreamFormId"}>
                    <Card.Header>
                        <h3>Wzór do rozpoczęcia strumienia</h3>
                        <p>Serwer: rtmp://{ip}:1935/show/</p>
                        <p>Klucz strumienia: twój login</p>
                    </Card.Header>
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
                                <Form.Label>Od ilu lat</Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    autoComplete={"off"}
                                    name={"tag"}
                                    value={this.state.tag}
                                    onChange={this.onChangeTag}
                                    className={"bg-light text-black"}
                                >
                                    <option value = {"PEGI8"}>PEGI8</option>
                                    <option value = {"PEGI10"}>PEGI10</option>
                                    <option value = {"PEGI12"}>PEGI12</option>
                                    <option value = {"PEGI16"}>PEGI16</option>
                                    <option value = {"PEGI18"}>PEGI18</option>
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
                    <p></p>
                    <p><b className={"title"}>{this.state.video.title}</b></p>


                </Card.Header>
                <Card.Body>

                            <ReactPlayer
                            url={"http://"+ip+":8089/hls/"
                            +this.state.video.userPOJO.login
                            +".m3u8"}
                            className='react-player'
                            playing
                            width='100%'
                            height='100%'
                            controls = {true}/>



                </Card.Body>
                <Card.Footer>
                    <p><b className={"description"}>{this.state.video.description} </b></p>
                    <Form  onSubmit={this.submitStop} id={"stopStreamFormId"}>
                        <div >
                            <Button size="sm" variant="success" type="submit" style={{"textAlign":"center"}}>
                                Zakończ
                            </Button>{" "}
                        </div>
                    </Form>

                </Card.Footer>
            </Card>
        )


    }

}



export default StartStream;