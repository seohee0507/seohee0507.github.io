---
date: '2026-03-22'
title: 'Gatsby Markdown table 가로스크롤 추가하기'
categories: ['Modern Stack']
summary: 'remark AST 이용하여 table wrapper 추가'
thumbnail: './gatsby-starter.jpg'
---

## 커스텀 로컬 플러그인
> 기존 gatsby-transformer-remark 플러그인에 unist-util-visit 라이브러리 사용

### 1. 플러그인 추가
```js:title=plugins/gatsby-remark-table-wrapper/index.js
const visit = require('unist-util-visit')

module.exports = ({ markdownAST }) => {
  visit(markdownAST, 'table', (node, index, parent) => {
    const wrapper = {
      type: 'tableWrapper',
      data: {
        hName: 'div',
        hProperties: {
          className: ['table-wrapper']
        },
      },
      children: [JSON.parse(JSON.stringify(node))],
    }
    parent.children.splice(index, 1, wrapper)

    return [visit.SKIP, index + 1]
  })

  return markdownAST
}
```
- `unist-util-visit` : AST 탐색할때 사용 (기존에 사용하고있는 패키지가 CommonJS)  
	`visit(tree, '찾을 노드 타입', (node, index, parent)=>{})`
- `[visit.SKIP, index + 1]` : table > tableWrapper 교체 후 skip, index + 1 부터 다시 시작

```js:title=plugins/gatsby-remark-table-wrapper/package.json
{
  "name": "gatsby-remark-table-wrapper",
  "main": "index.js"
}
```

### 2. 플러그인 등록
```js:title=gatsby-config.js
{
	resolve: `gatsby-transformer-remark`,
	options: {
		plugins: [
			`gatsby-remark-table-wrapper`,
			...
		]
	}
}
```

### 3. css 테이블 스타일 추가
```css
.table-wrapper{
	overflow-x: auto;
  -webkit-overflow-scrolling: touch;
	table {
		min-width: 600px;
	}
}
```