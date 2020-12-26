package com.project.videoSerwis.pojo;

import com.project.videoSerwis.enums.Tag;
import com.project.videoSerwis.enums.VideoState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoPOJO {
    @Id
    private String videoId;


    private String title;


    private String path;


    private Tag tag;


    private VideoState videoState;


    private UserPOJO userPOJO;


    private Date dateTime;


    private String description;
}
