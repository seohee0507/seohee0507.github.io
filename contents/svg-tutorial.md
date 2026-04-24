---
date: '2025-11-14'
title: 'SVG 렌더링 기법과 튜토리얼'
categories: ['Visual UI']
summary: 'SVG Tutorial, SVG Rendering'
thumbnail: './svg-tutorial.png'
---

## SVG : Scalable Vector Graphics
> 확장 가능한 벡터 그래픽, W3C XML의 특수 언어

## 1. Image Tag + SVG
```html
<img alt="some" src="/images/some.svg" />
```
- flicker 현상
- cache (초기 로딩은 느림, 이미지 변경 시 파라미터 추가)
- 단점: css 불가

## 2. Inline SVG
- flicker 현상 없음
- first-class in the DOM
	- css 가능 : fill, stroke, circle{r: ;cy: ;}, transition
	- Event Listeners 가능 (각 요소마다)
	- Javscript 동적 제어 가능
	- Design Software(Figma, Illustrator)로 merge(mash) 시 색상수정, animation 불가

### svg <br />
`<svg width="" height="" viewBox="min-x min-y width height"> ... </svg>`
- viewBox: internal coordinate system

### Line <br />
`<line x1="" y1="" x2="" y2="" stroke="" stroke-width="" />`
- start point `x1` `y1` / end point `x2` `y2`

### Rectangles <br />
`<rect x="" y="" width="" height="" rx="" ry="" fill="" stroke="" stroke-width="" />`
- positioned `x` `y` / grow `width` `height` / 반지름 (horizontal, vertical) `rx` `ry`

<svg width="100" height="100" viewBox="0 0 100 100">
	<rect x="0" y="0" width="100" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<rect x="10" y="10" width="150" height="150" rx="50" ry="30" fill="none" stroke="#28C86B" stroke-width="5" />
	<ellipse cx="60" cy="40" rx="50" ry="30" fill="none" stroke="#797979" stroke-dasharray="5 8" stroke-width="1" stroke-linecap="round" />
	<line x1="60" y1="40" x2="60" y2="10" stroke="#777" stroke-dasharray="5 8" stroke-width="2" stroke-linecap="round" />
	<text x="66" y="28" text-anchor="right" dominant-baseline="bottom" font-size="1rem" fill="#333">ry</text>
	<line x1="60" y1="40" x2="10" y2="40" stroke="#777" stroke-dasharray="5 8" stroke-width="2" stroke-linecap="round" />
	<text x="34" y="56" text-anchor="right" dominant-baseline="bottom" font-size="1rem" fill="#333">rx</text>
</svg>
<svg width="420" height="100" viewBox="0 0 420 100" style="margin-left:10px">
	<rect x="0" y="0" width="420" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<text x="15" y="10" dominant-baseline="middle" font-size="1rem" fill="#333">&lt;rect</text>
	<text x="35" y="30" dominant-baseline="middle" font-size="1rem" fill="#333">x="10" y="10"</text>
	<text x="35" y="50" dominant-baseline="middle" font-size="1rem" fill="#333">width="150" height="150"</text>
	<text x="35" y="70" dominant-baseline="middle" font-size="1rem" fill="#0E9F4B">rx="50" ry="30"</text>
	<text x="35" y="90" dominant-baseline="middle" font-size="1rem" fill="#333">fill="none" stroke="#28C86B" stroke-width="3" /></text>
</svg>

- center line (inline or outline으로 설정 불가)
- width 또는 height 0 일때 전체 사라짐 (border 남지 않음)

### Circles <br />
`<circle cx="" cy="" r="" fill="" stroke="" stroke-width="" />`
- 중심점 positioned `cx` `cy` / 반지름 `r`
- 반지름 0 일때 전체 사라짐 (border 남지 않음)

### Ellipses <br />
`<ellipse cx="" cy="" rx="" ry="" fill="" stroke="" stroke-width="" />`
- 중심점 positioned `cx` `cy` / 반지름 (horizontal, vertical) `rx` `ry`
- 반지름 0 일때 전체 사라짐 (border 남지 않음)

### Polygons <br />
`<polygon points="x,y x,y x,y" fill="" stroke="" stroke-width="" />`
- `points` 좌표 나열 (보기 편하게 comma 명시)  
	`,` 생략해도 최적화에 큰 영향 없음 (web servers gzip compression)

