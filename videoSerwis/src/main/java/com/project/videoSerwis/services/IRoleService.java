package com.project.videoSerwis.services;

import com.project.videoSerwis.pojo.RolePOJO;
import java.util.List;


public interface IRoleService {
    public void postRole(RolePOJO rolePOJO);
    public Boolean deleteRole(String id);
    public List<RolePOJO> getRoles();
}
