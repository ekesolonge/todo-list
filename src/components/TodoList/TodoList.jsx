import _ from "lodash";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as taskService from "../../services/tasks";
import { ListBody, ListItem, ListButton } from "./TodoListStyles";
import {
  Body,
  Container,
  Wrapper,
  Title,
  PrimaryButton,
} from "../GlobalStyles";
import Button from "../common/Button";
import { getCurrentUser } from "../../services/auth";

function TodoList(props) {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await taskService.getTasks();
        setList(data);
      } catch (error) {
        if (error.response) toast.error(error.response.data);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async e => {
    e.preventDefault();

    if (!input) return toast.error("Please fill input!");

    const task = {
      name: input,
    };

    try {
      const { data } = await taskService.createTask(task);
      delete data.__v;
      const newList = [...list, data];
      setList(newList);
      setInput("");
      toast.success("Task added successfully");
    } catch (error) {
      if (error.response) toast.error(error.response.data);
    }
  };

  const deleteTask = async task => {
    const originalList = [...list];
    const newList = list.filter(item => item._id !== task._id);
    setList(newList);
    try {
      await taskService.deleteTask(task._id);
      toast.success("Task deleted successfully");
    } catch (error) {
      if (error.response) toast.error(error.response.data);
      setList(originalList);
    }
  };

  const editTask = task => {
    document.getElementById("taskInput").focus();
    setInput(task.name);
    setEdit(task);
  };

  const saveTask = async () => {
    const originalList = [...list];
    const editedInput = { _id: edit._id, name: input };
    const newList = list.map(task =>
      task._id === edit._id ? editedInput : task
    );

    setList(newList);
    setInput("");
    setEdit({});

    try {
      await taskService.editTask(editedInput);
      toast.success("Task edited successfully");
    } catch (error) {
      if (error.response) toast.error(error.response.data);
      setList(originalList);
    }
  };

  const handleInput = ({ currentTarget }) => {
    const input = currentTarget.value;
    setInput(input);
  };

  const cancelEdit = () => {
    setInput("");
    setEdit({});
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  return (
    <Body>
      <Container>
        <Wrapper>
          <div className="d-flex align-items-center justify-content-end">
            <Button type="button" value="Logout" onClick={handleLogout} />
          </div>
          <Title>{getCurrentUser().username}'s todo list </Title>
          <ListBody>
            <div>
              <form className="input-group mb-3" onSubmit={addTask}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Task"
                  id="taskInput"
                  onChange={handleInput}
                  value={input}
                ></input>
                {_.isEmpty(edit) && (
                  <div className="input-group-append">
                    <PrimaryButton className="btn btn-primary" type="submit">
                      Add Task
                    </PrimaryButton>
                  </div>
                )}
                {!_.isEmpty(edit) && (
                  <React.Fragment>
                    <div className="input-group-append">
                      <PrimaryButton
                        className="btn btn-primary"
                        type="button"
                        onClick={() => saveTask(list)}
                      >
                        Save
                      </PrimaryButton>
                    </div>
                    <div className="input-group-append">
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </form>
            </div>
            <ul className="list-group">
              {list &&
                [...list].reverse().map(item => (
                  <ListItem className="list-group-item" key={item._id}>
                    {item.name}
                    <div>
                      <ListButton onClick={() => editTask(item)}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </ListButton>
                      <ListButton delete onClick={() => deleteTask(item)}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </ListButton>
                    </div>
                  </ListItem>
                ))}
            </ul>
          </ListBody>
        </Wrapper>
      </Container>
    </Body>
  );
}

export default TodoList;
