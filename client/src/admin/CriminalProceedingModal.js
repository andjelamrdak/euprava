import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, DatePicker, Form, InputNumber, Message, Schema, toaster } from "rsuite";
import ModalWrap from "../commons/ModalWrap";

function CriminalProceedingModal({ open, handleClose, modalData, shouldUpdate }) {
  const [formValue, setFormValue] = useState(modalData);

  useEffect(() => {
    setFormValue(modalData);
  }, [modalData]);

  const createCriminalProceeding = async (user) => {
    await axios.post("/criminalProceeding/", { ...formValue, userId: user.id });
  };
  const updateCriminalProceeding = async (user) => {
    await axios.patch("/criminalProceeding/", { ...formValue, userId: user.id });
  };

  return (
    <ModalWrap showFooter={false} title="Dodaj" open={open} handleClose={handleClose}>
      <Form
        fluid
        formValue={formValue}
        checkTrigger="none"
        onChange={setFormValue}
        onSubmit={async () => {
          try {

            if(shouldUpdate) {
              updateCriminalProceeding(modalData);
            } else {
              await createCriminalProceeding(modalData);
            }
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
        <Form.Group controlId="beginDate">
          <Form.ControlLabel>Begin Date</Form.ControlLabel>
          <Form.Control accepter={DatePicker} name="beginDate" />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.ControlLabel>End Date</Form.ControlLabel>
          <Form.Control accepter={DatePicker} name="endDate" />
        </Form.Group>
        <Form.Group controlId="accusation">
          <Form.ControlLabel>Accusation</Form.ControlLabel>
          <Form.Control name="accusation" />
        </Form.Group>
        <Form.Group controlId="convicted">
          <Form.ControlLabel>Convicted</Form.ControlLabel>
          <Form.Control accepter={Checkbox} name="convicted" />
        </Form.Group>
        <Form.Group controlId="severity">
          <Form.ControlLabel>Severity</Form.ControlLabel>
          <Form.Control accepter={InputNumber} name="severity" />
        </Form.Group>
        <Form.Group controlId="judgment">
          <Form.ControlLabel>Judgment</Form.ControlLabel>
          <Form.Control name="judgment" />
        </Form.Group>
        <Button className="fluid" type="submit" appearance="primary">
          Create
        </Button>
      </Form>
    </ModalWrap>
  );
}

export default CriminalProceedingModal;