```html
<line x1="10" y1="20" x2="40" y2="20" stroke-width="2" stroke="#2e3f6f" />
<rect x="50" y="20" width="50" height="50" rx="10" ry="10" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
<rect x="110" y="20" width="0" height="50" rx="10" ry="10" fill="#87d79b" stroke="#2e3f6f" stroke-width="2" /> // disappear
<circle cx="150" cy="50" r="20" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
<ellipse cx="200" cy="50" rx="20" ry="40" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
<polygon points="250,20 250,100 300, 20" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
```
<svg width="320" height="120" viewBox="0 0 320 120">
	<rect x="0" y="0" width="320" height="120" fill="none" stroke="#aaa" stroke-width="1" />
	<line x1="10" y1="20" x2="40" y2="20" stroke-width="2" stroke="#2e3f6f" />
	<rect x="50" y="20" width="50" height="50" rx="10" ry="10" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
	<rect x="110" y="20" width="0" height="50" rx="10" ry="10" fill="#87d79b" stroke="#2e3f6f" stroke-width="2" /> // disappear
	<circle cx="150" cy="50" r="20" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
	<ellipse cx="200" cy="50" rx="20" ry="40" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
	<polygon points="250,20 250,100 300, 20" fill="#879bd7" stroke="#2e3f6f" stroke-width="2" />
</svg>

### Path
- `d` : Data
- `M` : Move (Start x,y)
- `L` : Line(2 Points)
```html
<path
	d="
		M 10,10  < Move Start
		L 90,90  < Line
	"
/>
```
<svg width="100" height="100" viewBox="0 0 100 100">
	<rect x="0" y="0" width="100" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<path d="M10 10 L90 90" stroke="#2e3f6f" stroke-width="2" />
</svg>

- `Q` : Quadratic Bezier curves (3 Points) : 2차 베지어 곡선
```html
<path
	d="
		M 10,10  < Point 1
		Q 10,90  < Point 2 (Curve Point)
			90,90  < Point 3
	"
/>
```
<svg width="100" height="100" viewBox="0 0 100 100">
	<rect x="0" y="0" width="100" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,10
			Q 10,90
				90,90
		"
		fill="none" stroke="#2e3f6f" stroke-width="2"
	/>
</svg>

- `C` : Cubic Bezier curves (4 Points) : 3차 베지어 곡선
```html
<path
	d="
		M 10,10  < Point 1
		C 10,90  < Point 2 (Curve Point 1)
			90,10  < Point 3 (Curve Point 2)
			90,90  < Point 4
	"
/>
```
<svg width="100" height="100" viewBox="0 0 100 100">
	<rect x="0" y="0" width="100" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,10
			C 10,90
				90,10
				90,90
		"
		fill="none" stroke="#2e3f6f" stroke-width="2"
	/>
</svg>

- `T` : Smooth Quadratic Bezier curves (`Q` + 1 point)
<svg width="200" height="100" viewBox="0 0 200 100">
	<rect x="0" y="0" width="200" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,10
			Q 10,90
				50,50
			Q 100,50
				90,90
		"
		fill="none" stroke="#2e3f6f" stroke-width="2"
	/>
	<text x="120" y="20" dominant-baseline="middle" font-size="0.75rem" fill="#222">M 10,10</text>
	<text x="120" y="35" dominant-baseline="middle" font-size="0.75rem" fill="#0E9F4B">Q 10,90</text>
	<text x="134" y="50" dominant-baseline="middle" font-size="0.75rem" fill="#222">50,50</text>
	<text x="120" y="65" dominant-baseline="middle" font-size="0.75rem" fill="#9F1A0E">Q 100,50</text>
	<text x="134" y="80" dominant-baseline="middle" font-size="0.75rem" fill="#222">90,90</text>
	<path d="M10,10 10,90 50,50 100,50 90,90" fill="none" stroke-width="1" stroke="#888" stroke-dasharray="4 6" />
	<circle cx="10" cy="90" r="2" fill="#0E9F4B" />
	<circle cx="100" cy="50" r="2" fill="#9F1A0E" />
</svg>
<svg width="200" height="100" viewBox="0 0 200 100">
	<rect x="0" y="0" width="200" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,10
			Q 10,90
				50,50
			T	90,90
		"
		fill="none" stroke="#2e3f6f" stroke-width="2"
	/>
	<text x="120" y="20" dominant-baseline="middle" font-size="0.75rem" fill="#222">M 10,10</text>
	<text x="120" y="35" dominant-baseline="middle" font-size="0.75rem" fill="#0E9F4B">Q 10,90</text>
	<text x="134" y="50" dominant-baseline="middle" font-size="0.75rem" fill="#222">50,50</text>
	<text x="120" y="65" dominant-baseline="middle" font-size="0.75rem" fill="#41098F">T 90,90</text>
	<circle cx="10" cy="90" r="1.5" fill="#0E9F4B" />
