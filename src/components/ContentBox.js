import React, { Component } from 'react';
import './ContentBox.css'
import axios from 'axios';

class ContentBox extends Component {
  state = {
    clicked: false
  }
  
  handleClick = (id, content) => {
    const {clicked} = this.state;
    const url = 'http://52.231.67.172:8080/api/todos/' + id;

    if(clicked)
      axios.put(url, { content: content })
        .catch(err => console.log(err));

    this.setState({
      clicked: !clicked
    });
  }

  handleKeyPress = (e, id, content) => {
    if(e.key === 'Enter') {
      this.handleClick(id, content);
    }
  }

  render() {
    const { id, content, date, onChange } = this.props;
    const { handleClick, handleKeyPress } = this;
    const { clicked } = this.state;

    return (
      <div className="content-box">
        <div className="reverse">
          <h5>{"마감기한: " + (date ? date : "없음")}</h5>
        </div>
        <div>
          {
            !clicked ?
              (<div className='text-box clickable' onClick={() => handleClick(id, content)}>{content}</div>) :
              (<input className="text-box" value={content} onChange={onChange} onKeyPress={e => handleKeyPress(e, id, content)}/>)
          }
        </div>
      </div>
    )
  }
}

export default ContentBox
