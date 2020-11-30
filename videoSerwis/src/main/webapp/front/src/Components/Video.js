import React from "react";
import {Button, Card, Col, Form, Alert,Navbar} from "react-bootstrap";
import axios from "axios";
import ReactPlayer from "react-player";
import Avatar from "react-avatar";
import {ip} from "./config/config.json"

class Video extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videoId:'',
            video:{},
            isLoading:false
        }


    }


     componentDidMount() {
        this.state.videoId=localStorage.getItem('chosenVideo')

        axios({
            method:'get',
            url:'http://'+ip+':8080/getVideoById?videoId='+this.state.videoId
        }).then(response => response.data)
            .then((data) =>{


                    this.setState({video: data});
                    this.setState({ isLoading: true });
                    console.log('This is your data', this.state.video);
                }
            );

    }

    render() {
        const {isLoading } = this.state;

        if (isLoading) {
            return(
                <Card className="border border-light bg-light text-black">
                    <Card.Header>
                        <Avatar name={this.state.video.userPOJO.login} size="50" round={true}></Avatar>
                        <b className={"login"}>{this.state.video.userPOJO.login}</b>
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

                    </Card.Footer>

                </Card>
            );
        }else {
            return <p>Loading ...</p>;
        }


    }

}



export default Video;