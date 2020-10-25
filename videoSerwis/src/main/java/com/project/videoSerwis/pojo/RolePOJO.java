package com.project.videoSerwis.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Column;
import java.util.Date;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RolePOJO {
    @Id
    private String roleId;

    @Column(nullable = false)
    private String roleName;
}
