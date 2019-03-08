import React from "react"
import styled from "styled-components"
import Topbar from "../components/Topbar"

const Home = styled.div``

const Block = styled.div`
  overflow-x: hidden;
  max-width: 100vw;
`

export default ({ children, ...props }) => (
  <Home>
    <Topbar {...props} />
    {Array.isArray(children) ? (
      children.map((child, index) => <Block key={index}>{child}</Block>)
    ) : (
      <Block>{children}</Block>
    )}
  </Home>
);
