// Pages Function: /api/contact
// お問い合わせフォームの中継エンドポイント。
// クライアント側の対策（ハニーポット・JSトークン・3秒タイマー・レート制限）は
// すべてJavaScriptのため、Googleフォームのエンドポイントに直接POSTするボットには
// 効かない。ここでサーバー側の検証（ハニーポット再チェック + Turnstile）を行い、
// 通過したリクエストのみをGoogleフォームへ転送する。

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScVvrHe8YlZ_rTAiFJRAgmxhtF56sxjmJWjbv-YRkPAZsVeLQ/formResponse';

const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

function errorResponse() {
  const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>送信エラー｜樺太食堂</title>
<style>
  body { font-family: sans-serif; text-align: center; padding: 4rem 1.5rem; color: #333; }
  a { color: #b8860b; }
</style>
</head>
<body>
  <p>送信に失敗しました。お手数ですが、もう一度お試しください。</p>
  <p><a href="/#contact">トップへ戻る</a></p>
</body>
</html>`;
  return new Response(html, {
    status: 400,
    headers: { 'Content-Type': 'text/html; charset=UTF-8' },
  });
}

function redirectToThankYou() {
  return new Response(null, {
    status: 303,
    headers: { Location: '/thank-you.html' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const form = await request.formData();

    // ハニーポット判定（ボットに気づかせないよう成功を装って終了）
    const honey1 = form.get('_honey');
    const honey2 = form.get('_website');
    const honey3 = form.get('_contact');
    if (honey1 || honey2 || honey3) {
      return redirectToThankYou();
    }

    // Turnstile検証
    if (!env.TURNSTILE_SECRET) {
      console.error('TURNSTILE_SECRET is not configured');
      return errorResponse();
    }

    const token = form.get('cf-turnstile-response');
    const ip = request.headers.get('CF-Connecting-IP');

    const verifyBody = new URLSearchParams();
    verifyBody.set('secret', env.TURNSTILE_SECRET);
    verifyBody.set('response', token || '');
    if (ip) {
      verifyBody.set('remoteip', ip);
    }

    const verifyRes = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: verifyBody.toString(),
    });
    const verifyJson = await verifyRes.json();

    if (!verifyJson.success) {
      return errorResponse();
    }

    // Googleフォームへ転送
    const forwardBody = new URLSearchParams();
    forwardBody.set('entry.2050710173', form.get('entry.2050710173') || '');
    forwardBody.set('entry.1725009351', form.get('entry.1725009351') || '');
    forwardBody.set('entry.68019424', form.get('entry.68019424') || '');
    forwardBody.set('entry.1523612294', form.get('entry.1523612294') || '');

    await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: forwardBody.toString(),
    });

    return redirectToThankYou();
  } catch (err) {
    console.error('contact function error:', err);
    return redirectToThankYou();
  }
}
