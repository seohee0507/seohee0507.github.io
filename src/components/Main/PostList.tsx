import styled from '@emotion/styled'
import { FunctionComponent } from 'react'
import PostItem from './PostItem'
import { PostListItemType } from 'types/PostItem.types'
import useInfiniteScroll, {
  useInfiniteScrollType,
} from 'hooks/useInfiniteScroll'

type PostListProps = {
  selectedCategory: string
  posts: PostListItemType[]
}

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  grid-gap: 1.25rem 2rem;
  max-width: 640px;
  margin-inline: auto;
  padding: 1.25rem 1.25rem 100px;
`

const PostList: FunctionComponent<PostListProps> = ({
  selectedCategory,
  posts,
}) => {
  const { containerRef, postList }: useInfiniteScrollType = useInfiniteScroll(
    selectedCategory,
    posts,
  )

  return (
    <PostListWrapper ref={containerRef}>
      {postList.map(
        ({
          node: {
            id,
            fields: { slug },
            frontmatter,
          },
        }: PostListItemType) => (
          <PostItem key={id} {...frontmatter} link={slug} />
        ),
      )}
    </PostListWrapper>
  )
}

export default PostList
