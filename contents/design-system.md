---
date: '2026-04-20'
title: 'Design System'
categories: ['Design']
summary: 'Design.md 작성법과 UX Writing 정리'
thumbnail: './gatsby-starter.jpg'
---

## Design System
> 디자인 가이드라인 (색상, 타이포그래피, 그림자, 해야할 것, 하면 안되는 것) 디자인 공통 언어

### 컴포넌트 속성
1. Variant : `primary` `secondary` `outline`
2. State : `default` `hover` `active` `disabled`
3. Boolean : `isLoading` `hasError`
4. Size : `sm` `md` `lg`

- 상태와 타입 분리 <br />
	<span style="display:inline-block;padding:2px 5px;font-size:13px;border-radius:3px;color:#B1380B;background:#ffded2;">Bad</span> `<Button button-status="loading" />` <br />
	<span style="display:inline-block;padding:2px 5px;font-size:13px;border-radius:3px;color:#3D7317;background:#d2e9c1;">Good</span> `<Button variant="primary" state="isLoading" />`

- 수치 사용 지양 <br/>
	<span style="display:inline-block;padding:2px 5px;font-size:13px;border-radius:3px;color:#B1380B;background:#ffded2;">Bad</span> `p-[20px]` <br />
	<span style="display:inline-block;padding:2px 5px;font-size:13px;border-radius:3px;color:#3D7317;background:#d2e9c1;">Good</span> `size="lg"`

## Design.md


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
