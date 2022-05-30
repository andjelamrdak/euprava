import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Message, Schema, toaster, Uploader } from "rsuite";

const model = Schema.Model({
  email: Schema.Types.StringType().isRequired().isEmail(),
  firstName: Schema.Types.StringType().isRequired(),
  lastName: Schema.Types.StringType().isRequired(),
  password: Schema.Types.StringType().isRequired(),
  repeat: Schema.Types.StringType()
    .isRequired()
    .addRule((v, d) => v === d.password, "Passwords are not the same", true),
});

export default function Register(props) {
  const [formValue, setFormValue] = useState({});
  return (
    <div>
      <h2>Register</h2>
      <Form
        fluid
        model={model}
        formValue={formValue}
        checkTrigger="none"
        onChange={setFormValue}
        onSubmit={async (c) => {
          if (!c) {
            return;
          }
          try {
            await props.onSubmit(formValue);
            setFormValue({});
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
        <Form.Group controlId="idCardNumber">
          <Form.ControlLabel>idCardNumber</Form.ControlLabel>
          <Form.Control name="idCardNumber" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control type="password" name="password" />
        </Form.Group>
        <Form.Group controlId="repeat">
          <Form.ControlLabel>Repeat</Form.ControlLabel>
          <Form.Control type="password" name="repeat" />
        </Form.Group>
        <Button className="fluid" type="submit" appearance="primary">
          Login
        </Button>
      </Form>
      <Link to="/">
        <Button className="fluid" appearance="link">
          Already have an acount
        </Button>
      </Link>
    </div>
  );
}
const styles = {
  lineHeight: "200px",
};
