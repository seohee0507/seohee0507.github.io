import { graphql, Link, useStaticQuery, navigate } from 'gatsby'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { AppContext, FuseItem } from 'pages'
import styled from '@emotion/styled'
import useOutsideClick from 'hooks/useOutsideClick'
import { BRAND_COLORS } from 'types/colors'

const SearchWrapper = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`
const SearchToggle = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background: ${BRAND_COLORS.bg.neutral.default};
  }
`
const SearchIcon = styled.i`
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none'%3E%3Cpath stroke='%23636363' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M8.25 14.25a6 6 0 1 0 0-12 6 6 0 0 0 0 12M15.75 15.75l-3.262-3.262'/%3E%3C/svg%3E")
    50% 50%;
`
const CancelSearchIcon = styled.i`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath stroke='%23636363' stroke-linecap='round' stroke-width='2' d='M12 12h7'/%3E%3Cpath fill='%23636363' d='M22.512 11.61a.5.5 0 0 1 0 .78l-3.7 2.96a.5.5 0 0 1-.812-.39V9.04a.5.5 0 0 1 .812-.39z'/%3E%3Cpath stroke='%23636363' stroke-linecap='round' stroke-width='2' d='M15 6.803A6 6 0 0 0 12 6H8a6 6 0 1 0 0 12h4a6 6 0 0 0 3-.803'/%3E%3C/svg%3E")
    50% 50%;
`
const SearchForm = styled.form`
  position: relative;
  display: block;
`
const SearchInputWrapper = styled.div<{ isSearching: boolean }>`
  overflow: hidden;
  width: 0;
  padding: 0;
  transition: width 0.3s;
  ${({ isSearching }) =>
    isSearching && 'padding:0.1875rem;width:15rem;margin-left:0.25rem;'};
`

const SearchInput = styled.input`
  width: 100%;
  height: 2.125rem;
  padding: 0px 1.625rem 0 0.875rem;
  border: 1px solid ${BRAND_COLORS.border.default};
  background: #fff;
  border-radius: 2.125rem;
  line-height: 1;

  &:focus,
  &:active {
    border-color: ${BRAND_COLORS.fg.brand.sub};
    box-shadow: 0 0 0 2px ${BRAND_COLORS.fg.brand.sub};
    transition: 0.3s;
  }
`
const SearchInputReset = styled.button`
  position: absolute;
  right: 0.375rem;
  top: 0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.625rem;
  height: 1.625rem;
  margin: auto 0;
  border: 0;
`
const SearchResults = styled.ul`
  position: absolute;
  margin: 0.1875rem;
  min-width: calc(100% - 0.375rem);
  padding: 0.25rem;
  border-radius: 0.375rem;
  background-color: #fff;
  border: 1px solid ${BRAND_COLORS.border.default};
  list-style-type: none;
  box-sizing: border-box;
`
const SearchResultItem = styled.li<{ isSelected: boolean }>`
  margin: 0;
  background-color: ${({ isSelected }) =>
    isSelected ? BRAND_COLORS.bg.brand.default : 'transparent'};
`

const Item = styled(Link)`
  display: block;
  font-size: 0.875rem;
  padding: 0.5rem 0.375rem;
  border-radius: 0.1875rem;
  font-weight: 500;
  word-break: break-all;
  line-height: 1.4;
  &:hover {
    color: ${BRAND_COLORS.fg.brand.default};
  }
`

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
  const result: FuseResult<FuseItem>[] = useGatsbyPluginFusejs(query, fusejs, {
    ignoreLocation: true,
    threshold: 0.2,
  })
  const fetching = useRef<boolean>(false)
  const [isReset, setIsReset] = useState<boolean>(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!fetching.current && !fusejs && query) {
      fetching.current = true

      fetch(data.fusejs.publicUrl)
        .then(res => res.json())
        .then((json: FuseItem[]) => setFusejs(json))
    }
  }, [fusejs, query])

  const searchToggle = () => {
    setIsSearching(prev => {
      const nextState = !prev
      if (nextState) {
        setTimeout(() => {
          inputRef.current?.focus()
        }, 0)
      }
      return nextState
    })
  }

  const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedItemIndex(-1)
    if (e.target.value !== '') {
      setIsReset(true)
    } else {
      setIsReset(false)
    }
  }
  const searchInputKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
    if (result.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()

      setSelectedItemIndex(prev => (prev < result.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()

      setSelectedItemIndex(prev => (prev > 0 ? prev - 1 : result.length - 1))
    } else if (e.key === 'Enter') {
      if (selectedItemIndex >= 0) {
        navigate(result[selectedItemIndex].item.slug)
      }
    }
  }

  const resetHandler = useCallback(() => {
    setQuery('')
    setIsReset(false)
  }, [])

  const searchRef = useOutsideClick<HTMLFormElement>(resetHandler)

  return (
    <SearchWrapper>
      <SearchToggle onClick={searchToggle}>
        {!isSearching ? <SearchIcon /> : <CancelSearchIcon />}
      </SearchToggle>
      <SearchForm ref={searchRef}>
        <SearchInputWrapper isSearching={isSearching}>
          <SearchInput
            type="text"
            value={query}
            onChange={searchInputHandler}
            onKeyDown={searchInputKeyHandler}
            ref={inputRef}
          />
          {isReset && (
            <SearchInputReset
              type="reset"
              title="지우기"
              onClick={resetHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 8 L8 16"
                  stroke="#686868"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8L16 16"
                  stroke="#686868"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </SearchInputReset>
          )}
        </SearchInputWrapper>
        {result?.length > 0 && (
          <SearchResults>
            {result.map(({ item }: FuseResult<FuseItem>, index: number) => (
              <SearchResultItem
                key={item.id}
                isSelected={selectedItemIndex === index}
                onMouseEnter={() => setSelectedItemIndex(index)}
              >
                <Item to={item.slug}>{item.title}</Item>
              </SearchResultItem>
            ))}
          </SearchResults>
        )}
      </SearchForm>
    </SearchWrapper>
  )
}

export default Search
