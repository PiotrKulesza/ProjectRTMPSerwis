package com.project.videoSerwis.services;

import com.project.videoSerwis.enums.VideoState;
import com.project.videoSerwis.pojo.VideoPOJO;
import com.project.videoSerwis.repositories.UserRepository;
import com.project.videoSerwis.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.InetAddress;
import java.util.*;

@Service
public class VideoService implements IVideoService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    VideoRepository videoRepository;

    @Override
    public VideoPOJO postVideo(VideoPOJO videoPOJO, String userId) {

        InetAddress ip;
        videoPOJO.setVideoState(VideoState.STREAM);
        videoPOJO.setUserPOJO(userRepository.findById(userId).get());
        videoPOJO.setDateTime(new Date(Calendar.getInstance().getTime().getTime()));

        videoRepository.save(videoPOJO);
        try {
            ip = InetAddress.getLocalHost();
            Process p = Runtime.getRuntime().exec(
                    "ffmpeg -i \"http://localhost:8089/hls/"
                            +videoPOJO.getUserPOJO().getLogin()
                            +".m3u8\" -c copy -y /home/"
                            +System.getProperty("user.name")
                            +"/videos/"
                            +videoPOJO.getVideoId()
                            +".mp4 &");

        } catch (IOException e) {
            e.printStackTrace();
        }

        return videoPOJO;
    }



    @Override
    public void putEndVideoStream(String videoId){
        VideoPOJO videoPOJO = videoRepository.findById(videoId).get();
        videoPOJO.setVideoState(VideoState.FILE);
        videoRepository.save(videoPOJO);
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
        if ( videoRepository.findById(videoId).isPresent())
            return videoRepository.findById(videoId).get();
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
            return videoPOJOList;
        }else {
            String[] strings = text.split("\\s+");
            List<VideoPOJO> videoPOJOList2 = new ArrayList<>();
            videoPOJOList.stream().forEach(s -> {
                for (String word : strings) {
                    if (s.getTitle().toLowerCase().contains(word.toLowerCase()))
                        videoPOJOList2.add(s);

                }
            });
            List<VideoPOJO> listWithoutDuplicates = new ArrayList<>(
                    new HashSet<>(videoPOJOList2));
            return listWithoutDuplicates;
        }


    }
}
