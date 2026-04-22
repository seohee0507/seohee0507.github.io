---
date: '2026-04-21'
title: 'Quick Markup'
categories: ['Web Fundamentals']
summary: '이벤트 핸들링 최적화, OG Tag'
thumbnail: './gatsby-starter.jpg'
---

## Event Resize, Scroll 최적화
### Debounce
- 마지막 호출, delay 후 실행 : 이벤트 하나로 묶어 처리
- 실시간 검색, 검색 필터링, 창 크기 조정, 유효성 검사
```js
const debounce = (cb: Function, delay) => {
	let timer = null;

	return function (...args) {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			cb.apply(this, args)
			timer = null;
		}, delay);
	}
}
```
### Throttler
- delay 마다 실행 : 이벤트 중에도 delay 마다 업데이트
- 스크롤, API 호출
```js
const throttler = (cb: Function, delay) => {
	let timer = null;

	return function (...args) {
		if (!timer) {
			cb.apply(this, args);

			timer = setTimeout(() => {
				timer = null;
			}, delay);
		}
	}
};
```

## Quick Markup
### OG Tag
```html
<meta property="twitter:title" content="">
<meta property="twitter:description" content="">
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:image" content="_share_main.png">
<meta property="twitter:image:width" content="500">
<meta property="twitter:image:height" content="250">
<meta property="og:title" content=""/>
<meta property="og:description" content="">
<meta property="og:image" content="_share_main.png">
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="사이트 명">
<meta property="og:type" content="website">
<meta property="og:url" content="url">
```

### Radio Readonly
```js
someRadio.forEach(item=>{
	item.addEventListener('click', e=> e.preventDefault())
})
```

### 제한시간 타이머
```js
const createCountdown = (limitTime) =>{
	const displayElement = document.querySelector('.printTime');
	if (!displayElement) return;

	let tickSetTimeout;
	const numericLimit = Number(limitTime) || 0;
	const endTime = Date.now() + (numericLimit * 1000);

	const render = (time) =>{
		const min = String(Math.floor(time/60)).padStart(2, "0");
		const sec = String(time % 60).padStart(2, "0");
		const timeStr = min + sec;
		const timeHtml = timeStr.split('')
			.map(val => `<span class="inp">${val}</span>`)
			.join('');

		displayElement.innerHTML = timeHtml;
	}

	const tick = ()=>{
		const syncTime = endTime - Date.now();
		const remainingTime = Math.max(0, Math.ceil(syncTime / 1000));
		const nextDelay = syncTime % 1000 || 1000;

		render(remainingTime);

		if (remainingTime <= 0) {
			clearTimeout(tickSetTimeout);
			return
		}
		
		tickSetTimeout = setTimeout(tick, nextDelay);
	}
	tick();

	return {
		stop: () => clearTimeout(tickSetTimeout)
	}
}
```