</svg>

- `S` : Smooth Cubic Bezier curves (`C` + 2 points)
<svg width="200" height="100" viewBox="0 0 200 100">
	<rect x="0" y="0" width="200" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,10
			C 50,20
				10,70
				50,60
		"
		fill="none" stroke="#2e3f6f" stroke-width="2"
	/>
	<text x="120" y="20" dominant-baseline="middle" font-size="0.75rem" fill="#222">M 10,10</text>
	<text x="120" y="35" dominant-baseline="middle" font-size="0.75rem" fill="#0E9F4B">C 50,20</text>
	<text x="134" y="50" dominant-baseline="middle" font-size="0.75rem" fill="#9F1A0E">10,70</text>
	<text x="134" y="65" dominant-baseline="middle" font-size="0.75rem" fill="#222">50,60</text>
	<path d="M10,10 50,20 10,70 50,60" fill="none" stroke-width="1" stroke="#888" stroke-dasharray="4 6" />
	<circle cx="50" cy="20" r="2" fill="#0E9F4B" />
	<circle cx="10" cy="70" r="2" fill="#9F1A0E" />
</svg>
<svg width="200" height="100" viewBox="0 0 200 100">
	<rect x="0" y="0" width="200" height="100" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,10
			C 50,20
				10,70
				50,60
			S 60,80
				90,90
		"
		fill="none" stroke="#2e3f6f" stroke-width="2"
	/>
	<text x="120" y="15" dominant-baseline="middle" font-size="0.75rem" fill="#222">M 10,10</text>
	<text x="120" y="30" dominant-baseline="middle" font-size="0.75rem" fill="#0E9F4B">C 50,20</text>
	<text x="134" y="45" dominant-baseline="middle" font-size="0.75rem" fill="#9F1A0E">10,70</text>
	<text x="134" y="60" dominant-baseline="middle" font-size="0.75rem" fill="#222">50,60</text>
	<text x="122" y="75" dominant-baseline="middle" font-size="0.75rem" fill="#41098F">S 60,80</text>
	<text x="132" y="90" dominant-baseline="middle" font-size="0.75rem" fill="#222">90,90</text>
	<circle cx="50" cy="20" r="1.5" fill="#0E9F4B" />
	<circle cx="10" cy="70" r="1.5" fill="#9F1A0E" />
	<circle cx="60" cy="80" r="1.5" fill="#41098F" />
</svg>

- `A` : Arcs `[rx],[ry] [rotation] [large-arc-flag] [sweep-flag] [end-x],[end-y]`
	- [rx], [ry] 반지름 : <u>반지름 길이</u>가 <u>시작-끝점 길이</u>보다 짧을 경우에도 비율(rx : ry) 계산하여 그림
	- [rotation] `0` deg
	- [large-arc-flag] `0`(short path) : `1`(long path) : 길이가 정확히 같으면 달라지지 않음
	- [sweep-flag] `0`(counter-clockwise) : `1`(clockwise)
	- [end-x], [end-y] 끝점
```html
<path
	d="
		M 10,20
		L 30 20 // 시작점
		A 30,30 0 0 0 60,70
	"
/>
```
<svg width="200" height="90" viewBox="0 0 200 90">
	<rect x="0" y="0" width="200" height="90" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,20
			L 30 20
			A 30,30 0 0 0 60,70
		"
		fill="none" stroke="#2e3f6f" stroke-width="3"
	/>
	<circle cx="51" cy="41" r="30" fill="none" stroke="#4bdf6c" stroke-dasharray="4 6" stroke-width="1" stroke-linecap="round" />
	<circle cx="39" cy="49" r="30" fill="none" stroke="#bbb" stroke-dasharray="4 6" stroke-width="1" stroke-linecap="round" />
	<text x="84" y="20" dominant-baseline="middle" font-size="0.75rem" fill="#222">M 10,20</text>
	<text x="85" y="40" dominant-baseline="middle" font-size="0.75rem" fill="#222">L 30,20</text>
	<text x="84" y="60" dominant-baseline="middle" font-size="0.75rem" fill="#222">A 30,30 0 0 0 60,70</text>
