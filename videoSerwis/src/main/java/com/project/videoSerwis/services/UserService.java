package com.project.videoSerwis.services;

import com.project.videoSerwis.pojo.RolePOJO;
import com.project.videoSerwis.pojo.UserPOJO;
import com.project.videoSerwis.repositories.RoleRepository;
import com.project.videoSerwis.repositories.UserRepository;
import io.reactivex.Observable;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

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
        return userRepository.findById(id).get();
    }

    @Override
    public UserPOJO getUserByEmailAndPassword(String email, String password) {

        List<UserPOJO> userPOJOS = getUserPojo();
        AtomicReference<UserPOJO> user= new AtomicReference<>(new UserPOJO());
        Observable<List<UserPOJO>> observer = Observable.just(userPOJOS);

        observer.flatMap(Observable::fromIterable)
                .filter(s -> s.getEmail().equals(email) && s.getPassword().equals(password))
                .toList()
                .subscribe(s -> {
                    user.set(s.get(0));
                });


        return user.get();
    }

    @Override
    public Boolean deleteUser(String id) {
        userRepository.deleteById(id);
        return userRepository.existsById(id)==false;
    }

    @Override
    public void putPassword(String id, String newPass, String oldPass) {
        UserPOJO userPOJO = userRepository.findById(id).get();
        if(userPOJO.getPassword().equals(oldPass)) userPOJO.setPassword(newPass);
        userRepository.save(userPOJO);

    }

    @Override
    public void postUser(UserPOJO userPOJO) {
        userPOJO.setDateTime(new Date(Calendar.getInstance().getTime().getTime()));
        RolePOJO rolePOJO = roleRepository.findByRoleName("USER").get();
        userPOJO.setRole(rolePOJO);
        userRepository.save(userPOJO);

    }

    @Override
    public void putUserRole(String userId, String roleName) {
        UserPOJO userPOJO = userRepository.findById(userId).get();
        RolePOJO rolePOJO = roleRepository.findByRoleName(roleName).get();
        if (rolePOJO==null)userPOJO.setRole(rolePOJO);
        userRepository.save(userPOJO);


    }
}
