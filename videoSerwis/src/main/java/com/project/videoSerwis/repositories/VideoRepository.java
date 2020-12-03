package com.project.videoSerwis.repositories;

import com.project.videoSerwis.enums.VideoState;
import com.project.videoSerwis.pojo.UserPOJO;
import com.project.videoSerwis.pojo.VideoPOJO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface VideoRepository extends MongoRepository<VideoPOJO,String> {

    List<VideoPOJO> findAllByUserPOJO(UserPOJO userPOJO);

    VideoPOJO findByVideoStateAndUserPOJO(VideoState videoState, UserPOJO userPOJO);

}
