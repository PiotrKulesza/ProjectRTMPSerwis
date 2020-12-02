package com.project.videoSerwis.services;

import com.project.videoSerwis.enums.VideoState;
import com.project.videoSerwis.pojo.VideoPOJO;
import com.project.videoSerwis.repositories.UserRepository;
import com.project.videoSerwis.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.nio.charset.Charset;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VideoService implements IVideoService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    VideoRepository videoRepository;

    @Override
    public VideoPOJO postVideo(VideoPOJO videoPOJO, String userId) {

        videoPOJO.setVideoState(VideoState.STREAM);
        videoPOJO.setUserPOJO(userRepository.findById(userId).get());
        videoPOJO.setDateTime(new Date(Calendar.getInstance().getTime().getTime()));
        videoRepository.save(videoPOJO);
        return videoPOJO;
    }



    @Override
    public void putEndVideoStream(String videoId){
        if(videoRepository.findById(videoId).isPresent()){
            VideoPOJO videoPOJO = videoRepository.findById(videoId).get();
            videoPOJO.setVideoState(VideoState.STREAM_ENDED);
            videoRepository.save(videoPOJO);
        }
    }

    @Override
    public VideoPOJO getVideoByState(String videoState, String userId) {
        return videoRepository.findByVideoStateAndUserPOJO(VideoState.valueOf(videoState),
                userRepository.findById(userId).get());
    }

    @Override
    public void deleteVideo(String videoId) {
        if (videoRepository.findById(videoId).isPresent())
        videoRepository.delete(videoRepository.findById(videoId).get());
    }

    @Override
    public VideoPOJO getVideoById(String videoId) {
        if ( videoRepository.findById(videoId).isPresent()) {
            VideoPOJO videoPOJO = videoRepository.findById(videoId).get();
            videoPOJO.getUserPOJO().setPassword(null);
            videoPOJO.getUserPOJO().setEmail(null);
            videoPOJO.getUserPOJO().setTelephone(null);
            videoPOJO.getUserPOJO().setName(null);
            videoPOJO.getUserPOJO().setSurname(null);
            return videoPOJO;
        }
        else return null;
    }

    @Override
    public List<VideoPOJO> getVideosByUser(String userId) {
        return videoRepository.findAllByUserPOJO(userRepository.findById(userId).get());
    }

    @Override
    public List<VideoPOJO> getVideos() {
        return videoRepository.findAll();
    }

    @Override
    public List<VideoPOJO> getVideosByText(String text) {

        List<VideoPOJO>  videoPOJOList = videoRepository.findAll();;
        if(text.equals("@everything")) {
            return videoPOJOList.stream().filter(s->s.getVideoState().equals(VideoState.STREAM)).collect(Collectors.toList());
        }else {
            String[] strings = text.split("\\s+");
            List<VideoPOJO> videoPOJOList2 = new ArrayList<>();
            videoPOJOList.stream().forEach(s -> {
                for (String word : strings) {
                    if (s.getTitle().toLowerCase().contains(word.toLowerCase())&& s.getVideoState().equals(VideoState.STREAM)){
                        s.getUserPOJO().setPassword(null);
                        s.getUserPOJO().setEmail(null);
                        s.getUserPOJO().setTelephone(null);
                        s.getUserPOJO().setName(null);
                        s.getUserPOJO().setSurname(null);
                        videoPOJOList2.add(s);
                    }


                }
            });
            List<VideoPOJO> listWithoutDuplicates = new ArrayList<>(
                    new HashSet<>(videoPOJOList2));
            return listWithoutDuplicates;
        }


    }

    @Override
    public void putEndToAllVideoStreams(String userId) {
        List<VideoPOJO> videoPOJOS = getVideos();
        videoPOJOS.stream().filter(s -> s.getUserPOJO().getUserId().equals(userId))
                .forEach(s ->{
                    s.setVideoState(VideoState.STREAM_ENDED);
                    videoRepository.save(s);
                        }
                );
    }
}
