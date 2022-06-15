import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Message, Schema, toaster } from "rsuite";
import ModalWrap from "../commons/ModalWrap";


function VaccineModal({ open, handleClose, modalData }) {

  const [formValue, setFormValue] = useState(modalData);

  useEffect(() => {
    setFormValue(modalData);
  }, [modalData])

  const createVaccine = async (user) => {
    await axios.post("/vaccines/", { ...formValue, userId: user.id });
  };

  return (
    <ModalWrap showFooter={false} title="Dodaj vakcinu" open={open} handleClose={handleClose}>
      <Form
        fluid
        formValue={formValue}
        checkTrigger="none"
        onChange={setFormValue}
        onSubmit={async () => {
          try {
            await createVaccine(modalData);
            setFormValue({});
            handleClose();
          } catch (error) {
            console.log(error);
            toaster.push(<Message type="error">{error?.response.data.error}</Message>);
          }
        }}>
        <Form.Group controlId="firstName">
          <Form.ControlLabel>First name</Form.ControlLabel>
          <Form.Control disabled name="firstName" />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.ControlLabel>Last name</Form.ControlLabel>
          <Form.Control disabled name="lastName" />
        </Form.Group>
        <Form.Group controlId="dateOfVaccintaion">
          <Form.ControlLabel>Date of vaccitanion</Form.ControlLabel>
          <Form.Control accepter={DatePicker} name="dateOfVaccintaion" />
        </Form.Group>
        <Form.Group controlId="disease">
          <Form.ControlLabel>Disease</Form.ControlLabel>
          <Form.Control name="disease" />
        </Form.Group>
        <Button className="fluid" type="submit" appearance="primary">
          Create
        </Button>
      </Form>
    </ModalWrap>
  );
}

export default VaccineModal;
