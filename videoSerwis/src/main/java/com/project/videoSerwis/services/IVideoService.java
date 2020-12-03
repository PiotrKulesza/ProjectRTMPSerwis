package com.project.videoSerwis.services;

import com.project.videoSerwis.pojo.VideoPOJO;
import java.util.List;

public interface IVideoService {

    public VideoPOJO postVideo(VideoPOJO videoPOJO, String userId);

    public void putEndVideoStream(String videoId);

    public void deleteVideo(String videoId);

    public VideoPOJO getVideoById(String videoId);

    public List<VideoPOJO> getVideos();

    public List<VideoPOJO> getVideosByText(String text);

    public void putEndToAllVideoStreams(String userId);


}
