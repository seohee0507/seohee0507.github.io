---
date: '2025-09-29'
title: 'Gatsby 검색기능'
categories: ['Modern Stack']
summary: 'Gatsby에 Fuse.js 플러그인 추가'
thumbnail: './gatsby-fuse-js.png'
---

## [Fuse.js](https://www.fusejs.io/)
> Powerful, lightweight fuzzy-search library, with zero dependencies.  
> 주어진 쿼리와 정확히 일치하는 것이 아닌 주어진 패턴과 거의 동일한 문자열을 찾는 기술

## [gatsby-plugin-fusejs](https://www.gatsbyjs.com/plugins/gatsby-plugin-fusejs/)
> 빌드 시 인덱스 생성(gatsby-plugin-fusejs) &rightarrow; 생성한 인덱스를 런타임(React hook)에 fuse.js 사용

### fusejs node 생성 (index.json)
```js:title=gatsby-config.js
module.exports = {
	plugins: [
    {
      resolve: `gatsby-plugin-fusejs`,
      options: {
				//index.json 만들 쿼리
        query: `
					{
						allMarkdownRemark {
							nodes {
								id
								fields { slug }
								rawMarkdownBody
								frontmatter {
									title
								}
							}
						}
					}
				`,

				// index.json 만들 데이터
        keys: ['title', 'body'],

				// graphql 반환된 데이터 정규화
        normalizer: ({ data }) =>
          data.allMarkdownRemark.nodes.map(node => ({
            id: node.id,
						slug: node.fields.slug,
            title: node.frontmatter.title,
            body: node.rawMarkdownBody,
          })),
      },
    },
	]
}
```

### Lazy Loading
- 실제 검색 키워드가 입력될 때 다운로드

```tsx:title=Search.tsx
export function Search() {
  const data = useStaticQuery<FuseDataQuery>(graphql`
    {
      fusejs {
        publicUrl
      }
    }
  `)
	const [query, setQuery] = useState<string>('')
  const [fusejs, setFusejs] = useState<FusejsData | null>(null)
  const result = useGatsbyPluginFusejs(query, fusejs)
	const fetching = useRef<boolean>(false)

	useEffect(() => {
    if (!fetching.current && !fusejs && query) {
      fetching.current = true

      fetch(data.fusejs.publicUrl)
        .then((res) => res.json())
        .then((json) => setFusejs(json))
    }
  }, [fusejs, query])
	
	return (
		...
	)
}

```

### Reuseing the search data
- 컴포넌트 마운트 될 때마다 가져오는 것 방지
- 최상위에서 다운받은 후 파싱 (index.tsx &rightarrow; Search.tsx)
```tsx:title=index.tsx
export interface FuseItem {
  id: string
  title: string
  slug: string
}

export interface AppContextType {
  fusejs: FuseItem[] | null
  setFusejs: Dispatch<SetStateAction<FuseItem[] | null>>
}

export const AppContext = createContext<AppContextType>({
  fusejs: null,
  setFusejs: () => {},
})

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FunctionComponent<AppProviderProps> = ({
  children,
}) => {
  const [fusejs, setFusejs] = useState<FuseItem[] | null>(null)

  return (
    <AppContext.Provider value={{ fusejs, setFusejs }}>
      {children}
    </AppContext.Provider>
  )
}
```
```js:title=gatsby-browser.js
import { AppProvider } from './src/pages/index'
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>
}
```
```tsx:title=Search.tsx
import { graphql, Link, useStaticQuery } from 'gatsby'
import { useContext, useEffect, useRef, useState } from 'react'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { AppContext, FuseItem } from '../../pages/index'

type FuseDataQuery = {
  fusejs: {
    publicUrl: string
  }
}
type FuseResult<T> = {
  item: T
}

export function Search() {
  const data = useStaticQuery<FuseDataQuery>(graphql`
    {
      fusejs {
        publicUrl
      }
    }
  `)
  const [query, setQuery] = useState<string>('')
  const { fusejs, setFusejs } = useContext(AppContext)
  //const result: FuseResult<FuseItem>[] = useGatsbyPluginFusejs(query, fusejs)
	const result: FuseResult<FuseItem>[] = useGatsbyPluginFusejs(query, fusejs, { // Options
    ignoreLocation: true,
    threshold: 0.2,
  })
  const fetching = useRef<boolean>(false)

	// Lazy-loading the search data
  useEffect(() => {
    if (!fetching.current && !fusejs && query) {
      fetching.current = true

      fetch(data.fusejs.publicUrl)
        .then(res => res.json())
        .then((json: FuseItem[]) => setFusejs(json))
    }
  }, [fusejs, query])

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <SearchResults>
        {result.map(({ item }: FuseResult<FuseItem>) => (
          <SearchResultItem key={item.id}>
            <Item to={item.slug}>{item.title}</Item>
          </SearchResultItem>
        ))}
      </SearchResults>
    </SearchWrapper>
  )
}

export default Search
```
- `useStaticQuery` : 빌드 시 리액트 훅을 사용하여 GraphQL Data Layer 쿼리
	- `fusejs.publicUrl` : index.json
- `useGatsbyPluginFusejs` true : 검색어 위치 상관없이 동일 점수 (body 검색)


