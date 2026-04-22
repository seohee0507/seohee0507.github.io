import React, {
  Dispatch,
  FunctionComponent,
  useMemo,
  createContext,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import CategoryList, { CategoryListProps } from 'components/Main/CategoryList'
import PostList from 'components/Main/PostList'
import { graphql } from 'gatsby'
import { PostListItemType } from 'types/PostItem.types'
import queryString, { ParsedQuery } from 'query-string'
import Template from 'components/Common/Template'

type IndexPageProps = {
  location: {
    search: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
      }
    }
    allMarkdownRemark: {
      edges: PostListItemType[] //node: {id...}
    }
    file: {
      publicURL: string
    }
  }
}

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

const IndexPage: FunctionComponent<IndexPageProps> = function ({
  location: { search },
  data: {
    site: {
      siteMetadata: { title, description, siteUrl },
    },
    allMarkdownRemark: { edges },
    //file: { publicURL },
  },
}) {
  const parsed: ParsedQuery<string> = queryString.parse(search)

  const selectedCategory: string =
    typeof parsed.category !== 'string' || !parsed.category
      ? 'all'
      : parsed.category.toLowerCase().replace(/\s+/g, '-')

  const categoryList = useMemo(
    () =>
      edges.reduce(
        (
          list: CategoryListProps['categoryList'],
          {
            node: {
              frontmatter: { categories },
            },
          },
        ) => {
          categories.forEach(category => {
            category in list ? list[category]++ : (list[category] = 1)
          })
          list['All']++
          return list
        },
        { All: 0 },
      ),
    [],
  )

  return (
    <Template
      title={title}
      description={description}
      url={siteUrl}
      //image={publicURL}
    >
      <CategoryList
        selectedCategory={selectedCategory}
        categoryList={categoryList}
      />
      <PostList selectedCategory={selectedCategory} posts={edges} />
    </Template>
  )
}

export default IndexPage

export const getPostList = graphql`
  query getPostList {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD")
            categories
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 768, height: 400)
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      publicURL
    }
  }
`
