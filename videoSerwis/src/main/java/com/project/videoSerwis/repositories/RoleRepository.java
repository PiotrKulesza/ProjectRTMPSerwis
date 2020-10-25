package com.project.videoSerwis.repositories;

import com.project.videoSerwis.pojo.RolePOJO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<RolePOJO, String> {

    Optional<RolePOJO> findByRoleName(String roleName);

}