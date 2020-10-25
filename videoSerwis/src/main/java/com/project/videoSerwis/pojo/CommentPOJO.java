package com.project.videoSerwis.pojo;

import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.OneToOne;

public class CommentPOJO {

    @Id
    private String commentId;

    @OneToOne
    @Column(nullable = false)
    private UserPOJO userPOJO;

    @OneToOne
    @Column(nullable = false)
    private VideoPOJO videoPOJO;

    @Column(nullable = false)
    private String text;

}
