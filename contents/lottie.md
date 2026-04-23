---
date: '2025-09-26'
title: 'Lottie'
categories: ['Visual UI']
summary: 'Lottie dotLottie 비교'
thumbnail: './lottie.png'
---

> 에어비엔비에서 개발한 JSON 기반 애니메이션 오픈 소스 라이브러리  
- Adobe After Effects 애니메이션을 JSON 기반 데이터로 추출
- 벡터 기반

### Lottie Player [Web Component](https://github.com/LottieFiles/lottie-player)
```html
<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player autoplay loop mode="normal" src="ex.json"></lottie-player>
```

## [dotLottie](https://github.com/LottieFiles/dotlottie-web)
> 새로운 압축 포맷 (파일.lottie)
- 하나 이상의 Lottie 파일과 관련 리소스를 단일 파일로 통합, 압축
- 파일끼리 아카이빙 가능

### dotLottie Player [dotLottie-web](https://developers.lottiefiles.com/docs/dotlottie-player/dotlottie-web)
```html
<canvas id="canvas" width="300" height="300"></canvas>
<script type="module">
	import { DotLottie } from "https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm";

	new DotLottie({
		autoplay: true,
		loop: true,
		canvas: document.getElementById("canvas"),
		src: "ex.lottie", // or .json file
	});
</script>
```

## [Lottie Interactivity](https://lottiefiles.com/interactivity)
> Event 라이브러리
```html
<script src="https://unpkg.com/@lottiefiles/lottie-interactivity@latest/dist/lottie-interactivity.min.js"></script>
```
