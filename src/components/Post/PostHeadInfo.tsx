import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  padding: 3rem 0;
  box-sizing: border-box;
`

const Title = styled.h1`
  display: -webkit-box;
  overflow: hidden;
  overflow-wrap: break-word;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 42px;
  font-weight: 500;
  line-height: 1.5;
`
const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  font-size: 15px;
  font-weight: 400;
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = ({
  title,
  date,
  categories,
}) => {
  return (
    <PostHeadInfoWrapper>
      <Title>{title}</Title>
      <PostData>
        <div>{categories}</div>
        <div>{date}</div>
      </PostData>
    </PostHeadInfoWrapper>
  )
}

export default PostHeadInfo
