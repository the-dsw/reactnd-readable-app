import React, { Component } from "react"
import styled from "styled-components"
import AddNewPost from "./AddNewPost"
export default class extends Component {
  state = {
    show: false,
  }

  handlerFormPost = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }))
  }

  render() {
    const { show } = this.state
    return (
      <div>
        <AddFormPost show={show} onClick={this.handlerFormPost}>
          {show ? 'Hide': 'Add Post'}
        </AddFormPost>
        {show && <AddNewPost {...this.props} />}
      </div>
    )
  }
}

const AddFormPost = styled.button`
  margin: 2rem;
  border-radius: 5px;
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  background: #0069ed;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    opacity: 0.7;
  }

  &:focus {
    background: #0053ba;
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  &:active {
    transform: scale(0.99);
  }
`