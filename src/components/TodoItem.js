import React, { Component } from 'react';
import './TodoItem.css';
import ContentBox from './ContentBox'

class TodoItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.checked !== nextProps.checked || this.props.clicked !== nextProps.clicked || this.props.content !== nextProps.content;
  }

  render() {
    const { title, content, date, checked, clicked, id, color, onToggle, onChange, onClick, onRemove } = this.props;

    return (
      <div>
        <div className="todo-item" onClick={() => onToggle(id)}>
          <div className="remove" onClick={(e) => {
            e.stopPropagation(); // onToggle 이 실행되지 않도록 함
            onRemove(id)
          }}>&times;</div>
          {
            !checked && date && new Date() > new Date(date) && (<div className="alert">&#9200;</div>)
          }
          <div className={`todo-text ${checked ? ' checked' : ''}`}>
            <div style={{ color: color }}>{title}</div>
          </div>
          {
            checked ? 
            (<div className="check-mark" onClick={(e) =>  {
              e.stopPropagation(); 
              onClick(id)}}>✓</div>) : 
            (<div className="check" onClick={(e) =>  {
              e.stopPropagation();
              onClick(id)}}>✓</div>)
          }
        </div>
        {
          clicked && (<ContentBox id={id} content={content} date={date} onChange={e => {onChange(e, id)}}/>)
        }
      </div>
    );
  }
}

export default TodoItem;
