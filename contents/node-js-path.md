---
date: '2026-05-01'
title: 'Node.js 파일시스템과 경로'
categories: ['Runtime']
summary: 'ESM에서 파일 경로 처리'
thumbnail: './node-js-path.png'
---

`path` 파일 경로 계산 | &nbsp; 
:----------------|:-----
`path.join()`    | 여러 경로 조각 OS에 맞게 합침
`path.resolve()` | 절대 경로 생성
`path.dirname()` | 경로에서 dir 부분만 반환
`path.basename(경로)` <br /> `path.basename(경로, '.확장자)`| 전체 경로에서 마지막부분(파일 명)만 추출 <br /> 파일명만 추출
`path.extname()` | 파일 확장자만 추출

`path` ES Module에서 사용시 | &nbsp;
:---------------|:--------------------
`import.meta.url` | 현재 모듈시스템 URL
`fileURLToPath()` | URL 형태를 OS가 이해하는 경로로 변환 <br /> `file:///Users/...` &rightarrow; `/Users/...`
`pathToFileURL()` | 파일 경로를 URL로 변환

- ES Module에서 보안, 표준 준수로 `__dirname` `__filename`을 제공하지 않기때문에 표준 공식 사용

`fs` 파일 동기적 처리 | &nbsp;
:--------------------|:-----
`fs.readFileSync()`  | 파일 내용 읽기
`fs.writeFileSync()` | 파일 만들기/내용 쓰기
`fs.readdirSync()`   | 폴더 안의 파일 목록 가져오기
