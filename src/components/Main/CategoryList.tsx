import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { FunctionComponent, ReactNode } from 'react'
import { breakpoints } from 'types/breakpoints'
import { BRAND_COLORS } from 'types/colors'

export type CategoryListProps = {
  selectedCategory: string
  categoryList: { [key: string]: number }
}

const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 680px;
  margin-top: 50px;
  padding: 0 200px 0 1.25rem;
  margin-inline: auto;
  gap: 8px;
  box-sizing: border-box;
  ${breakpoints.mobile} {
    padding: 0 1.25rem;
  }
`

type CategoryItemProps = {
  active: boolean
}
type GatsbyLinkProps = {
  children: ReactNode
  className?: string
  to: string
} & CategoryItemProps
const CategoryItem = styled(({ active, ...props }: GatsbyLinkProps) => (
  <Link {...props} />
))<CategoryItemProps>`
  padding: 4px 12px;
  border-radius: 3px;
  color: ${BRAND_COLORS.fg.neutral.subtler};
  border: 1px solid ${BRAND_COLORS.border.default};
  ${({ active }) =>
    active
      ? `border-color: ${BRAND_COLORS.fg.brand.default}; color: ${BRAND_COLORS.fg.brand.default}; font-weight:700;`
      : ''};
  font-size: 14px;
  &:hover {
    background-color: ${BRAND_COLORS.bg.neutral.default};
  }
`

const CategoryList: FunctionComponent<CategoryListProps> = ({
  selectedCategory,
  categoryList,
}) => {
  return (
    <CategoryListWrapper>
      {Object.entries(categoryList).map(([category, count]) => {
        const categorySlug = category.toLowerCase().replace(/\s+/g, '-')

        return (
          <CategoryItem
            key={categorySlug}
            active={categorySlug === selectedCategory}
            to={`/?category=${categorySlug}`}
          >
            {category} {count}
          </CategoryItem>
        )
      })}
    </CategoryListWrapper>
  )
}

export default CategoryList
