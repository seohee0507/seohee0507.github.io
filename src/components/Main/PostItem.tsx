import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { FunctionComponent } from 'react'
import { PostFrontmatterType } from 'types/PostItem.types'
import { BRAND_COLORS } from 'types/colors'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  :hover h3 {
    text-decoration: underline;
    text-decoration-color: ${BRAND_COLORS.fg.brand.default};
    text-decoration-thickness: 2px;
  }
`
const ThumbnailImage = styled(GatsbyImage)`
  width: 100%;
  border-radius: 0.5rem;
  aspect-ratio: 16/9;
  //object-fit: cover; gatsby-plugin-image 속성
`
const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.875rem 0.5rem;
`
const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.25rem;
`
const CategoryItem = styled.div`
  padding: 0.25rem 0.625rem;
  border-radius: 0.1875rem;
  background-color: ${BRAND_COLORS.bg.neutral.default};
  font-size: 0.8125rem;
`
const Title = styled.h3`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 0.375rem;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.5;
  text-wrap: balance;
  word-break: keep-all;
`
const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${BRAND_COLORS.fg.neutral.sub};
  line-height: 1.5;
`

const PostItem: FunctionComponent<PostItemProps> = ({
  title,
  categories,
  summary,
  thumbnail: {
    childImageSharp: { gatsbyImageData },
  },
  link,
}) => {
  return (
    <PostItemWrapper to={link}>
      <ThumbnailImage image={gatsbyImageData} alt={title} />
      <PostItemContent>
        <Category>
          {categories?.map(category => (
            <CategoryItem key={category}>{category}</CategoryItem>
          ))}
        </Category>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
      </PostItemContent>
    </PostItemWrapper>
  )
}

export default PostItem
