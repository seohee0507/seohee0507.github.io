import styled from '@emotion/styled'
import React, { FunctionComponent } from 'react'
import { BRAND_COLORS } from 'types/colors'

const FooterWrapper = styled.footer`
  display: grid;
  margin: 0 auto;
  padding: 3rem 0 2.5rem;
`
const FooterText = styled.p`
  margin-top: 0.75rem;
  color: ${BRAND_COLORS.fg.neutral.sub};
  font-size: 0.8125rem;
  text-align: center;
`

const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      <FooterText>&copy; 2026 Choi Seohee. All Rights Reserved.</FooterText>
    </FooterWrapper>
  )
}

export default Footer
