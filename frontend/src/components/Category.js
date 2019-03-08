import React, { Component } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Layout from "../layouts/Layout"
import { connect } from "react-redux"
import { fetchPostCategory } from "../actions"
import Section from "./Section"
import _ from "lodash"

const Content = styled.div`
  margin-top: 5rem;
  padding: 0.5rem;
`
const Block = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`
const Item = styled.div``

const Title = styled(Item)`
  font-size: 1.5rem;
  justify-content: center;
`
const Links = styled(Link)`
  color: black;
  padding: 0 0.2rem;
  &:hover {
    opacity: 0.7;
  }
`

class Category extends Component {
  componentDidMount() {
    const { category } = this.props.match.params

    this.props.fetchPostCategory(category)
  }

  getPostCategory(category) {
    const { posts } = this.props

    return _.map(posts, item => {
      if (item.category === category) {
        return (
          <Block key={item.id}>
            <Title>
              <Links to={`/${category}/${item.id}`}>{item.title}</Links>
            </Title>

            <Item>author: {item.author}</Item>
            <Item>comments: {item.commentCount}</Item>
            <Item>votes: {item.voteScore}</Item>
            <Item>category: {item.category}</Item>
          </Block>
        )
      }
    })
  }

  render() {
    const { category } = this.props.match.params

    return (
      <Layout {...this.props}>
        <Content>
          <Section>
            <Block>{this.getPostCategory(category)}</Block>
          </Section>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts
  }
}
export default connect(
  mapStateToProps,
  { fetchPostCategory }
)(Category)
