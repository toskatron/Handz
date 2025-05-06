package com.example.backend.email;

import com.example.backend.service.HandymanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.IOException;
import java.util.Properties;

public class EmailUtil {
    private static final Logger logger = LoggerFactory.getLogger(EmailUtil.class);

    public static void sendEmail(String receiverEmail, String subject, String message) {
        try {
            // Prepare the command to execute the Python script
            String[] command = {"python", "send_email.py", receiverEmail, subject, message};

            // Create a process builder
            ProcessBuilder pb = new ProcessBuilder(command);

            // Start the process
            Process process = pb.start();

            // Wait for the process to finish
            int exitCode = process.waitFor();

            // Check the exit code
            if (exitCode == 0) {
                logger.warn("Email sent successfully!");

            } else {
                logger.warn("Failed to send email.");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
