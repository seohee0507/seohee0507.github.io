---
date: '2025-11-19'
title: 'HTML rel'
categories: ['Web Fundamentals']
summary: 'HTML Attribute relkeywords'
thumbnail: './gatsby-starter.jpg'
---

## rel="noopener noreferrer"
> 새창 열기(_blank) 속성 사용 시 window.opener API 공격 방지

```html
<a href="http://url" target="_blank" rel="noopener noreferrer">새 창으로 열기</a>
```
- 신뢰할 수 없는 링크 열 때 사용 (다른 도메인으로 연결 예: SNS)
- 최신 크롬, 사파리는 `target="_blank"` 인 경우 `noopener`로 변경

## rel="preload / preconnect / prefetch"
> 리소스 우선순위

### preload : 현재 페이지에 사용될 것이 확실한 리소스 (`as` 와 같이 사용)
```html
<link rel="preload" href="font.woff" as="font" type="font/woff" crossorigin="anonymous">
```
- `as` 리소스 유형 (font, script, style)
- `crossorigin` CORS 요청 처리 방식
	- **anonymous** : 브라우저가 외부 리소스 요청 시 익명 모드로 CORS 요청  
		사용자의 인증 정보(세션, 쿠키, 헤더) 전송하지 않음 &rightarrow; 사용자 데이터 보호  
		인증 없이도 접근 가능한 공개 리소스에 사용 (예 폰트, 스크립트, 이미지)
	- **use-credentials** : 인증 정보 포함해서 CORS 요청  
		로그인/세션 기반 리소스에 사용 (예 web app manifests)


### preconnect : 브라우저가 사이트에 필요한 연결을 미리 예상
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
```
- CDN 리소스의 정확한 경로를 모를 경우 (예: JQuery 리소스 브라우저별로 버전이 다를 경우)
- 필요한 소켓 미리 설정 &rightarrow; DNS, TLS 왕복에 필요한 시간 절약
- 10초 내로 브라우저가 빨리 닫히는 페이지는 사용하지 않음

### prefetch
- 미래에 사용될 것이라고 예상되는 리소스  
	예) 리스트의 첫 번째 상세 페이지 미리 불러오기
```html
<link re="prefetch" href="page-2.html">
```

### *override 되지 않음
```html
<link rel="prefetch" href="style.css">
<link rel="stylesheet" href="style.css">
```
- 중복된 경우 나중에 정의된 속성(stylesheet)만 적용되는게 아니라 2번 가져옴

## HTTP Content-Security-Policy (CSP)
> 관리자가 사용자 에이전트의 특정 페이지에 로드할 수 있는 리소스를 제어

- css, script, image 리소스들이 HTML문서가 제공하는 곳-불러오는 곳을 동일하게 두어 XSS(Cross-site scripting) 공격 방지
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*;">
```
- `self` 현재 도메인만 허용
- `none` 모두 차단
- `도메인` 접근 허용 도메인
