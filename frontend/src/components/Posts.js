import React, { Component } from "react"
import Layout from "../layouts/Layout"
import styled from "styled-components"
import { connect } from "react-redux"
import { fetchPosts } from "../actions"
import Section from "./Section"
import AddFormPost from "./AddPost"
import Post from "./Post"


const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 1.5rem;
`

const Item = styled.div`
  display: flex;
  padding: 1.5rem 0;
`
const Label = styled.label`
  padding: .5rem;
`
const SelectStyled = styled.select`
    display: block;
    font-size: 16px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: .6em 1.4em .5em .8em;
    width: 20%;
    height: 40px;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
    &:-ms-expand {
      display: none;
    }
    &:hover {
      border-color: #888;
  }
  &:focus {
      border-color: #aaa;
      box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
      box-shadow: 0 0 0 3px -moz-mac-focusring;
      color: #222; 
      outline: none;
  }
  > option {
    font-weight: normal;
  }

`
class Posts extends Component {
  state = {
    value: ''
  }

  componentDidMount() {
    this.props.fetchPosts()
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() { 
    const { value } =  this.state
    const { posts } =  this.props

    if (posts.length === 0) {
      return <Layout {...this.props}>
                <Content>
                  <Section>
                    <Item style={{fontSize: "1.5rem"}}>No Posts Yet!!!</Item>
                    <AddFormPost {...this.props} />
                  </Section>
                </Content>
              </Layout>
    } else {
      return (
        <Layout {...this.props}>
          <Content>
            <Section>
              <Item>
                <Label htmlFor="sel1">SortBy:</Label>
                <SelectStyled onChange={this.handleChange} id="sel1">
                  <option value='timestamp'>Date</option>
                  <option value='voteScore'>Votes</option>
                </SelectStyled>
              </Item>
              {value === 'voteScore' 
                ? this.props.postsVotes.map(id => <Post id={id} key={id}/>)
                : this.props.postsDates.map(id => <Post id={id} key={id}/>)
              }
              <AddFormPost {...this.props} />
            </Section>
          </Content>
        </Layout>
      )
    }
    
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    postsDates: Object.keys(posts)
      .sort((a, b) => posts[b].timestamp - posts[a].timestamp),
    postsVotes: Object.keys(posts)
      .sort((a, b) => posts[b].voteScore - posts[a].voteScore),
    posts: Object.keys(posts).filter(id => posts[id] !== id),
  }
}

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts)
