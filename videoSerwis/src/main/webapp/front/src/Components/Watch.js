import React from "react";
import {ip} from "./config/config.json"
import {Card} from "react-bootstrap";
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

                <ReactPlayer url={"http://'+ip+':8081/hls/stream2.m3u8"}/>
            </Card>
        );
    }

}



export default Watch;