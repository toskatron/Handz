import smtplib
from email.message import EmailMessage
import sys

def send_email(receiver_email, subject, message):
    # Set up the email message
    msg = EmailMessage()
    msg.set_content(message)
    msg['Subject'] = subject
    msg['From'] = 'handz.ade@gmail.com'  # Update with your email
    msg['To'] = receiver_email

    # Connect to Gmail's SMTP server
    with smtplib.SMTP('smtp.gmail.com', 587) as smtp:
        smtp.starttls()  # Enable TLS (Transport Layer Security)
        smtp.login('handz.ade@gmail.com', 'dariusfotball')  # Update with your Gmail credentials
        smtp.send_message(msg)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python send_email.py receiver_email subject message")
        sys.exit(1)

    receiver_email = sys.argv[1]
    subject = sys.argv[2]
    message = sys.argv[3]

    send_email(receiver_email, subject, message)
