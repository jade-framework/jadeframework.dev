import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image = ({ imageAlt, imageName }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 960, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
            extension
            publicURL
          }
        }
      }
    }
  `)

  const image = data.images.edges.find(n => {
    return n.node.relativePath === imageName
  })
  if (!image) {
    return null
  }

  if (!image.node.childImageSharp && image.node.extension === "svg") {
    return (
      <div>
        <img alt={imageAlt} src={image.node.publicURL} />
      </div>
    )
  } else {
    const imageFluid = image.node.childImageSharp.fluid
    return <Img alt={imageAlt} fluid={imageFluid} />
  }
}

export default Image
