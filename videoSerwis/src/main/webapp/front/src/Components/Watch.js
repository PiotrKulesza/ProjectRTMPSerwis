import React from "react";
import { withRouter } from "react-router";
import axios from 'axios';
import {Button, Card, Col, Form,ListGroup} from "react-bootstrap";
import Avatar from "react-avatar";
import ReactPlayer from "react-player";

class Watch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            login: '',
            userType:'',
            returnedValue:''
        };

    }


    render() {
        return (
            <Card className={"border border-light bg-light text-black"}>

                <ReactPlayer url={"http://localhost:8081/hls/stream2.m3u8"}/>
            </Card>
        );
    }

}



export default Watch;