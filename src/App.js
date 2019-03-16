import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import axios from 'axios'
import Form from './components/Form';
import Palette from './components/Palette';
import TodoItemList from './components/TodoItemList';


class App extends Component {

  state = {
    title: '',
    content: '',
    date: '',
    color: '#343a40',
    todos: [],
  }

  async componentDidMount() {
    const url = 'http://52.231.67.172:8080/api/todos/';
    let res = await axios.get(url);
    await this.setState({ 
      todos: res.data.map(a => {
        a.id = a._id;
        delete a._id;
        if(a.date) a.date = a.date.split('T')[0];
        return a;
      })
    });
  }

  handleChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  handleChangeContent = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handleChangeItemContent = (e, id) => {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(a =>{
        if(a.id === id){
          a.content = e.target.value
        }
        return a;
      })
    });
  }

  handleChangeDate = (e) => {
    this.setState({
      date: e.target.value
    });
  }

  handleCreate = async () => {
    const { title, content, date, todos, color } = this.state;
    
    if(!title || title === ''){
      alert('제목을 입력하세요!');
      return;
    }

    if(!content || content === ''){
      alert('내용을 입력하세요!');
      return;
    }

    const url = 'http://52.231.67.172:8080/api/todos/';
    const data = {
      title: title,
      content: content,
      date: date,
      checked: false,
      color: color
    }

    const res = await axios({
      method: 'POST',
      url: url,
      data: data
    });
    
    data.id = res.data._id;
    
    await this.setState({
      title: '',
      content: '',
      date: '',
      // concat 을 사용하여 배열에 추가
      todos: todos.concat({
        ...data,
        clicked: false,
      })
    });
  }

  handleClick = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    const selected = todos[index];

    const url = 'http://52.231.67.172:8080/api/todos/' + id + (selected.checked ? '/uncheck/' : '/check/');
    axios.put(url)
      .catch(err => console.log(err));

    this.setState({
      todos: [
        ...todos.slice(0, index),
        {
          ...selected,
          checked: !selected.checked
        },
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);

    const selected = todos[index];

    this.setState({
      todos: [
        ...todos.slice(0, index),
        {
          ...selected,
          clicked: !selected.clicked
        },
        ...todos.slice(index + 1, todos.length)
      ]
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    const url = 'http://52.231.67.172:8080/api/todos/' + id;
    
    axios.delete(url)
      .catch(err => console.log(err));

    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleSellect = (color) => {
    this.setState({
      color: color
    })
  }

  render() {
    const { title, content, date, todos, color } = this.state;
    const {
      handleChangeTitle,
      handleChangeContent,
      handleChangeDate,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleClick,
      handleSellect,
      handleChangeItemContent
    } = this;

    return (
      <TodoListTemplate form={(
        <Form 
          value={{title: title, content: content, date: date}}
          color={color}
          onKeyPress={handleKeyPress}
          onChange1={handleChangeTitle}
          onChange2={handleChangeContent}
          onChange3={handleChangeDate}
          onCreate={handleCreate}
        />
      )}
      palette={(
        <Palette
          colors={['#343a40', '#12b886', '#228ae6', '#f03e3e']}
          selected={color}
          onSelect={handleSellect}
        />
      )}>
        <TodoItemList 
          todos={todos} 
          onToggle={handleToggle} 
          onRemove={handleRemove}
          onChange={handleChangeItemContent}
          onClick={handleClick}
        />
      </TodoListTemplate>
    );
  }
}

export default App;
