import os
import logging
import asyncio

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_NOTIFICATION_EMAIL = os.environ.get('ADMIN_NOTIFICATION_EMAIL', '')

if RESEND_API_KEY:
    import resend
    resend.api_key = RESEND_API_KEY
    logger.info("Resend email notifications enabled")
else:
    logger.info("Resend not configured - email notifications disabled")


async def send_chat_notification(session_id: str, message: str, sender_name: str = "Visitor"):
    if not RESEND_API_KEY or not ADMIN_NOTIFICATION_EMAIL:
        return
    try:
        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <div style="background: #1a1a2e; color: white; padding: 16px 20px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; font-size: 16px;">New Chat Message</h2>
            </div>
            <div style="background: #f8f9fb; padding: 20px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">From: <strong>{sender_name}</strong></p>
                <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">Session: {session_id}</p>
                <div style="background: white; padding: 12px 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 12px;">
                    <p style="margin: 0; color: #1a1a2e; font-size: 15px;">{message}</p>
                </div>
                <p style="margin: 16px 0 0; font-size: 13px; color: #E20074;">Reply from your admin panel</p>
            </div>
        </div>
        """
        params = {
            "from": SENDER_EMAIL,
            "to": [ADMIN_NOTIFICATION_EMAIL],
            "subject": f"New chat from {sender_name}",
            "html": html,
        }
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Chat notification sent for session {session_id}")
    except Exception as e:
        logger.error(f"Failed to send chat notification: {e}")
