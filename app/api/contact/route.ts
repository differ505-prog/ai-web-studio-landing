import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT;

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "提交資料格式錯誤，請重新整理後再試。" }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const website = payload.website?.trim() ?? "";

  if (website) {
    return NextResponse.json({ message: "已收到表單資料。" });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ message: "請完整填寫姓名、Email 與需求描述。" }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ message: "請輸入有效的 Email。" }, { status: 400 });
  }

  if (name.length > 80 || email.length > 160 || message.length > 3000) {
    return NextResponse.json({ message: "內容長度超出限制，請精簡後再送出。" }, { status: 400 });
  }

  if (!FORMSPREE_ENDPOINT) {
    return NextResponse.json(
      { message: "表單服務尚未完成設定，請直接來信至 hello.arrivestudio@gmail.com。" },
      { status: 500 },
    );
  }

  try {
    const upstreamResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: "Arrive Studio 官網新詢問",
      }),
    });

    const result = (await upstreamResponse.json().catch(() => null)) as
      | { errors?: Array<{ message?: string }> }
      | null;

    if (!upstreamResponse.ok) {
      const upstreamMessage =
        result?.errors?.[0]?.message || "目前無法送出表單，請稍後再試或直接來信聯絡。";

      return NextResponse.json({ message: upstreamMessage }, { status: 502 });
    }

    return NextResponse.json({ message: "已成功收到需求，我們會盡快回覆你。" });
  } catch {
    return NextResponse.json(
      { message: "表單服務暫時無法連線，請稍後再試或直接來信聯絡。" },
      { status: 502 },
    );
  }
}
