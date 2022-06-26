import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, CheckboxGroup, DatePicker, Form, InputNumber, Message, Schema, toaster } from "rsuite";
import ModalWrap from "../commons/ModalWrap";

function CriminalProceedingModal({ open, handleClose, modalData, shouldUpdate, onSubmit }) {
  const [formValue, setFormValue] = useState(modalData);

  useEffect(() => {
    const flags = [];
    if (modalData?.convicted) {
      flags.push('convicted');
    }
    setFormValue({
      ...modalData,
      flags
    });
  }, [modalData]);

  const createCriminalProceeding = async (user) => {
    const { flags, ...rest } = formValue;
    await axios.post("/criminalProceeding/", { ...rest, convicted: (formValue.flags || []).includes('convicted'), userId: user.id });
  };
  const updateCriminalProceeding = async (user) => {
    const { flags, ...rest } = formValue;
    await axios.patch("/criminalProceeding/" + modalData.id, { ...rest, convicted: (formValue.flags || []).includes('convicted'), userId: modalData.userId });
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

            if (shouldUpdate) {
              await updateCriminalProceeding(modalData);
              await onSubmit();
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
        <Form.Group controlId="beginDate">
          <Form.ControlLabel>Begin Date</Form.ControlLabel>
          <Form.Control accepter={DatePicker} oneTap name="beginDate" />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.ControlLabel>End Date</Form.ControlLabel>
          <Form.Control accepter={DatePicker} oneTap name="endDate" />
        </Form.Group>
        <Form.Group controlId="accusation">
          <Form.ControlLabel>Accusation</Form.ControlLabel>
          <Form.Control name="accusation" />
        </Form.Group>
        <Form.Group controlId="convicted">
          <Form.ControlLabel>Convicted</Form.ControlLabel>
          <Form.Control accepter={CheckboxGroup} name="flags">
            <Checkbox value='convicted'>Convicted</Checkbox>
          </Form.Control>
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
