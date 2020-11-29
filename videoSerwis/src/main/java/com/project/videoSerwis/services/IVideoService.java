package com.project.videoSerwis.services;


import com.project.videoSerwis.pojo.VideoPOJO;

import java.util.List;

public interface IVideoService {

    public VideoPOJO postVideo(VideoPOJO videoPOJO, String userId);

    public void putEndVideoStream(String videoId);

    public VideoPOJO getVideoByState(String videoState, String userId);

    public void deleteVideo(String videoId);

    public VideoPOJO getVideoById(String videoId);

    public List<VideoPOJO> getVideosByUser(String userId);

    public List<VideoPOJO> getVideos();

    public List<VideoPOJO> getVideosByText(String text);


}
