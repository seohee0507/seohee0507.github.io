---
date: '2026-02-20'
title: 'Tailwind '
categories: ['Modern Stack']
summary: 'Tailwind v3 v4 비교'
thumbnail: './gatsby-starter.jpg'
---

&nbsp; | v3 | v4
:---|:--- |:---
`tailwind.config.ts`| `theme:{ extend:{...} }` | 선택 옵션
import|`@tailwind base;`, `components;`, `utilities;` | `@import "tailwindcss";`
&nbsp;| autoprefixer, postcss-import 별도 설치 | prefix, import 자동 내장


## v4
```css:title=index.css
@import "tailwindcss";

@theme{
	/* 테마 확장 */
}

@layer base{
	/* 기본값 설정 */
}
@layer components {
	/* 컴포넌트화 */
}
@layer utilities {
	/* 특수 유틸리티 */
}
```

### `@theme` 테마 변수
```css:title=index.css
@theme{
	--font-primary: "Pretendard", sans-serif;
	--color-brand-500: oklch(60% 0.2 200); // 새로운 테마 변수 정의
	--breakpoint-sm: 30rem; // 테마 변수 재정의
	--leading-snug: 1.3 // css 변수 직접 재정의
}
```
```tsx
<div class="border-brand-500 border-1"></div>
<div style={{backgroundColor:'var(--color-brand-500)'}}></div>
```
- Tailwind 유틸리티 클래스[(theme 변수 네임스페이스)](https://tailwindcss.com/docs/theme#theme-variable-namespaces) 자동 생성, 일반 css 변수로도 정의
- 반드시 최상위에 정의 : 다른 선택자, 미디어 쿼리 안에 중첩할 수 없도록 위 전용 구문(`@theme` syntax) 사용
- 유틸리티 클래스가 필요 없는 일반 css 변수는(특정 요소 단순 계산용 변수) `:root` 사용

### `@layer base` 스타일 초기화: 전역으로 적용될 기본 스타일 정의
```css:title=index.css
@layer base{
	body{
		@apply text-gray-900;
		font-family: var(--font-primary);
	}
}
```
### `@layer components` 재사용: 반복되는 디자인 패턴
```css:title=index.css
@layer components{
	.btn-brand{
		@apply px-4 py-2;
	}
}
```
### `@layer utilities` 가장 높은 우선순위: 특정 목적을 위한 단일 기능 클래스
```css:title=index.css
@layer utilities{
	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
}
```
> 적용 순서: properties &rightarrow; theme &rightarrow; base &rightarrow; componenets &rightarrow; utilities

## oklch 컬러 팔레트 권장
> Lightness(밝기) Chroma(채도) Hue(색조 0~360)
- [변환](https://oklch.com/)
- 색상 일관성 있게 유지하기 쉬움

```css
:root{
	--brand-400: oklch(10% 0.2 15);
	--brand-500: oklch(20% 0.2 15);
	--brand-600: oklch(30% 0.2 15);
}
```
- 밝기만 수정, 채도 색조 고정


## [Vite](https://tailwindcss.com/docs/installation/using-vite)
```ts:title=vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
		tailwindcss()
	],
})
```

* * *

- https://tailwindcss.com/
