package com.project.videoSerwis.pojo;

import java.util.Date;

import com.project.videoSerwis.enums.State;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToMany;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPOJO {
    @Id
    private String userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private String login;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column()
    private Date dateTime;

    @Column(nullable = false)
    private String telephone;

    @ManyToMany
    private RolePOJO role;

    @Column(nullable = false)
    private String avatar;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private State state;
}