</svg>
<svg width="200" height="90" viewBox="0 0 200 90">
	<rect x="0" y="0" width="200" height="90" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,20
			L 30 20
			A 30,30 0 1 0 60,70
		"
		fill="none" stroke="#2e3f6f" stroke-width="3"
	/>
	<circle cx="51" cy="41" r="30" fill="none" stroke="#4bdf6c" stroke-dasharray="4 6" stroke-width="1" stroke-linecap="round" />
	<circle cx="39" cy="49" r="30" fill="none" stroke="#bbb" stroke-dasharray="4 6" stroke-width="1" stroke-linecap="round" />
	<text x="86" y="40" dominant-baseline="middle" font-size="0.75rem" fill="#222">large-arc-flag</text>
	<text x="86" y="60" dominant-baseline="middle" font-size="0.75rem" fill="#222">A 30,30 0 1 0 60,70</text>
</svg>
<svg width="200" height="90" viewBox="0 0 200 90">
	<rect x="0" y="0" width="200" height="90" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 10,20
			L 30 20
			A 30,30 0 0 1 60,70
		"
		fill="none" stroke="#2e3f6f" stroke-width="3"
	/>
	<circle cx="51" cy="41" r="30" fill="none" stroke="#4bdf6c" stroke-dasharray="4 6" stroke-width="1" stroke-linecap="round" />
	<circle cx="39" cy="49" r="30" fill="none" stroke="#bbb" stroke-dasharray="4 6" stroke-width="1" stroke-linecap="round" />
	<text x="86" y="40" dominant-baseline="middle" font-size="0.75rem" fill="#222">sweep-flag</text>
	<text x="86" y="60" dominant-baseline="middle" font-size="0.75rem" fill="#222">A 30,30 0 0 1 60,70</text>
</svg>

- `Z` : 시작점과 join
```html
<path
	d="
		M 20,20
		A 1,1 0 0 0 60,50
		Z
	"
	fill="none" stroke="#2e3f6f" stroke-width="2"
/>
```
<svg width="80" height="80" viewBox="0 0 80 80">
	<rect x="0" y="0" width="80" height="80" fill="none" stroke="#aaa" stroke-width="1" />
	<path
		d="
			M 20,20
			A 1,1 0 0 0 60,50
			Z
		"
		fill="none" stroke="#2e3f6f" stroke-width="2"
	/>
</svg>

- `m`, `l`, `q`, `c`, `t`, `s`, `a` : 소문자
	- 상대좌표 (Relative)

## Draw Trick
> `stroke-dasharray` `stroke-dashoffset` 속성으로 Draw animation
- `stroke-dasharray`(dash 길이 + 간격) = `stroke-dashoffset`

```css
element{
	stroke-dasharray: 도형 둘레;
	animation:elementDraw 3s infinite alternate;
}
@keyframes elementDraw1{
	0%{stroke-dashoffset: 0;}
	100%{stroke-dashoffset: 도형 둘레;}
}
```
### 1. 도형 둘레 구한 후 지정 `element.getTotalLength()`
```html
<polygon points="100,32 116,83 170,83 126,116 144,168 100,135 56,168 73,116 30,83 83,83" fill="none" stroke="#2e3f6f" stroke-width="2" />
```
```javascript
const polygonLength = document.querySelector('polygon').getTotalLength();
// polygonLength: 544
```
```css
polygon{
	stroke-dasharray: 544; //polygonLength
	animation:elementDraw1 3s infinite alternate;
}
@keyframes elementDraw1{
	0%{stroke-dashoffset: 544;}
	100%{stroke-dashoffset: 0;}
}
```
<svg width="200" height="200" viewBox="0 0 200 200">
	<polygon class="animation_getTotalLength" points="100,32 116,83 170,83 126,116 144,168 100,135 56,168 73,116 30,83 83,83" fill="none" stroke="#2e3f6f" stroke-width="2" />
</svg>
<style>
.animation_getTotalLength{
	stroke-dasharray: 544;
	animation:elementDraw1 3s infinite alternate;
}
@keyframes elementDraw1{
	0%{stroke-dashoffset: 544;}
	100%{stroke-dashoffset: 0;}
}
</style>

