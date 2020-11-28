package com.project.videoSerwis.email;

import com.project.videoSerwis.pojo.EmailPropertiesPOJO;

public interface EmailSender {
    void sendEmail(EmailPropertiesPOJO emailPropertiesPOJO, String to, String title, String content);
}