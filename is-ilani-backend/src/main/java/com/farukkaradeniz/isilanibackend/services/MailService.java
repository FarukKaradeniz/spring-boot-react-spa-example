package com.farukkaradeniz.isilanibackend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private Logger log = LoggerFactory.getLogger(MailService.class);

    private JavaMailSender mailSender;

    @Autowired
    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Async
    public void sendMail(String to, String message) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Your job application's status has changed.");
        msg.setText(message);
        mailSender.send(msg);
        log.info(String.format("Mail was sent to %s, Message: (%s)", to, message));
    }

}
