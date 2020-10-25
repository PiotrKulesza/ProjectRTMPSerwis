package com.project.videoSerwis.repositories;

import com.project.videoSerwis.pojo.UserPOJO;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<UserPOJO, String>{


}
