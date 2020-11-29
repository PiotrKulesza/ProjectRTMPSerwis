package com.project.videoSerwis.services;

import com.project.videoSerwis.pojo.UserPOJO;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    public List<UserPOJO> getUserPojo();

    public UserPOJO getUserById(String id);

    public UserPOJO getUserByEmailAndPassword(String email, String password);

    public Boolean deleteUser(String id);

    public String putPassword(String id, String newPass, String oldPass);

    public String postUser(UserPOJO userPOJO);

    public void putUserRole(String userId, String roleName);

    public void putActivate(String userId);
    public void putUnban(String userId);
    public void putBan(String userId);

    public String putUserLogin(String userId, String login);

    public List<UserPOJO> getUserByText(String text);

    public void putUserAvatar(String userId, String avatar);

    public void putUserTelephone(String userId, String telephone);

    public void putUserName(String userId, String name);

    public void putUserSurname(String userId, String surname);

    public Optional<UserPOJO> getUserByLogin(String login);



}
