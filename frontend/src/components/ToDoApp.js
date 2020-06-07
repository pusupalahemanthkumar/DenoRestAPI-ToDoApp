import React from "react";
import axios from "axios";

import Header from "./Header";
import Tasks from "./Tasks";

class ToDoApp extends React.Component {
  state = {
    tasks: null,
    loading: true,
  };
  componentDidMount() {
    axios.get("http://localhost:8000/api/todos",{
      headers:{
        "Content-Type":"application/json"
      }
    }).then((response) => {
      console.log(response.data);
      this.setState({
        tasks: [...response.data.todos],
        loading: false,
      });
    });
  }
  addTask = (name) => {
    console.log(name);
    axios
      .post(`http://localhost:8000/api/todos`, { name: name })
      .then((response) => {
        console.log(response);
        this.setState((state, props) => {
          return {
            tasks: [...state.tasks, response.data.todo],
          };
        });
      });
  };
  deleteTask = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/api/todos/${id}`)
      .then((response) => {
        console.log(response);
        const updatedTasks = this.state.tasks.filter((task) => {
          return task._id.$oid !== id;
        });
        console.log(this.state.todos, updatedTasks);
        this.setState({
          tasks: updatedTasks,
        });
      }).catch(err=>{
        console.log(err.response.error);
      })
  };

  render() {
    return (
      <div>
        <Header onAdd={(name) => this.addTask(name)} />

        {this.state.loading && !this.state.tasks ? (
          <p>Loading...</p>
        ) : (
          <Tasks onDelete={this.deleteTask} tasks={this.state.tasks} />
        )}
      </div>
    );
  }
}

export default ToDoApp;
