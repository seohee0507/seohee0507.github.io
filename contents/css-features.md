---
date: '2026-04-18'
title: 'css features'
categories: ['Web Fundamentals']
summary: '새로운 css, css trick'
thumbnail: './css-features.png'
---


## 텍스트 줄바꿈
```css
text-wrap: balance;
```

Values | &nbsp; | 성능 비용 | 활용
:-------|:-----------------------------|:---|:---
balance | 각 줄의 길이 최대한 비슷하게 맞춤 | 높음 (4줄 이하 권장) | 제목, 헤더
pretty  | 마지막 줄에 단어 하나만 남는 것 방지 | 비교적 낮음 | 본문, 단락

## Popover API
> JS 없이 css만으로 툴팁, 드롭다운, 모달 구현
- Top Layer 자동 처리 (z-index)
- 접근성 자동 처리 (모달 접근성은 `<dialog>` 가 더 적합)

```html
<button popovertarget="my-popover">열기</button>
<div id="my-popover" popover>내용</div>
```
- `popovertarget` : `<buttom>`, `<input>` 요소로 popover 제어 (제어할 popover id값 받음)  
	이 외 태그로(div, a) 사용하려면 js로 제어하며, 접근성 등 직접 처리해야함
- `popovertargetaction` : popover 제어 요소에 작업 지정 (`show` `hide` `toggle`)

popover Values | &nbsp; | &nbsp; 
:-------|:------|:------
auto (default) <br/> `popover="auto"` <br /> === `popover` <br /> === `popover=""` | 외부 클릭 닫기, ESC 닫기 가능(light-dismissed) | 툴팁, 드롭다운, 유저 프로필
manual | JS로만 닫기 제어 | toast 알림
hint <span class="badge-danger">실험적</span> | hint open 시 auto 닫지 않음 <br /> 실험단계로 기능 구현 잘 안됨 | &nbsp; 

popover CSS features | &nbsp;
:-------|:------
::backdrop | 바로 뒤 전체 화면
:popover-open | popover open 될 때 스타일

popover Methods | &nbsp;
:-------|:------
`HTMLElement.hidePopover` | 숨긴 후 display:none
`HTMLElement.showPopover` | 최상위 레이어에 추가
`HTMLElement.togglePopover` | 현재 상태 반전 `HTMLElement.togglePopover(boolean)`


### Toast Popover
```html
<button onclick="createToast('name', '저장', '완료되었습니다.')">Trigger</button>
<div id="toast-container"></div>
```

```css
[popover] {
	position: absolute;
	inset: unset;
	right: 20px;
	padding: 12px 20px;
	border: 1px solid #ddd;

	/* 퇴장 Style */
	transform: translateY(20px); 
	opacity: 0;
	/* @starting-style - overlay, display 조합 */
	transition:
		opacity 0.3s,
		transform 0.3s,
		bottom 0.3s,
		overlay 0.3s allow-discrete,
		display 0.3s allow-discrete;
}
/* popover Open Style */
[popover]:popover-open {
	transform: translateY(0);
	opacity: 1;
}

/* 진입 Style */
@starting-style {
	[popover]:popover-open {
		transform: translateY(20px);
		opacity: 0;
	}
}
```

```javascript
const createToast = (name, title, msg) => {
	const popover = document.createElement('div')
	popover.popover = 'manual'
	popover.classList.add('toast')
	popover.textContent = msg
	document.body.appendChild(popover)

	popover.showPopover()
	moveToast()

	setTimeout(() => {
		popover.hidePopover()
		setTimeout(() => {
			popover.remove() // 퇴장 Style 후 삭제
			moveToast()
		}, 500)
	}, 4000)
}

const moveToast = () => {
	const toasts = document.querySelectorAll('.toast:popover-open')
	const margin = 10
	const initialBottom = 20

	toasts.forEach((toast, i) => {
		const toastHeight = parseInt(toast.offsetHeight) || 0
		toast.style.bottom = `${initialBottom + i * (toastHeight + margin)}px`
	})
}
```

