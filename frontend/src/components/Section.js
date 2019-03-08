import React, { Component } from "react"
import Categories from "./Categories"
import styled from "styled-components"

const Section = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
const Content = styled.div`
  width: ${({ size }) => (size / 12) * 100}vw;
  margin-top: 2.2rem;
`
const CategoryContent = styled(Content)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-top: 3.8rem;
  justify-content: center;
  background-color: #fff;
`
export default class extends Component {
  state = {}

  render() {
    const { children } = this.props

    return (
      <Section>
        <Content size={7}>{children}</Content>
        <CategoryContent size={5}>
          <Categories />
        </CategoryContent>
      </Section>
    )
  }
}
