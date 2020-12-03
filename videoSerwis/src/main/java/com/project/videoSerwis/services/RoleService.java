package com.project.videoSerwis.services;

import com.project.videoSerwis.pojo.RolePOJO;
import com.project.videoSerwis.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoleService implements  IRoleService{
    @Autowired
    RoleRepository roleRepository;

    @Override
    public void postRole(RolePOJO rolePOJO) {
        roleRepository.save(rolePOJO);
    }

    @Override
    public Boolean deleteRole(String id) {
        roleRepository.deleteById(id);
        return roleRepository.existsById(id)==false;
    }

    @Override
    public List<RolePOJO> getRoles() {
        return roleRepository.findAll();
    }
}
