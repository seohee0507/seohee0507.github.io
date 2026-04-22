---
date: '2025-09-26'
title: 'Browser 기본'
categories: ['Web Fundamentals']
summary: 'Browser Engine, DOM, Browser Rendering, Web Server'
thumbnail: './gatsby-starter.jpg'
---

## Browser
> 사용자가 URI 사용하여 표시할 리소스(HTML) 위치를 서버에 요청 &rightarrow; 서버가 브라우저 창에 표시하여 응답
- 리소스(HTML, XML, CSS, JS, JSON, PDF)

![브라우저 구성요소](https://web.dev/static/articles/howbrowserswork/image/browser-components-9cd8ff834cc9c_856.png)  
[출처 web.dev](https://web.dev/articles/howbrowserswork?hl=ko)
- User Interface: 주소 표시줄, 새로고침/뒤로/앞으로 버튼, 북마크 메뉴 (공식 지정은 없고 권장 사항)
- Networking: HTTP 요청
- UI Backend: checkbox, selectbox, input
- 데이터 스토리지: localStorage, FileSystem

### Browser engine
> User Interface와 Rendering engine을 연결 (URL로딩 시작 메서드, 새로고침, 뒤로, 앞으로)
- 최신 브라우저 엔진은 클라이언트 데이터(쿠키, localStorage) 확인 가능(개발자 도구)

### Rendering engine
> 요청한 URL의 콘텐츠를 브라우저 화면에 렌더링 (HTML, XML, CSS 파싱)
- Gecko (Mozilla 파이어폭스)
- Webkit (사파리, 초창기 크롬)  
	Apple에서 Mac, Windows를 지원하도록 수정한 오픈소스
- Blink (크롬, 엣지, 웨일, 삼성 인터넷, 오페라)  
	구글에서 Webkit 베이스로(fork) 제작

<table>
	<tr>
		<th style="word-break:keep-all">Parsing <br/> &downarrow;</th>
		<td>
			HTML, XML 원시바이트(청크) meta 태그에 지정된 인코딩(UTF-8)에 따라 문자열 변환 &rightarrow;<br />
			토큰화(태그 열림 닫힘< />), 객체 변환 &rightarrow; 노드 생성(html, body, head, meta) &rightarrow;<br/>
			<b>DOM</b> 생성, <b>CSSOM</b> 생성: internal(inline), external(link) 모두 파싱
		</td>
	</tr>
	<tr>
		<th style="word-break:keep-all">Style <br/> &downarrow;</th>
		<td>
			<b>Render tree</b> 생성(실제 표시되는 노드) <br/>
			meta태그, script태그, display:none~ 표시하지 않음
		</td>
	</tr>
	<tr>
		<th style="word-break:keep-all">Layout <br/> &downarrow;</th>
		<td>
			뷰 포트 내 노드의 정확한 좌표, 크기 계산 (%, vw, vh 실제 px로 변환) <br />
			Reflow: Gecko / Layout: Webkit
		</td>
	</tr>
	<tr>
		<th style="word-break:keep-all">Painting <br/> &downarrow;</th>
		<td>Rasterizing 스타일 실제 적용 (color, font style, img, shadow)</td>
	</tr>
	<tr>
		<th style="word-break:keep-all">Composite</th>
		<td>페인트 단계에서 생성된 레이어를 합성하여 스크린 업데이트</td>
	</tr>
</table>

## DOM
### Real DOM
- Svelte
- 브라우저가 HTML 파싱하여 생성
- `.` dot 표기법으로 accessible
- 변경 시 Reflow, Repaint

### Shadow DOM
- DOM 분리(Real DOM, Shadow DOM 변경 시 서로의 요소에 적용되지 않음)
- 브라우저 자체 내부 Shadow DOM : `<input>` `<textarea>` `<video>` `<image>`
- 스타일을 완전히 분리하고 싶을 때 사용. CSS 스타일 충돌 방지. Third-party Widgets(대화 형 위젯)
- 사용하기 [Shadow DOM API + 사용자 정의요소](/web-apis/#shadow-dom-만들기)

### Virtual DOM
- React, Vue
- Virtual DOM을 Virtual DOM2 로 복제(메모리에 복제) 후 업데이트 된 위치 감지하여 업데이트 요소만 변경

## Browser Rendering
### SSR (Server Side Rendering)
> 서버에서 완전히 렌더링 된 HTML 전달
- Node.js, Multi Page Application(MPA)
- 최초 로딩 속도 빠름
- 페이지 이동 시 새로운 HTML 전체 다시 렌더링 (깜빡임, 로딩 속도 느림)
- 위 문제 보완하기 위해 AJAX(XMLHttpRequest, fetch, Axios)로 필요한 부분(데이터)만 비동기적으로 업데이트
- SEO 친화적

### CSR (Client Side Rendering)
> HTML, JavaScript 모두 받아온 후 JavaScript를 실행하여 동적으로 페이지 렌더링
- Client 요청 &rightarrow; index.html (`<div id="root"> <script scr="app.js">`) 서버 응답
- 최초 로딩 속도 느림
- 로딩 후 실시간 데이터 처리 빠름
- 파일 하나(index.html)로 렌더링 되기 때문에 SEO 문제 발생

### SSG (Static Site Generator)
- Gatsby
- 빌드 시 렌더링 마친 정적 파일들을 generate 하여 배포 &rightarrow; 정적 파일 응답 (초기 로딩 속도 빠름)

### Next.js (하이브리드 프레임워크)
- SSR과 CSR의 단점을 보완하기위해 만든 React 프레임워크 (SSR, CSR, SSG 모두 지원)
- 자동 코드 분할(Automatic Code Splitting) : 각 페이지 로딩 시 필요한 코드만 미리 로드
- Hydration (HTML을 React Application 초기화)  
	: 미리 렌더링 된 HTML에 javascript를 결합  
	HTML(dummy) &rightarrow; React Application initialized &rightarrow; Interactive App  
	- Backend에서 렌더 후 명시된(use client) componenet만 hydration

## Server
### Web Application Server (WAS)
> 클라이언트(웹 브라우저)로부터 요청받아 동적인 콘텐츠(데이터베이스 조회) 생성하고 제공

### Web Server
> 클라이언트(웹 브라우저)에 하이퍼미디어(HTML, CSS, JavaScript, 이미지, API) 응답
- port: 80 HTTP/ 443 HTTPS 단일 TCP 연결
- FTP (파일 전송 프로토콜)


* * *
- <https://web.dev/articles/howbrowserswork?hl=ko>
