import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { to, subject, html } = body;

  if (!to || !subject || !html) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    const result = await resend.emails.send({
      from: "chantricelacabe@gmail.com", // verified email address
      to,
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error); // Improved error logging
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
