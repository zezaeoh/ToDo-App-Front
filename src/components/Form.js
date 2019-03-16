import React from 'react';
import './Form.css';

const Form = ({value, color, onChange1, onChange2, onChange3, onCreate, onKeyPress}) => {
  return (
    <div className="form">
      <div>
        <input value={value.title} placeholder='Todo' onChange={onChange1} onKeyPress={onKeyPress} style={{ color: color}}/>
        <div className="create-button" onClick={onCreate}>
          추가
        </div>
      </div>
      <h5>마감기한</h5>
      <div>
        <input type='date' value={value.date} onChange={onChange3}/>
      </div>
      <div>
        <input className="content" placeholder='What To Do' value={value.content} onChange={onChange2} onKeyPress={onKeyPress}/>
      </div>
    </div>
  );
};

export default Form;
