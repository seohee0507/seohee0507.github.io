---
date: '2025-11-25'
title: 'Interactive Web'
categories: ['Visual UI']
summary: 'R3F, Framer Motion'
thumbnail: './interactive-web.png'
---

## [React Three Fiber(R3F)](https://r3f.docs.pmnd.rs/getting-started/introduction)
> React에서 Three.js를 사용할 수 있게 해주는 Library
```jsx
<Canvas orthographic
	camera={{
		position: [0, 0, 100],
		zoom: 100
	}}
>
	<mesh></mesh>
	<directionalLight intensity={3} position={[0, 0.1, 1]} />
</Canvas>
```
- `<Canvas>` : 3D Scene 렌더링 기본 컨테이너
	- Scene: 오브젝트, 조명, 카메라 배치되는 공간
	- perspective : 원근법 / orthographic : 직교법
- `<mesh>` : Three.js 물체 기본 단위
- `<directionalLight>` : 조명
	- Ambient Light: 부드러운 전체 조명
	- Directional Light: 태양광 강한 그림자

## [@react-three/drei](https://drei.docs.pmnd.rs/getting-started/introduction)
> React Three fiber 컴포넌트, 플러그인 패키지  
> 애니메이션, 조명, 카메라 설정 단순화

- `<OrbitControls>` : 기본 카메라 이동
- `<CameraControls>` : 부드러운 카메라 이동, 정밀한 제어
- `<Environment>` : 내장된 배경 (apartment, city, dawn, forest ...)

[drei 컴포넌트 테스트](https://drei.pmnd.rs/)

## [leva](https://github.com/pmndrs/leva)
> 설정값 조정 GUI
```jsx
import { useControls } from "leva";

const materialProps = useControls({
	...
})
```

## [Framer Motion](https://motion.dev/docs/react)
> React 오픈소스 Animation Library

### Framer Componenet
```jsx
import { motion } from "framer-motion";

<motion.div className="myClass" />
```
- 모든 HTML 및 SVG 요소
- `<motion.div>` `<motion.span>` `<motion.circle>`

### Framer Componenet Props
```jsx
const MyComponent = ()=>{
	const [isValue, setIsValue] = useState(false);

	const someVar = {
		hover: (isValue) =>({
			scale: isValue? 1 : 1.5
		}),
		reset:{
			scale: 1
		}
	}

	return(
		<motion.div
			initial="reset"
			whileHover="hover"
			variants={someVar}
			custom={isValue}
			onClick={()=> setIsValue(true)}
		>
		</motion.div>
	)
}
```
- initial: 초기상태
	- `x`, `y`, `rotate` ...
- animate: 목표위치
	- `animate(element, {목표}, {duration})`  
		`animate("div", {rotate: 90, x: 20 ... }, {duration:0})`
- transition: 전환 모습
	- `tween` : default, `spring`, `inertia`
	- `ease`, `delay`, `duration`
- variants: 변수, 함수정의 &rightarrow; 객체 반환
	- 함수 정의 시 하나의 인수 받고 객체 반환할 수 있음
	- `custom` 통해 prop 전달



[Framer 튜토리얼](https://blog.maximeheckel.com/posts/guide-animations-spark-joy-framer-motion/)  
[Framer Motion 예제](https://motion.dev/examples)


## [v0](https://v0.app/)
> 자연어로 3D 디자인

- 3D Scene 에 Object(Mesh), Camera 생성
- Mesh, Material, 애니메이션, interaction 정의
	- Mesh: Object 형태 - spheres, boxes, planes
	- Material: 색상, 질감, 반사 속성

### 접근성 제공 (Accessibility)
- `스크린 리더 호환성 위해 대체 텍스트(alt text) 추가`  
	&rightarrow; *어두운 배경 위에 은색 금속 재질의 구체가 중력에 의해 바닥으로 떨어진 뒤 반복적으로 튕기는 인터랙티브 3D 씬입니다. 마우스 드래그로 카메라 각도를 조절하고, 스크롤로 확대 및 축소할 수 있습니다.*

### HTML 결합
- ` ...section 만들고 HTML을 사용해 call to action 버튼 추가`

### 후처리 효과 추가
- 시각적 품질 높이기
	- Bloom, Depth of Field, Motion Blur
- `Apply a bloom effect to the brightest parts of the scene and add depth of field to focus on the main object.`
	

* * *
https://blog.olivierlarose.com/

https://vercel.com/blog/add-3d-to-your-web-projects-with-v0-and-react-three-fiber

