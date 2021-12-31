import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    render() {
        const { toggle, onDelete } = this.props;

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Please Confirm</ModalHeader>
                <ModalBody>
                    <div className="text-center">
                        <h5 className="fw-bold">Are you sure you want to delete this item?</h5>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button
                        color="danger"
                        onClick={() => onDelete(this.state.activeItem)}
                    >
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}