import styled from '@emotion/styled'
import { FunctionComponent } from 'react'
import Search from './Search'
import { Link } from 'gatsby'
import { BRAND_COLORS } from 'types/colors'

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 3.125rem;
  //border-bottom: 1px solid #efefef;
  z-index: 100;
  &:after {
    content: '';
    position: absolute;
    display: block;
    inset: 0;
    height: 200%;
    backdrop-filter: blur(20px);
    mask-image: linear-gradient(to bottom, black 0% 50%, transparent 50% 100%);
    background-color: rgb(255 255 255 / 50%);
    z-index: -1;
    pointer-events: none;
  }
`
const HeaderInner = styled.div`
  display: flex;
  margin-inline: auto;
  display: flex;
  align-items: center;
  max-width: 768px;
  height: 100%;
  padding: 0 1.25rem;
`
const Logo = styled.div`
  display: inline-block;
  font-weight: 500;
  color: ${BRAND_COLORS.fg.neutral.sub};
  font-size: 1rem;
  text-align: center;
  font-style: oblique;
`

const Header: FunctionComponent = function () {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo>
          <Link to="/">SEOHEE Archive</Link>
        </Logo>
        <Search />
      </HeaderInner>
    </HeaderWrapper>
  )
}

export default Header
