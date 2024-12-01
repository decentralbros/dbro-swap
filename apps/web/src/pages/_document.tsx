/* eslint-disable no-param-reassign */
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()

    try {
      const originalRenderPage = ctx.renderPage
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await super.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } catch (error) {
      console.error('Document getInitialProps error:', error)
      throw error
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html translate="no">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;800&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="portal-root" />
        </body>
      </Html>
    )
  }
}

export default MyDocument
