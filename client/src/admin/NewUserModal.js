import axios from "axios";
import React, { useState } from "react";
import { Checkbox } from "rsuite";
import Register from "../auth/Register";
import ModalWrap from "../commons/ModalWrap";

function NewUserModal({open, handleClose}) {
  const [isAdmin, setIsAdmin] = useState(false);

  const createNewUser = async (user) => {
    await axios.post("/admin/add-user", { ...user });
  };

  return (
    <ModalWrap showFooter={false} title="Izmeni korisnika" open={open} handleClose={handleClose}>
      <Checkbox value={isAdmin} onChange={setIsAdmin} />
      <h5>Da li je admin?</h5>
      <Register
        onSubmit={async(e) => {
            await createNewUser({ ...e, admin: isAdmin })
            handleClose();
        }}
        />
        </ModalWrap>
  );
}

export default NewUserModal;
