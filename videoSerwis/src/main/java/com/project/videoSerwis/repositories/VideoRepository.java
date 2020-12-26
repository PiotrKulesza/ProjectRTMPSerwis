package com.project.videoSerwis.repositories;

import com.project.videoSerwis.pojo.VideoPOJO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends MongoRepository<VideoPOJO,String> {

}
