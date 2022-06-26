import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Message, toaster } from 'rsuite';
import ModalWrap from "../commons/ModalWrap";

export default function IdCardModal({ open, handleClose, modalData }) {
  const [formValue, setFormValue] = useState({});

  useEffect(() => {
    setFormValue(modalData);
  }, [modalData])

  return (
    <ModalWrap
      showFooter={false} title="Dodaj licnu kartu" open={open} handleClose={handleClose}
    >
      <Form
        fluid
        formValue={formValue}
        checkTrigger="none"
        onChange={setFormValue}
        onSubmit={async () => {
          try {
            await axios.post("/id-card/", { ...formValue, userId: modalData.id });
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
        <Form.Group controlId="duration">
          <Form.ControlLabel>ID Card duration</Form.ControlLabel>
          <Form.Control type='number' name="duration" />
        </Form.Group>
        <Form.Group controlId="placeIfIssue">
          <Form.ControlLabel>Place of issue</Form.ControlLabel>
          <Form.Control name="placeIfIssue" />
        </Form.Group>
        <Form.Group controlId="dateOfIssue">
          <Form.ControlLabel>Date of issue</Form.ControlLabel>
          <Form.Control oneTap accepter={DatePicker} name="dateOfIssue" />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.ControlLabel>City</Form.ControlLabel>
          <Form.Control name="city" />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.ControlLabel>Address</Form.ControlLabel>
          <Form.Control name="address" />
        </Form.Group>
        <Button className="fluid" type="submit" appearance="primary">
          Create
        </Button>
      </Form>
    </ModalWrap>
  )
}
