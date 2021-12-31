import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
        this.priorityOptions = this.props.priorityOptions;
    }

    handleSubmit = (saveMethod) => {
        saveMethod(this.state.activeItem)
        // this.messageFunc("Sample message", "warning");
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = { ...this.state.activeItem, [name]: value };

        this.setState({ activeItem });
    };

    render() {
        const { toggle, onSave } = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="todo-title">Title <span className="text-danger fw-bold">*</span></Label>
                            <Input
                                type="text"
                                id="todo-title"
                                name="title"
                                value={this.state.activeItem.title}
                                onChange={this.handleChange}
                                placeholder="Enter Todo Title"
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-description">Description</Label>
                            <Input
                                type="textarea"
                                id="todo-description"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Enter Todo description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="todo-priority">Priority <span className="text-danger fw-bold">*</span></Label>
                            <Input
                                type="select"
                                id="todo-priority"
                                name="priority"
                                value={this.state.activeItem.priority}
                                onChange={this.handleChange}
                            >
                                {this.priorityOptions.map((option) => (
                                    <option value={option.value} key={option.value}>{option.label}</option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input
                                    type="checkbox"
                                    name="is_completed"
                                    checked={this.state.activeItem.is_completed}
                                    onChange={this.handleChange}
                                />
                                Completed
                            </Label>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        onClick={() => this.handleSubmit(onSave)}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}