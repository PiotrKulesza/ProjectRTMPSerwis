package com.project.videoSerwis.pojo;

import com.project.videoSerwis.enums.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import javax.persistence.OneToOne;
import java.util.Date;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoPOJO {
    @Id
    private String videoId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String path;

    @Column(nullable = false)
    private Tag[] tags;

    @OneToOne
    @Column(nullable = false)
    private UserPOJO userPOJO;

    @Column(nullable = false)
    private Date dateTime;

    @Column(nullable = false)
    private String description;
}