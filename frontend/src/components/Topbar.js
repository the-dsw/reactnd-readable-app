import React, { Component } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Topbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid black;
  padding: 0.25rem;
  background-color: white;
  z-index: 10;
`
const Title = styled(Link)`
  font-family: Thin;
  text-transform: uppercase;
  font-size: 4vw;
  line-height: 1;
  text-decoration: none;
  color: black;
`
export default class extends Component {
  render() {
    return (
      <Topbar>
        <Title to="/">Home</Title>
      </Topbar>
    )
  }
}
