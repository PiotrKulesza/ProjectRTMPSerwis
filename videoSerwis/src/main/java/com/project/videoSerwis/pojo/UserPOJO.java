package com.project.videoSerwis.pojo;

import java.util.Date;

import com.project.videoSerwis.enums.State;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPOJO {
    @Id
    private String userId;


    private String name;


    private String surname;


    private String login;


    private String email;


    private String password;


    private Date dateTime;


    private String telephone;


    private RolePOJO role;


    private String avatar;


    private State state;
}
