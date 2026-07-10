import React, { FunctionComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from './GlobalStyle'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
import Header from './Header'

type TemplateProps = {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

const Container = styled.main`
  position: relative;
  min-height: 100svh;
`

const Template: FunctionComponent<TemplateProps> = ({
  title,
  description,
  url,
  image,
  children,
}) => {
  return (
    <Container>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <link rel="icon" href="/gatsby-archive/favicon.ico" />
        <link rel="icon" href="/gatsby-archive/favicon.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/gatsby-archive/apple-touch-icon.png" sizes="180x180" />
        <link
          rel="apple-touch-icon-precomposed"
          href="/gatsby-archive/apple-touch-icon-precomposed.png"
          sizes="180x180"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://seohee0507.github.io${
            image === undefined ? '/gatsby-archive/og.png' : image
          }`}
        />
        <meta property="og:image:width" content="768" />
        <meta property="og:image:height" content="432" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="SEOHEE Archive" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={`https://seohee0507.github.io${
            image === undefined ? '/gatsby-archive/og.png' : image
          }`}
        />
        <meta name="twitter:site" content={url} />
        <meta name="twitter:creator" content="Choi Seohee" />

        <html lang="ko" />
      </Helmet>

      <GlobalStyle />
      <Header />

      {children}
      <Footer />
    </Container>
  )
}

export default Template
