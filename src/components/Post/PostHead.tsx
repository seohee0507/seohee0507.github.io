import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { FunctionComponent } from 'react'
import { breakpoints } from 'types/breakpoints'
import { BRAND_COLORS } from 'types/colors'

type PostHeadProps = {
  thumbnail: IGatsbyImageData
  title: string
  date: string
  categories: string[]
}

const PostHeadWrapper = styled.div``
const PostImage = styled(GatsbyImage)`
  width: 100%;
  aspect-ratio: 16/9;
  margin-top: 2rem;
`
const PostHeadInfoWrapper = styled.div`
  max-width: 768px;
  margin-inline: auto;
  padding: 3rem 1.25rem 0;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.25;
  text-wrap: balance;
  word-break: keep-all;
  ${breakpoints.mobile} {
    font-size: 2rem;
  }
`
const PostData = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
`
const PostCategory = styled(Link)`
  border: 1px solid ${BRAND_COLORS.border.default};
  padding: 0.25rem 0.625rem;
  font-weight: 700;
  border-radius: 4px;
  font-size: 0.875rem;
  border-radius: 20px;
`
const PostDate = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
  color: ${BRAND_COLORS.fg.neutral.sub};
  font-size: 0.875rem;
  &:before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 3px;
    margin-right: 0.5rem;
    border-radius: 4px;
    background-color: ${BRAND_COLORS.fg.neutral.subtler};
  }
`

const PostHead: FunctionComponent<PostHeadProps> = ({
  categories,
  title,
  date,
  thumbnail,
}) => {
  const categorySlug = categories[0].toLowerCase().replace(/\s+/g, '-')

  return (
    <PostHeadWrapper>
      <PostHeadInfoWrapper>
        <Title>{title}</Title>
        <PostData>
          <PostCategory to={`/?category=${categorySlug}`}>
            {categories}
          </PostCategory>
          <PostDate>{date}</PostDate>
        </PostData>
        <PostImage image={thumbnail} alt={title} />
      </PostHeadInfoWrapper>
    </PostHeadWrapper>
  )
}

export default PostHead
