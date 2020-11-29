package com.project.videoSerwis.controller;

import com.project.videoSerwis.email.EmailSenderImpl;
import com.project.videoSerwis.pojo.EmailPropertiesPOJO;
import com.project.videoSerwis.pojo.RolePOJO;
import com.project.videoSerwis.pojo.UserPOJO;
import com.project.videoSerwis.pojo.VideoPOJO;
import com.project.videoSerwis.services.IRoleService;
import com.project.videoSerwis.services.IUserService;
import com.project.videoSerwis.services.IVideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class VideoServiceController {

    @Autowired
    private IUserService iUserService;

    @Autowired
    private IRoleService iRoleService;

    @Autowired
    private IVideoService iVideoService;



    @Value("${spring.mail.host}")
    public String emailHost;
    @Value("${spring.mail.port}")
    public String emailPort;
    @Value("${spring.mail.username}")
    public String emailUsername;
    @Value("${spring.mail.password}")
    public String emailPassword;
    @Value("${PUBLIC_ComponentWebAppPort}")
    public String webappSeverIp;




    @RequestMapping(value =  "/sendEmail",  method = RequestMethod.POST)
    //
    public String send(@RequestParam("userId") String userId, @RequestParam("email") String email) {


        EmailPropertiesPOJO emailPropertiesPOJO = new EmailPropertiesPOJO();
        emailPropertiesPOJO.setEmailHost(emailHost);
        emailPropertiesPOJO.setEmailPassword(emailPassword);
        emailPropertiesPOJO.setEmailPort(emailPort);
        emailPropertiesPOJO.setEmailUsername(emailUsername);


        EmailSenderImpl emailSender = new EmailSenderImpl();
        Context context = new Context();
        context.setVariable("header", "Nowy artykuł na CodeCouple");
        context.setVariable("title", "#8 Spring Boot – email - szablon i wysyłanie");
        context.setVariable("description", "Tutaj jakis opis...");
        String body = "<!doctype html>\n" +
                "<html>\n" +
                "<head>\n" +
                "  <meta charset=\"utf-8\">\n" +
                "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
                "</head>\n" +
                "<body>\n" +
                "  \n" +
                "  <h1>Aktywacja konta</h1>\n" +
                "  <p>Oto link do aktywacji twojego konta:</p>\n" +
                "  <a href=http://"+webappSeverIp+"/activate/"+userId+">Aktywuj</a>\n" +
                "</body>\n" +
                "</html>";
        emailSender.sendEmail(emailPropertiesPOJO,email, "RTMPStreamer Aktywacja", body);
        return "index";
    }



    @RequestMapping(value = "/postUser", method = RequestMethod.POST)
    @ResponseBody
    public String postUser(@ModelAttribute UserPOJO userPOJO) {


        return iUserService.postUser(userPOJO);

    }

    @RequestMapping(value = "/getUsers", method = RequestMethod.GET)
    @ResponseBody
    public List<UserPOJO> getUsers() {


        return iUserService.getUserPojo();

    }

    @RequestMapping(value = "/getUsersById", method = RequestMethod.GET)
    @ResponseBody
    public UserPOJO getUsersById(@RequestParam("userId") String userId) {


        return iUserService.getUserById(userId);
    }

    @RequestMapping(value = "/getUserByText", method = RequestMethod.GET)
    @ResponseBody
    public List<UserPOJO> getUserByText(@RequestParam("text") String text) {


        return iUserService.getUserByText(text);
    }

    @RequestMapping(value = "/getUserByEmailAndPass", method = RequestMethod.GET)
    @ResponseBody
    public UserPOJO getUserByEmailAndPass(@RequestParam("email") String email,
                                      @RequestParam("password") String password) {



        return iUserService.getUserByEmailAndPassword(email,password);

    }

    @RequestMapping(value = "/putPassword", method = RequestMethod.PUT)
    @ResponseBody
    public String putPassword(@RequestParam("userId") String userId,@RequestParam("newPass") String newPass,
                            @RequestParam("oldPass") String oldPass) {

        return iUserService.putPassword(userId,newPass,oldPass);

    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.DELETE)
    @ResponseBody
    public Boolean deleteUser(@RequestParam("userId") String userId) {

        return iUserService.deleteUser(userId);

    }

    @RequestMapping(value = "/postRole", method = RequestMethod.POST)
    @ResponseBody
    public void postRole(@ModelAttribute RolePOJO role) {



        iRoleService.postRole(role);

    }


    @RequestMapping(value = "/getRoles", method = RequestMethod.GET)
    @ResponseBody
    public List<RolePOJO> getRoles() {



        return iRoleService.getRoles();

    }
    @RequestMapping(value = "/deleteRole", method = RequestMethod.DELETE)
    @ResponseBody
    public Boolean deleteRole(@RequestParam("roleId") String roleId) {



        return iRoleService.deleteRole(roleId);

    }

    @RequestMapping(value = "/putUserRole", method = RequestMethod.PUT)
    @ResponseBody
    public void putUserRole(@RequestParam("userId") String userId, @RequestParam("roleName") String roleName) {

        iUserService.putUserRole(userId, roleName);


    }

    @RequestMapping(value = "/putActivate", method = RequestMethod.PUT)
    @ResponseBody
    public void putActivate(@RequestParam("userId") String userId) {

        iUserService.putActivate(userId);


    }

    @RequestMapping(value = "/putUserLogin", method = RequestMethod.PUT)
    @ResponseBody
    public String putUserLogin(@RequestParam("userId") String userId, @RequestParam("login") String login) {

        return iUserService.putUserLogin(userId,login);


    }

    @RequestMapping(value = "/putUserAvatar", method = RequestMethod.PUT)
    @ResponseBody
    public void putUserAvatar(@RequestParam("userId") String userId, @RequestParam("avatar") String avatar) {

        iUserService.putUserAvatar(userId,avatar);


    }

    @RequestMapping(value = "/putUserTelephone", method = RequestMethod.PUT)
    @ResponseBody
    public void putUserTelephone(@RequestParam("userId") String userId, @RequestParam("telephone") String telephone) {

        iUserService.putUserTelephone(userId,telephone);


    }

    @RequestMapping(value = "/putUserName", method = RequestMethod.PUT)
    @ResponseBody
    public void putUserName(@RequestParam("userId") String userId, @RequestParam("name") String name) {

        iUserService.putUserName(userId,name);


    }

    @RequestMapping(value = "/putUserSurname", method = RequestMethod.PUT)
    @ResponseBody
    public void putUserSurname(@RequestParam("userId") String userId, @RequestParam("surname") String surname) {

        iUserService.putUserSurname(userId,surname);


    }

    @RequestMapping(value = "/postVideo", method = RequestMethod.POST)
    @ResponseBody
    public VideoPOJO postVideo(@ModelAttribute VideoPOJO videoPOJO, @RequestParam("userId") String userId) {

        System.out.println(userId);
        return iVideoService.postVideo(videoPOJO, userId);

    }

    @RequestMapping(value = "/deleteVideo", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteVideo(@RequestParam("videoId") String videoId) {

        iVideoService.deleteVideo(videoId);
    }

    @RequestMapping(value = "/getVideosByUser", method = RequestMethod.GET)
    @ResponseBody
    public List<VideoPOJO> getVideosByUser(@RequestParam("userId") String userId) {



        return iVideoService.getVideosByUser(userId);

    }

    @RequestMapping(value = "/getVideos", method = RequestMethod.GET)
    @ResponseBody
    public List<VideoPOJO> getVideos() {



        return iVideoService.getVideos();

    }

    @RequestMapping(value = "/getVideoById", method = RequestMethod.GET)
    @ResponseBody
    public VideoPOJO getVideoById(@RequestParam("videoId") String videoId) {



        return iVideoService.getVideoById(videoId);

    }

    @RequestMapping(value = "/getVideosByText", method = RequestMethod.GET)
    @ResponseBody
    public List<VideoPOJO> getVideosByText(@RequestParam("text") String text) {


        return iVideoService.getVideosByText(text);
    }


    @RequestMapping(value = "/putEndVideoStream", method = RequestMethod.PUT)
    @ResponseBody
    public void putEndVideoStream(@RequestParam("videoId") String videoId) {

        iVideoService.putEndVideoStream(videoId);


    }

}
