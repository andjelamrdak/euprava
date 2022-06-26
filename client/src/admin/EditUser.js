import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Checkbox, CheckboxGroup, Form, Message, Schema, toaster } from "rsuite";
import ModalWrap from "../commons/ModalWrap";

const model = Schema.Model({
  email: Schema.Types.StringType().isRequired().isEmail(),
  firstName: Schema.Types.StringType().isRequired(),
  lastName: Schema.Types.StringType().isRequired(),
  password: Schema.Types.StringType().isRequired(),
  repeat: Schema.Types.StringType()
    .isRequired()
    .addRule((v, d) => v === d.password, "Passwords are not the same", true),
});

function EditUser({ open, handleClose, modalData, onSubmit }) {

  const [formValue, setFormValue] = useState(modalData);

  useEffect(() => {
    const flags = [];
    if (modalData?.admin) {
      flags.push('admin')
    }
    if (modalData?.blocked) {
      flags.push('blocked')
    }
    setFormValue({
      ...modalData,
      flags
    });
  }, [modalData])

  const changeProp = async (user) => {
    const { flags, ...rest } = formValue;
    await axios.patch("/admin/user/" + user.id, {
      ...rest,
      admin: (formValue.flags || []).includes('admin'),
      blocked: (formValue.flags || []).includes('blocked')
    });
  };

  return (
    <ModalWrap showFooter={false} title="Izmeni korisnika" open={open} handleClose={handleClose}>
      <Form
        fluid
        model={model}
        formValue={formValue}
        checkTrigger="none"
        onChange={setFormValue}
        onSubmit={async () => {
          try {
            await changeProp(modalData);
            setFormValue({});
            handleClose();
            onSubmit();
          } catch (error) {
            console.log(error);
            toaster.push(<Message type="error">{error?.response.data.error}</Message>);
          }
        }}>
        <Form.Group controlId="firstName">
          <Form.ControlLabel>First name</Form.ControlLabel>
          <Form.Control name="firstName" />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.ControlLabel>Last name</Form.ControlLabel>
          <Form.Control name="lastName" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" />
        </Form.Group>
        <Form.Group controlId="jmbg">
          <Form.ControlLabel>JMBG</Form.ControlLabel>
          <Form.Control name="jmbg" />
        </Form.Group>
        <Form.Group >
          <Form.ControlLabel>Statusi</Form.ControlLabel>
          <Form.Control accepter={CheckboxGroup} name="flags">
            <Checkbox value="admin">Admin</Checkbox>
            <Checkbox value="blocked">Blocked</Checkbox>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="idCardNumber">
          <Form.ControlLabel>idCardNumber</Form.ControlLabel>
          <Form.Control name="idCardNumber" />
        </Form.Group>
        <Button className="fluid" type="submit" appearance="primary">
          Update
        </Button>
      </Form>
    </ModalWrap>
  );
}

export default EditUser;
