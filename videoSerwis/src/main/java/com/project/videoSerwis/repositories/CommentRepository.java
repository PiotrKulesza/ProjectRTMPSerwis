package com.project.videoSerwis.repositories;

import com.project.videoSerwis.pojo.CommentPOJO;
import com.project.videoSerwis.pojo.VideoPOJO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CommentRepository extends MongoRepository<CommentPOJO,String> {

    Optional<CommentPOJO> findCommentPOJOByVideoPOJO(VideoPOJO videoPOJO);

}