### 2. 길이 재정의 `pathLength`
```html
<polygon pathLength="100" points="100,32 116,83 170,83 126,116 144,168 100,135 56,168 73,116 30,83 83,83" fill="none" stroke="#2e3f6f" stroke-width="2" />
```
```css
polygon{
	stroke-dasharray: 100; // 실제 길이 544지만 100으로 재정의
	animation:elementDraw2 3s infinite alternate;
}
@keyframes elementDraw2{
	0%{stroke-dashoffset: 100;}
	100%{stroke-dashoffset: 0;}
}
```
<svg width="200" height="200" viewBox="0 0 200 200">
	<polygon class="animation_pathLength" pathLength="100" points="100,32 116,83 170,83 126,116 144,168 100,135 56,168 73,116 30,83 83,83" fill="none" stroke="#2e3f6f" stroke-width="2" />
</svg>
<style>
.animation_pathLength{
	stroke-dasharray: 100;
	animation:elementDraw2 3s infinite alternate;
}
@keyframes elementDraw2{
	0%{stroke-dashoffset: 100;}
	100%{stroke-dashoffset: 0;}
}
</style>

## 3. Inline SVG Sprites
> img Sprites 비슷 &rightarrow; img는 HTTP2에서 해결 : 여러 파일 병렬 전송
- `<defs>` 나중에 사용할 SVG 그래픽 객체를 저장 (직접 렌더링 되지 않고 `<use>`로 참조하여 렌더링)
- `<symbol>` 인스턴스화 할 SVG 그래픽 템플릿 객체 정의
- `<use>` SVG 문서 내에서 노드를 가져와 복제

### 예시 1
```html:title=sprite.svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
		<symbol id="fileAdd">
			<path d="M2.5 5V1.5C2.5 1.23478 2.60536 0.98043 2.79289 0.792893C2.98043 0.605357 3.23478 0.5 3.5 0.5H10L13.5 4V12.5C13.5 12.7652 13.3946 13.0196 13.2071 13.2071C13.0196 13.3946 12.7652 13.5 12.5 13.5H7.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M3.5 7.5V13.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M0.5 10.5H6.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
		</symbol>
    <symbol id="fileRemove">
			<path d="M2.5 7.5V1.5C2.5 1.23478 2.60536 0.98043 2.79289 0.792893C2.98043 0.605357 3.23478 0.5 3.5 0.5H10L13.5 4V12.5C13.5 12.7652 13.3946 13.0196 13.2071 13.2071C13.0196 13.3946 12.7652 13.5 12.5 13.5H6.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M0.5 10.5H5.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
		</symbol>
  </defs>
</svg>
```
```html:title=index.html
<head>
  <link rel="preload" href="sprite.svg" as="image" type="image/svg+xml">
</head>
<svg>
	<use href="#fileRemove" />
</svg>
```
- `preload` 로 파일 캐시, 성능 향상
- `xmlns:xlink="http://www.w3.org/1999/xlink"` SVG는 XML 기반이기 때문에 독립된 SVG파일(sprite.svg)일 경우 최상단에 정의 

### 예시 2 : CustomElements [사용자 정의 요소](/web-apis/#사용자-정의-요소-custom-elements-api)
```js:title=k-svg.js
const ksvgSprite = ()=>{
	if (document.getElementById('ksvgSprite')) return;
	const sprite = document.createElement('div');
	sprite.id = "ksvgSprite";
	sprite.style.display="none";
	sprite.innerHTML=`
		<svg>
			<defs>
				...
			</defs>
		</svg>
	`
	document.body.appendChild(sprite);
}

class KSvg extends HTMLElement{
	connectedCallback(){
		ksvgSprite();

		const icon = this.getAttribute('icon');
		const size = this.getAttribute('size');
		if (!icon || !size) return false;
		
		const numericSize = parseInt(size, 10);
		this.style.display = "inline-block"
		this.style.width = numericSize + 'px';
		this.style.height = numericSize + 'px';
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute('width', numericSize);
		svg.setAttribute('height', numericSize);
		svg.setAttribute('fill', 'none');
		svg.setAttribute('viewBox', `0 0 14 14`);
		const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
		use.setAttribute("href", `#${icon}`);
		use.setAttribute("xlink:href", `#${icon}`);
		svg.appendChild(use);
		this.appendChild(svg);
	}
}
customElements.define('k-svg', KSvg);
```
```html:title=index.html
<k-svg icon="fileRemove" size="42"></k-svg>
```


* * *
- <https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/>
- <https://www.joshwcomeau.com/svg/interactive-guide-to-paths>
- <https://benadam.me/thoughts/react-svg-sprites/>