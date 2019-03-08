import React, { Component } from "react"
import Layout from "../layouts/Layout"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchCategories } from "../actions"
import _ from "lodash"

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  margin: auto 10rem;
`
const Block = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`

const LinkCategory = styled(Link)`
  color: black;
  &:visited,
  &:after,
  &:active,
  &:focus,
  &:checked,
  &:enabled,
  &:link {
    text-decoration: none !important;
  }
  &:hover {
    opacity: 0.7;
  }
`
const Title = styled.h3`
  margin-top: 5rem;
`
const Item = styled.div`
  justify-content: center;
  align-self: center;
`
class Categories extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  renderCategories() {
    const { categories } = this.props

    return _.map(categories, category => {
      const { name, path } = category
      return (
        <Block key={name}>
          <LinkCategory to={`/${path}`}>
            <Item>{name}</Item>
          </LinkCategory>
        </Block>
      )
    })
  }

  render() {
    return (
      <Layout {...this.props}>
        <Content>
          <Title>Categories</Title>
          <Block>{this.renderCategories()}</Block>
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = ({ categories }) => ({ categories })

export default connect(
  mapStateToProps,
  { fetchCategories }
)(Categories)
