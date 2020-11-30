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

        /*try {


            /*Process processDuration = new ProcessBuilder("ffmpeg",
                    "-i",
                    streamPath,
                    "-c",
                    "copy",
                    "-y",
                    path).redirectErrorStream(true).start();

            StringBuilder strBuild = new StringBuilder();
            try (BufferedReader processOutputReader = new BufferedReader(new InputStreamReader(processDuration.getInputStream(), Charset.defaultCharset()));) {
                String line;
                while ((line = processOutputReader.readLine()) != null) {
                    strBuild.append(line + System.lineSeparator());
                }
                processDuration.waitFor();
            }
            String outputJson = strBuild.toString().trim();
            System.out.println(outputJson);*/




            /*System.out.println("test");
            ip = InetAddress.getLocalHost();
            //"sudo ffmpeg -i \"http://localhost:8089/hls/UserNum1.m3u8\" -c copy -y /home/webapp/videos/5fc3dc2a98ca7525dfd6cd9d.mp4"
            Process p = Runtime.getRuntime().exec(
                    "sudo ffmpeg -i \"http://localhost:8089/hls/UserNum1.m3u8\" -t 1 -c copy -y /home/webapp/videos/5fc3dc2a98ca7525dfd6cd9d.mp4");
            BufferedReader stdInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String s;
            while ((s = stdInput.readLine()) != null) {
                System.out.println(s);
            }

        } catch (IOException ) {
            e.printStackTrace();
        }*/

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
            return videoPOJOList.stream().filter(s->s.getVideoState().equals(VideoState.STREAM)).collect(Collectors.toList());
        }else {
            String[] strings = text.split("\\s+");
            List<VideoPOJO> videoPOJOList2 = new ArrayList<>();
            videoPOJOList.stream().forEach(s -> {
                for (String word : strings) {
                    if (s.getTitle().toLowerCase().contains(word.toLowerCase())&& s.getVideoState().equals(VideoState.STREAM))
                        videoPOJOList2.add(s);

                }
            });
            List<VideoPOJO> listWithoutDuplicates = new ArrayList<>(
                    new HashSet<>(videoPOJOList2));
            return listWithoutDuplicates;
        }


    }
}
