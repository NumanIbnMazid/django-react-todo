import React, { Component } from "react";
import Modal from "./components/Modal";
import DeleteModal from "./components/DeleteModal";
import axios from "./axios";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { handleApiResponseExceptionMessage, notify } from "./helpers/Helper"

import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faList } from '@fortawesome/free-solid-svg-icons';


fontawesome.library.add(faPlusCircle, faList);

class App extends Component {
  constructor(props) {
    super(props);
    // toastr config
    this.contextClass = {
      success: "bg-success",
      error: "bg-danger",
      info: "bg-info",
      warning: "bg-warning",
      default: "bg-primary",
      dark: "bg-dark text-white",
    };
    this.priorityOptions = [
      { value: 1, label: "Low" },
      { value: 2, label: "Medium" },
      { value: 3, label: "High" }
    ];
    this.state = {
      viewCompleted: false,
      viewAll: false,
      todoList: [],
      modal: false,
      deleteModal: false,
      activeItem: {
        title: "",
        description: "",
        is_completed: false,
        priority: 1,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  // List
  refreshList = () => {
    axios
      .get("todos/list/")
      .then((res) => this.setState({ todoList: res.data.data }))
      .catch((error) => handleApiResponseExceptionMessage(error));
  };

  toggle = () => {
    this.setState(
      { modal: !this.state.modal }
    );
  };
  toggleDelete = () => {
    this.setState(
      { deleteModal: !this.state.deleteModal }
    );
  };

  // Create & Update
  handleSubmit = (item) => {
    if (item.slug) {
      axios
        .put(`todos/update/${item.slug}/`, item)
        .then((res) => {
          this.refreshList()
          this.toggle()
          notify("Updated Successfully!", "success")
        })
        .catch((error) => handleApiResponseExceptionMessage(error));
      return
    }
    axios
      .post("todos/create/", item)
      .then((response) => {
        this.refreshList()
        this.toggle();
        notify("Created Successfully!", "success")
      })
      .catch((error) => handleApiResponseExceptionMessage(error));
    return
  };

  // Patch
  handleIsCompletedPatch = (item) => {
    item.is_completed = !item.is_completed;
    const data = {
      "is_completed": item.is_completed,
    }
    if (item.slug) {
      axios
        .patch(`todos/partial/update/${item.slug}/`, data)
        .then((res) => {
          this.refreshList()
          notify("Updated Successfully!", "success")
        })
        .catch((error) => handleApiResponseExceptionMessage(error));
      return;
    }
  };

  // Delete
  handleDelete = (item) => {
    this.toggleDelete();
    axios
      .delete(`todos/delete/${item.slug}/`)
      .then((res) => {
        this.refreshList()
        notify("Deleted Successfully!", "success")
      })
      .catch((error) => handleApiResponseExceptionMessage(error));
  };

  createItem = () => {
    const item = { title: "", description: "", priority: 1, is_completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  deleteItem = (item) => {
    this.setState({ activeItem: item, deleteModal: !this.state.deleteModal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true, viewAll: false });
    }

    return this.setState({ viewCompleted: false, viewAll: false });
  };

  displayAll = () => {
    return this.setState({ viewAll: true, viewCompleted: false });
  };

  getPriorityCssClass = (priority) => {
    if (priority === 3) {
      return "danger";
    }
    else if (priority === 2) {
      return "warning";
    }
    else {
      return "success";
    }
  };

  getPriorityString = (priority) => {
    if (priority === 3) {
      return "High";
    }
    else if (priority === 2) {
      return "Medium";
    }
    else {
      return "Low";
    }
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs tab-list">
        <span
          onClick={() => this.displayCompleted(false)}
          className={`pointer nav-link ${!this.state.viewCompleted && !this.state.viewAll ? "active" : ""}`}
        >
          Incomplete
        </span>
        <span
          onClick={() => this.displayCompleted(true)}
          className={`pointer nav-link ${this.state.viewCompleted ? "active" : ""}`}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayAll()}
          className={`pointer nav-link ${this.state.viewAll ? "active" : ""}`}
        >
          All
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted, viewAll } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => viewAll ? item : item.is_completed === viewCompleted
    );

    return newItems.map((item) => (
      <div
        key={item.slug}
        className="row border border-info rounded m-2 p-2"
      >
        <div className="col-lg-8 col-md-8 col-sm-8 col-12 px-4 py-2">
          {/* Is Completed Checkbox */}
          <span>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="is_completed"
                  checked={item.is_completed}
                  onChange={() => this.handleIsCompletedPatch(item)}
                />
                Completed
              </Label>
            </FormGroup>
          </span>
          <span
            className={`todo-title mr-2 fw-bold fs-5 position-relative pe-none ${item.is_completed ? "completed-todo" : ""}`}
            title={item.description}
          >
            {item.title}
            <span className={`ms-5 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-${this.getPriorityCssClass(item.priority)}`}>
              <small className="fw-lighter">{this.getPriorityString(item.priority)}</small>
              <span className="visually-hidden">todo priority</span>
            </span>
          </span>
          <br />
          <h6 className="mt-2 text-muted fw-lighter font-monospace">{item.description}</h6>
          <div>
            <span className="ms-2 badge bg-primary">
              <span className="text-warning">created:</span> {item.created_at}
            </span>
            <span className="ms-2 badge bg-primary">
              <span className="text-warning">last update:</span> {item.created_at}
            </span>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-12 px-4 py-2 text-end">
          <button
            className="btn btn-info text-white m-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.deleteItem(item)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <main className="container todo-app-root rounded">

        {/* Toastr Message */}
        <ToastContainer
          style={{ width: "400px" }}
        />

        {/* Todo List */}
        <h1 className="text-white text-uppercase text-center my-4 pt-4">Django React Todo app</h1>
        <div className="row">
          <div className="mx-auto">
            <div className="card todo-app-content p-3">
              <div className="mb-4 text-end">
                <button
                  className="btn btn-dark btn-lg"
                  onClick={this.createItem}
                >
                  <FontAwesomeIcon icon="plus-circle" className="text-lg me-2" />
                  Add task
                </button>
              </div>
              {/* Tabs */}
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            priorityOptions={this.priorityOptions}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        {this.state.deleteModal ? (
          <DeleteModal
            activeItem={this.state.activeItem}
            toggle={this.toggleDelete}
            onDelete={this.handleDelete}
          />
        ) : null}

        <footer className="footer mt-auto py-3 bg-light text-center">
          <div className="container">
            <span className="text-warning">
              &copy; Copyright (c) 2022 | Designed and Developed by
              <a className="text-blue-800 dark:text-gray-400" href="mailto:numanibnmazid@gmail.com">
                @Numan Ibn Mazid
              </a>
            </span>
          </div>
        </footer>
      </main>
    );
  }
}

export default App;