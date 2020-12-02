package com.project.videoSerwis.services;

import com.project.videoSerwis.enums.State;
import com.project.videoSerwis.pojo.RolePOJO;
import com.project.videoSerwis.pojo.UserPOJO;
import com.project.videoSerwis.repositories.RoleRepository;
import com.project.videoSerwis.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements IUserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<UserPOJO> getUserPojo() {
        return userRepository.findAll();
    }

    @Override
    public UserPOJO getUserById(String id) {
        if(userRepository.findById(id).isPresent())
            return userRepository.findById(id).get();
        return new UserPOJO();

    }

    @Override
    public UserPOJO getUserByEmailAndPassword(String email, String password) {

        UserPOJO userPOJO= new UserPOJO();
        if (userRepository.findByEmailAndPassword(email,password).isPresent())
            return userRepository.findByEmailAndPassword(email,password).get();
        else return userPOJO;

    }

    @Override
    public Boolean deleteUser(String id) {
        userRepository.deleteById(id);
        return !userRepository.existsById(id);
    }

    @Override
    public String putPassword(String id, String newPass, String oldPass) {

        if(userRepository.findById(id).isPresent()){
            UserPOJO userPOJO = userRepository.findById(id).get();

            if(userPOJO.getPassword().equals(oldPass)) {
                userPOJO.setPassword(newPass);
                userRepository.save(userPOJO);
                return "0";
            }else return "1";


        }return "2";

    }

    @Override
    public String postUser(UserPOJO userPOJO) {
        if(!userRepository.findByEmail(userPOJO.getEmail()).isPresent()){
            if(!userRepository.findByLogin(userPOJO.getLogin()).isPresent()){
                userPOJO.setDateTime(new Date(Calendar.getInstance().getTime().getTime()));
                if(roleRepository.findByRoleName("USER").isPresent()){
                    RolePOJO rolePOJO = roleRepository.findByRoleName("USER").get();
                    userPOJO.setRole(rolePOJO);
                }
                userPOJO.setState(State.valueOf("INACTIVATED"));
                userRepository.save(userPOJO);
                return userPOJO.getUserId();
            }else return "1";
        }else return "2";

    }

    @Override
    public void putUserRole(String userId, String roleName) {
        if(userRepository.findById(userId).isPresent()
                && roleRepository.findByRoleName(roleName).isPresent()){
            UserPOJO userPOJO = userRepository.findById(userId).get();
            RolePOJO rolePOJO = roleRepository.findByRoleName(roleName).get();
            userPOJO.setRole(rolePOJO);
            userRepository.save(userPOJO);
        }


    }

    @Override
    public void putActivate(String userId) {
        if(userRepository.findById(userId).isPresent()){
            UserPOJO userPOJO = userRepository.findById(userId).get();
            userPOJO.setState(State.ACTIVATED);
            userRepository.save(userPOJO);
        }
    }

    @Override
    public void putState(String userId, String state) {
        if(userRepository.findById(userId).isPresent()){
            UserPOJO userPOJO = userRepository.findById(userId).get();
            userPOJO.setState(State.valueOf(state));
            userRepository.save(userPOJO);
        }
    }


    @Override
    public String putUserLogin(String userId, String login) {
        if(!getUserByLogin(login).isPresent()) {
            if(userRepository.findById(userId).isPresent()){
                UserPOJO userPOJO = userRepository.findById(userId).get();
                userPOJO.setLogin(login);
                userRepository.save(userPOJO);
            }
            return "0";
        }else{
            return "1";
        }
    }

    @Override
    public List<UserPOJO> getUserByText(String text) {

        List<UserPOJO> userPOJOList = userRepository.findAll();
        if(text.equals("@everyone")) {
            return userPOJOList;
        }else {
            String[] strings = text.split("\\s+");
            List<UserPOJO> userPOJOList2 = new ArrayList<>();
            userPOJOList.stream().forEach(s -> {
                for (String word : strings) {
                    if (s.getLogin().toLowerCase().contains(word.toLowerCase()))
                        userPOJOList2.add(s);

                }
            });
            List<UserPOJO> listWithoutDuplicates = new ArrayList<>(
                    new HashSet<>(userPOJOList2));
            return listWithoutDuplicates;
        }
    }

    @Override
    public void putUserAvatar(String userId, String avatar) {
        if(userRepository.findById(userId).isPresent()){
            UserPOJO userPOJO = userRepository.findById(userId).get();
            userPOJO.setAvatar(avatar);
            userRepository.save(userPOJO);
        }

    }

    @Override
    public void putUserTelephone(String userId, String telephone) {
        if(userRepository.findById(userId).isPresent()){
            UserPOJO userPOJO = userRepository.findById(userId).get();
            userPOJO.setTelephone(telephone);
            userRepository.save(userPOJO);
        }

    }

    @Override
    public void putUserName(String userId, String name) {


    }

    @Override
    public void putUserSurname(String userId, String surname) {
        if(userRepository.findById(userId).isPresent()){
            UserPOJO userPOJO = userRepository.findById(userId).get();
            userPOJO.setSurname(surname);
            userRepository.save(userPOJO);
        }

    }

    @Override
    public Optional<UserPOJO> getUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }
}
