import React, { Component } from "react";

import "./app.css";
import Header from "../header/header";
import TaskList from "../task-list/task-list";
import Footer from "../footer/footer";

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [
      this.createItem("Completed task"),
      this.createItem("Editing task"),
      this.createItem("Active task"),
    ],
    filter: "All",
  };

  findIdx = (arr, id) => arr.findIndex((el) => el.id === id);

  getNewArr = (arr, idx, newItem) => {
    if (!newItem) {
      return [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  toggleItemProperty = (arr, id, propName) => {
    const idx = this.findIdx(arr, id);
    const newItem = { ...arr[idx], [propName]: !arr[idx][propName] };
    return this.getNewArr(arr, idx, newItem);
  };

  setItemProperty = (arr, id, propName, newValue) => {
    const idx = this.findIdx(arr, id);
    const newItem = { ...arr[idx], [propName]: newValue };
    return this.getNewArr(arr, idx, newItem);
  };

  getItemProperty = (arr, id, propName) => {
    const idx = this.findIdx(arr, id);
    return arr[idx][propName];
  };

  deleteItem = (id) => {
    this.pauseTimer(id);
    this.setState(({ todoData }) => {
      const idx = this.findIdx(todoData, id);
      return {
        todoData: this.getNewArr(todoData, idx),
      };
    });
  };

  clearCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => !item.done);
      return {
        todoData: newArr,
      };
    });
  };

  toggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleItemProperty(todoData, id, "done"),
    }));

    this.setState(({ todoData }) => ({
      todoData: this.setItemProperty(todoData, id, "onTimer", false),
    }));
    this.pauseTimer(id);
  };

  closeEditingInput = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleItemProperty(todoData, id, "editing"),
    }));
  };

  editItemDescription = (id, value) => {
    this.setState(({ todoData }) => ({
      todoData: this.setItemProperty(todoData, id, "description", value),
    }));
    this.closeEditingInput(id);
  };

  openEditingInput = (id) => {
    const { todoData } = this.state;
    const done = this.getItemProperty(todoData, id, "done");

    if (!done) {
      this.setState(() => {
        return {
          todoData: this.toggleItemProperty(todoData, id, "editing"),
        };
      });
    }
  };

  toggleTimer = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleItemProperty(todoData, id, "onTimer"),
      };
    });

    const { todoData } = this.state;
    const onTimer = this.getItemProperty(todoData, id, "onTimer");
    // eslint-disable-next-line no-unused-expressions
    !onTimer ? this.startTimer(id) : this.pauseTimer(id);
  };

  startTimer = (id) => {
    const { todoData: data } = this.state;
    const time = this.getItemProperty(data, id, "time");
    const start = new Date();

    const timerID = setInterval(() => {
      const now = new Date();
      const interval = now - start;
      const currentTime = time + interval;
      this.setState(({ todoData }) => {
        return {
          todoData: this.setItemProperty(todoData, id, "time", currentTime),
        };
      });
    }, 1000);

    this.setState(({ todoData }) => ({
      todoData: this.setItemProperty(todoData, id, "timerID", timerID),
    }));
  };

  pauseTimer = (id) => {
    const { todoData } = this.state;
    const timerID = this.getItemProperty(todoData, id, "timerID");
    clearInterval(timerID);
  };

  clearTimer = (id) => {
    this.pauseTimer(id);

    this.setState(({ todoData }) => {
      return {
        todoData: this.setItemProperty(todoData, id, "time", 0),
      };
    });
    this.setState(({ todoData }) => {
      return {
        todoData: this.setItemProperty(todoData, id, "onTimer", false),
      };
    });
  };

  addItem = (text) => {
    if (!text) return;

    this.setState(({ todoData }) => {
      const newItem = this.createItem(text);
      return {
        todoData: [...todoData, newItem],
      };
    });
  };

  changeFilter = (value) => {
    this.setState(() => ({
      filter: value,
    }));
  };

  createItem(description) {
    return {
      description,
      done: false,
      editing: false,
      date: new Date(),
      time: 0,
      timerID: null,
      onTimer: false,
      id: this.maxId++,
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const undoneItemsCount = todoData.filter((el) => !el.done).length;

    return (
      <section className="todoapp">
        <Header onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={todoData}
            filter={filter}
            onDelete={this.deleteItem}
            onToggle={this.toggleDone}
            onFinishEditing={this.editItemDescription} //
            onStartEditing={this.openEditingInput}
            toggleTimer={this.toggleTimer}
            clearTimer={this.clearTimer}
          />
          <Footer
            counter={undoneItemsCount}
            onChangeFilter={this.changeFilter}
            onClearCompletedClick={this.clearCompletedItems}
          />
        </section>
      </section>
    );
  }
}
