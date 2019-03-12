import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NoPost = () => {
  return (
    <Content>
      <Title>
        <Item>404 Page Not Found</Item>
      </Title>
      <Body>
        <Item>The page your requested does not exist</Item>
      </Body>
      <Home to="/">Go back to Home</Home>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  width: 95vw;
  height: 50vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Item = styled.div``

const Title = styled(Item)`
  font-size: 2.5rem;
  text-align: center;
`
const Home = styled(Link)`
  padding: 5px;
  text-align: center;
`
const Body = styled(Item)`
  font-size: 1rem;
  text-align: center;
`
export default NoPost