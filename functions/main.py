import os
from datetime import datetime as dt
import smtplib
from email.message import EmailMessage

from firebase_functions import https_fn
from firebase_admin import initialize_app


initialize_app()


@https_fn.on_request()
def mailer(req: https_fn.Request) -> https_fn.Response:
    assert req.json

    EMAIL = os.environ.get("GMAIL_EMAIL")
    PASSWORD = os.environ.get("GMAIL_PASS")
    assert EMAIL and PASSWORD

    j = req.json
    info = {
        "Name": j["name"],
        "Email": j["email"],
        "Phone": j["phone"],
        "Event Date": dt.strptime(j["date"], "%Y-%m-%d").strftime("%B %d %Y"),
        "Start Time": dt.strptime(j["start"], "%H:%M").strftime("%I:%M %p"),
        "End Time": dt.strptime(j["end"], "%H:%M").strftime("%I:%M %p"),
        "Event Location	": j["location"],
        "Estimated Guest Count": j["count"],
        "Additional Info": j["details"],
    }

    msg = EmailMessage()
    msg["Subject"] = f"Catering Inquiry from {j['name']}"
    msg["From"] = EMAIL
    msg["To"] = EMAIL

    table_rows = "".join(
        [f"<tr><td>{k}</td><td>{v}</td></tr>" for k, v in info.items()]
    )
    html = f"""
    <html>
      <body>
      <table>
      {table_rows}
      </table>
      </body>
    </html>
    """
    msg.add_alternative(html, subtype="html")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp_server:
        smtp_server.login(EMAIL, PASSWORD)
        smtp_server.sendmail(EMAIL, EMAIL, msg.as_string())

    return https_fn.Response(status=200)
