---
date: '2026-04-20'
title: 'Design System'
categories: ['Design']
summary: 'Design.md 작성법과 UX Writing 정리'
thumbnail: './design-system.png'
---

## Design System
> 디자인 가이드라인 (색상, 타이포그래피, 그림자, 해야할 것, 하면 안되는 것) 디자인 공통 언어

### 컴포넌트 속성
1. Variant : `primary` `secondary` `outline`
2. State : `default` `hover` `active` `disabled`
3. Boolean : `isLoading` `hasError`
4. Size : `sm` `md` `lg`

- 상태와 타입 분리 <br />
	<span class="badge-danger">Bad</span> `<Button button-status="loading" />` <br />
	<span class="badge-success">Good</span> `<Button variant="primary" state="isLoading" />`

- 수치 사용 지양 <br/>
	<span class="badge-danger">Bad</span> `p-[20px]` <br />
	<span class="badge-success">Good</span> `size="lg"`

## Design.md

> 표준화된 형식을 통해 디자인 시스템, 스타일 가이드, 컴포넌트 사양을 AI에게 명확하게 전달

- **YAML front matter**에 머신러닝이 읽을 수 있는 디자인 토큰 포함되어 일관성을 강제하기 위한 정밀한 값
- **Markdown body**는 사람이 읽을 수 있는 디자인 근거 제공

### 디자인 토큰 (Design tokens)
> 문서 최상단에 YAML front matter로 정의
- 이 블록은 반드시 `---` `---` 사이에 작성
- Figma 변수 및 Tailwind 테마 설정(theme configs)과 쉽게 상호 변환

```markdown
---
version: <string>          # optional, current version: "alpha"
name: <string>
description: <string>      # optional
colors:
  <token-name>: <Color>
typography:
  <token-name>: <Typography>
rounded:
  <scale-level>: <Dimension>
spacing:
  <scale-level>: <Dimension | number>
components:
  <component-name>:
    <token-name>: <string | token reference>
---
```

### Sections
- 관련 없는 Section은 색량 가능하지만 순서는 아래 순서로 나열
&nbsp; | Section | Aliases (허용되는 별칭)
:------|:-----------------|:-------
1      | Overview         | Brand & Style
2      | Colors           | &nbsp;
3      | Typography       | &nbsp;
4      | Layout           | Layout & Spacing
5      | Elevation & Depth | Elevation
6      | Shapes           | &nbsp;
7      | Components       | &nbsp;
8      | Do's and Don'ts  | &nbsp;

1. Overview : 전체적인 설명. 브랜드 성격, 타겟 사용자. 기초적인 문맥 (Foundational context)
2. Colors : 최소한 primary 는 반드시 정의
3. Typography : Semantic role(Headline, body) 단계와 크기 variant(sm, md, lg) 정의
4. Layout : 그리드 모델, 간격 스케일(scale 4px 배수, dense, base)
5. Elevation & Depth : 시각적 계층 구조 shadow, flat 디자인의 경우 border, color tone, color 대비
6. Shapes : 요소 형태 (radius, border)
7. Components : Component atoms 스타일 가이드 (button, chips, list, input, checkbox, radio)
8. Do's and Don'ts : 에이전트가 디자인 생성할 때 일관성을 잃지 않도록 하는 가이드라인
[ERP Dashboard 서비스의 Design.md 예시](../static/Design.txt)


## UX Writing

상태 | &nbsp; | &nbsp; | &nbsp;
:------|:------|:-----|:-----
**Status** | 단계 | String | `pending` `delivered` `done`
**State**  | 가변적 상황/데이터 | Boolean | `isChecked` `isOpen`
**Stats**  | 통계/수치/데이터 요약 | Number | 방문자 수, 능력치(Str,HP), 시스템 리소스 사용 량

Red Semantic | &nbsp; | &nbsp;
:----------------|:---------------------|:---------------------
**Error**        | 폼 검증 실패, 통신 장애 | &nbsp;
**Danger**       | 경고 | NextUI
**Destructive**  | 삭제, 초기화, 탈퇴 | Radix UI, Apple Ghidelines
**Critical**     | 심각도 | &nbsp;

* * *

- [stitch DESIGN.md](https://stitch.withgoogle.com/docs/design-md/specification)
