package com.project.videoSerwis.repositories;

import com.project.videoSerwis.pojo.UserPOJO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<UserPOJO, String>{

    Optional<UserPOJO> findByLogin(String login);

    Optional<UserPOJO> findByEmail(String email);

    Optional<UserPOJO> findByEmailAndPassword(String email,String password);

}
