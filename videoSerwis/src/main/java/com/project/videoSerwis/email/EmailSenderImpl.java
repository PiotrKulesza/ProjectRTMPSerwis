package com.project.videoSerwis.email;

import com.project.videoSerwis.pojo.EmailPropertiesPOJO;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class EmailSenderImpl implements EmailSender{
    @Override
    public void sendEmail(EmailPropertiesPOJO emailPropertiesPOJO, String to, String title, String content) {

        Properties mailProp = new Properties();
        mailProp.put("mail.smtp.host",emailPropertiesPOJO.getEmailHost());
        mailProp.put("mail.smtp.port",emailPropertiesPOJO.getEmailPort());
        mailProp.put("mail.transport.protocol", "smtp");
        mailProp.put("mail.smtp.auth", "true");
        mailProp.put("mail.smtp.starttls.enable", "true");
        mailProp.put("mail.smtp.starttls.required", "true");
        mailProp.put("mail.debug", "true");
        mailProp.put("mail.smtp.ssl.trust", emailPropertiesPOJO.getEmailHost());
        mailProp.put("mail.smtp.allow8bitmime", "true");
        mailProp.put("mail.smtps.allow8bitmime", "true");

        Session session = Session.getInstance(mailProp,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(emailPropertiesPOJO.getEmailUsername(),
                                emailPropertiesPOJO.getEmailPassword());
                    }
                });

        MimeMessage mail = new MimeMessage(session);
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail,  true, "UTF-8");
            helper.setFrom(emailPropertiesPOJO.getEmailUsername());
            helper.setTo(to);
            helper.setSubject(title);
            helper.setText(content, true);
            Transport.send(mail);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
