import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const MailchimpKey = process.env.MAILCHIMP_API_KEY;
    const MailchimpServer = process.env.MAILCHIMP_API_SERVER;
    const MailchimpAudience = process.env.MAILCHIMP_LIST_ID;

    if (!MailchimpKey || !MailchimpServer || !MailchimpAudience) {
      return NextResponse.json(
        { error: "Missing Mailchimp environment variables" },
        { status: 500 }
      );
    }

    const customUrl = `https://${MailchimpServer}.api.mailchimp.com/3.0/lists/${MailchimpAudience}/members`;

    const response = await fetch(customUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${MailchimpKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
      }),
    });

    const contentType = response.headers.get("content-type");
    const responseText = await response.text();
    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        try {
          const errorData = JSON.parse(responseText);
          return NextResponse.json(
            { error: errorData.detail },
            { status: response.status }
          );
        } catch {
          return NextResponse.json(
            { error: responseText },
            { status: response.status }
          );
        }
      } else {
        return NextResponse.json(
          { error: responseText },
          { status: response.status }
        );
      }
    }

    const data =
      contentType && contentType.includes("application/json")
        ? JSON.parse(responseText)
        : responseText;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
