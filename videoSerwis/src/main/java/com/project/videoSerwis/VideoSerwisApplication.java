package com.project.videoSerwis;

import com.project.videoSerwis.enums.State;
import com.project.videoSerwis.pojo.RolePOJO;
import com.project.videoSerwis.pojo.UserPOJO;
import com.project.videoSerwis.repositories.RoleRepository;
import com.project.videoSerwis.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@SpringBootApplication
public class VideoSerwisApplication {



	public static void main(String[] args) {



		SpringApplication.run(VideoSerwisApplication.class, args);

	}

	@Component
	class DemoCommandLineRunner implements CommandLineRunner{

		@Autowired
		RoleRepository roleRepository;
		@Autowired
		UserRepository userRepository;

		@Override
		public void run(String... args) throws Exception {
			RolePOJO rolePOJO = new RolePOJO();
			UserPOJO userPOJO = new UserPOJO();
			rolePOJO.setRoleId("5fc2a48f2f70322766742866");
			rolePOJO.setRoleName("USER");
			roleRepository.save(rolePOJO);
			rolePOJO.setRoleId("5fc2a49d2f70322766742867");
			rolePOJO.setRoleName("MODERATOR");
			roleRepository.save(rolePOJO);
			rolePOJO.setRoleId("5fc2a4a32f70322766742868");
			rolePOJO.setRoleName("ADMIN");
			roleRepository.save(rolePOJO);
			rolePOJO.setRoleId("5fc2a4ab2f70322766742869");
			rolePOJO.setRoleName("HEAD_ADMIN");
			roleRepository.save(rolePOJO);
			userPOJO.setUserId("5fc2a5bb2f7032276674286a");
			userPOJO.setName("Admin");
			userPOJO.setSurname("Admin");
			userPOJO.setLogin("HEAD_ADMIN");
			userPOJO.setEmail("testujemy4321@gmail.com");
			userPOJO.setPassword("admin123456789@PL");
			userPOJO.setDateTime(new Date(Calendar.getInstance().getTime().getTime()));
			userPOJO.setTelephone("123456789");
			userPOJO.setRole(rolePOJO);
			userPOJO.setState(State.ACTIVATED);
			userRepository.save(userPOJO);
		}
	}
}
