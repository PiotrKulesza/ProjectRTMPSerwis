import React from 'react';
import {Col, Container, Row} from 'react-bootstrap'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import './App.css';
import 'semantic-ui-css/semantic.min.css'


import NavigationBar from "./Components/NavigationBar";
import Welcome from "./Components/Welcome.js";
import Test from "./Components/Test";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Loggout from "./Components/Loggout";
import NavigationBarUser from "./Components/NavigationBarUser";
import NavigationBarAdmin from "./Components/NavigationBarAdmin";
import Profil from "./Components/Profil";
import UsersList from "./Components/UsersList";
import EditTelephone from "./Components/EditTelephone";
import EditName from "./Components/EditName";
import EditLogin from "./Components/EditLogin";
import EditSurname from "./Components/EditSurname";
import Video from "./Components/Video";
import VideosList from "./Components/VideosList";
import UserAdmin from "./Components/UserAdmin";
import Activate from "./Components/Activate";
import LastStep from "./Components/LastStep";
import EditPass from "./Components/EditPass";
import StartStream from "./Components/StartStream";
import Banned from "./Components/Banned";
import WelcomeAdmin from "./Components/WelcomeAdmin";
import WelcomeUser from "./Components/WelcomeUser";

function App() {
  return (<div className="grid-container">
      <Router>
          <Route path={"/"} exact component={NavigationBar}/>
          <Route path={"/test"} exact component={NavigationBar}/>
          <Route path={"/login"} exact component={NavigationBar}/>
          <Route path={"/register"} exact component={NavigationBar}/>
          <Route path={"/result"} exact component={NavigationBar}/>
          <Route path={"/videoslist"} exact component={NavigationBar}/>
          <Route path={"/banned"} exact component={NavigationBar}/>
          <Route path={"/activate/:userId"} exact component={NavigationBar}/>
          <Route path={"/laststep/:userId/:email"} exact component={NavigationBar}/>


          <Route path={"/user"} exact component={NavigationBarUser}/>
          <Route path={"/user/profil"} exact component={NavigationBarUser}/>
          <Route path={"/user/videoslist"} exact component={NavigationBarUser}/>
          <Route path={"/user/editTelephone"} exact component={NavigationBarUser}/>
          <Route path={"/user/editLogin"} exact component={NavigationBarUser}/>
          <Route path={"/user/editName"} exact component={NavigationBarUser}/>
          <Route path={"/user/editSurname"} exact component={NavigationBarUser}/>
          <Route path={"/user/editPass"} exact component={NavigationBarUser}/>
          <Route path={"/user/startStream"} exact component={NavigationBarUser}/>


          <Route path={"/admin"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/profil"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/users"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/editTelephone"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/editLogin"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/editName"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/editSurname"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/editPass"} exact component={NavigationBarAdmin}/>
          <Route path={"/admin/user/:userId"} exact component={NavigationBarAdmin}/>
          <Container>
              <Row>
                  <Col lg={12} >
                      <Switch>
                          <Route path={"/"} exact component={Welcome}/>
                          <Route path={"/test"} exact component={Test}/>
                          <Route path={"/login"} exact component={Login}/>
                          <Route path={"/register"} exact component={Register}/>
                          <Route path={"/loggout"} exact component={Loggout}/>
                          <Route path={"/result"} exact component={Video}/>
                          <Route path={"/banned"} exact component={Banned}/>
                          <Route path={"/videoslist"} exact component={VideosList}/>
                          <Route path={"/activate/:userId"} exact component={Activate}/>
                          <Route path={"/laststep/:userId/:email"} exact component={LastStep}/>

                          <Route path={"/user"} exact component={WelcomeUser}/>
                          <Route path={"/admin"} exact component={WelcomeAdmin}/>
                          <Route path={"/admin/profil"} exact component={Profil}/>
                          <Route path={"/user/profil"} exact component={Profil}/>
                          <Route path={"/admin/users"} exact component={UsersList}/>
                          <Route path={"/user/users"} exact component={UsersList}/>
                          <Route path={"/admin/editTelephone"} exact component={EditTelephone}/>
                          <Route path={"/user/editTelephone"} exact component={EditTelephone}/>
                          <Route path={"/user/editName"} exact component={EditName}/>
                          <Route path={"/admin/editName"} exact component={EditName}/>
                          <Route path={"/user/editLogin"} exact component={EditLogin}/>
                          <Route path={"/admin/editLogin"} exact component={EditLogin}/>
                          <Route path={"/admin/editSurname"} exact component={EditSurname}/>
                          <Route path={"/user/editSurname"} exact component={EditSurname}/>
                          <Route path={"/user/startStream"} exact component={StartStream}/>
                          <Route path={"/admin/user/:userId"} exact component={UserAdmin}/>
                          <Route path={"/user/videoslist"} exact component={VideosList}/>
                          <Route path={"/user/editPass"} exact component={EditPass}/>
                          <Route path={"/admin/editPass"} exact component={EditPass}/>
                      </Switch>
                  </Col>
              </Row>

          </Container>


      </Router>
      </div>
  );
}

export default App;
