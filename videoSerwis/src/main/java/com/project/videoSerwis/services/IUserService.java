package com.project.videoSerwis.services;

import com.project.videoSerwis.pojo.UserPOJO;

import java.util.List;

public interface IUserService {

    public List<UserPOJO> getUserPojo();

    public UserPOJO getUserById(String id);

    public UserPOJO getUserByEmailAndPassword(String email, String password);

    public Boolean deleteUser(String id);

    public void putPassword(String id, String newPass, String oldPass);

    public void postUser(UserPOJO userPOJO);

    public void putUserRole(String userId, String roleName);
}