## 브라우저 터치스크린 액션
```css
touch-action: pan-y pinch-zoom; 다중 지정 가능
```
Values | &nbsp;
:---|:---
auto | default
none | 모든 터치 이벤트 무시
pan-x <br> pan-y <br> pan-left <br> pan-right <br> pan-up <br> pan-down | 특정 축, 방향
pinch-zoom | 손가락 사용한 확대, 축소

## Mobile (iOS)
Values | &nbsp;
:---|:---
`-webkit-text-size-adjust: 100%` | 텍스트 자동 확대 방지
`-webkit-touch-callout: none` | 텍스트, 이미지 길게 누를 때 : 제한적으로만 사용하기
`-webkit-overflow-scrolling: touch` | 구버전 스크롤링
`height: 100dvh` | 동적 뷰포트 기준 height

```css
env(safe-area-inset-bottom)
/* padding 값 필요 시 */
padding-bottom: calc(20px + env(safe-area-inset-bottom))
```
- 노치, 홈바 여유 공간 확보
- Values : `top` `right` `bottom` `left`
- viewport 메타 태그 설정 `<... viewport-fit=cover>`

## 변경될 속성 힌트 <span class="badge-danger">사용도 낮음</span>
```css
will-change: left, top; 다중 지정 가능
```
- 남용 시 성능 저하
Values | &nbsp;
:---|:---
auto | default
scroll-position | &nbsp;
contents | &nbsp;
transform | css 속성 명시 가능

## 텍스트 선택
```css
user-select: auto;
```
Values | &nbsp; | 출력
:---|:---|:---
auto | default <br/> ::before, ::after 선택 제외 | <p class="text-select" style="user-select:auto;"> Lorem Ipsum is simply dummy</p>
text | default 와 동일 | <p class="text-select" style="user-select:text;">Lorem Ipsum is simply dummy</p>
none | &nbsp; | <p class="text-select" style="user-select:none;">Lorem Ipsum is simply dummy</p>
all | &nbsp; | <p class="text-select" style="user-select:all;">Lorem Ipsum is simply dummy</p>

<style>
.text-select::before{content:'가상 선택자';margin-right:8px;}
</style>


## css trick

<span class="txt_underline">inline 속성 border-bottom<br/> Text Text</span>
<div style="background-color:#31373f;padding:10px 20px;">
	<button class="btn_blur">btn_blur 버튼</button>
</div>
<style>
.txt_underline{background:linear-gradient(#ffd723, #ffd723) no-repeat 0 100%; background-size:100% 2px;}
.btn_blur{padding:10px 20px;border-radius:100px;backdrop-filter:saturate(300%) blur(6px);-webkit-backdrop-filter:saturate(300%) blur(6px);background:transparent;border:0;box-shadow:inset 0 1px #fff3;color:#fff;}
.drag-none img{-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;user-drag:none;pointer-events:none;}
</style>

```css
.txt_underline{background:linear-gradient(color, color) no-repeat 0 100%; background-size:100% border-size}
.btn_blur{padding:10px 20px;border-radius:100px;backdrop-filter:saturate(200%) blur(6px);-webkit-backdrop-filter:saturate(200%) blur(6px);background:transparent;border:0;box-shadow:inset 0 1px #fff3;}
.drag-none img{-webkit-user-drag:none;-khtml-user-drag:none;-moz-user-drag:none;-o-user-drag:none;user-drag:none;pointer-events:none;}
```

### ellipsis
```css
.ellipsis{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:16px;line-height:24px;}
```

### Login input
```html
<input type="text" spellcheck="false" />
```
```css
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-text-fill-color:var(--fg-neutral);
	-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	box-shadow: 0 0 0px 1000px #fff inset;
}
input:autofill,
input:autofill:hover,
input:autofill:focus,
input:autofill:active {
	-webkit-text-fill-color:var(--fg-neutral);
	-webkit-box-shadow: 0 0 0px 1000px #fff inset;
	box-shadow: 0 0 0px 1000px #fff inset;
}
```
