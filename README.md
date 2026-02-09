# 2FA OTP 생성기

2FA Secret Key(Base32)를 입력하면 실시간으로 OTP 코드를 생성하는 웹 앱입니다.

## 기능

- Base32 Secret Key 입력 시 6자리 TOTP 코드 자동 생성
- 30초 주기 카운트다운 타이머
- URL 경로로 고정 키 OTP 표시 (`/your-secret-key`)
- 클릭하여 OTP 코드 복사
- 라이트/다크 모드 지원

## 기술 스택

- [Next.js](https://nextjs.org) 16
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [OTPAuth](https://github.com/hectorm/otpauth) - TOTP 생성

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 배포

[Vercel](https://vercel.com)을 통해 배포되어 있습니다.
