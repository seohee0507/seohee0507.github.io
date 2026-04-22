---
date: '2026-03-18'
title: 'css features'
categories: ['Web Fundamentals']
summary: '새로운 css, css trick'
thumbnail: './gatsby-starter.jpg'
---

## css feature

### ellipsis
```css
.ellipsis{overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;font-size:16px;line-height:24px;}
```

### 브라우저 터치스크린 액션
```css
touch-action: pan-y pinch-zoom; 다중 지정 가능
```
Values | &nbsp;
:---|:---
auto | default
none | 모든 터치 이벤트 무시
pan-x <br> pan-y <br> pan-left <br> pan-right <br> pan-up <br> pan-down | 특정 축, 방향
pinch-zoom | 손가락 사용한 확대, 축소

### Mobile (iOS)
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

### 변경될 속성 힌트
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

### 텍스트 선택
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
