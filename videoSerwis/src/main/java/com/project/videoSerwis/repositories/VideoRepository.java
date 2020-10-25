package com.project.videoSerwis.repositories;

import com.project.videoSerwis.pojo.UserPOJO;
import com.project.videoSerwis.pojo.VideoPOJO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface VideoRepository extends MongoRepository<VideoPOJO,String> {

    Optional<VideoPOJO> findAllByUserPOJO(UserPOJO userPOJO);

}
