import React from "react";
import styled from "styled-components";

const Input = styled.input`
    width: 100%;
    height : 5%;
    border: none;
    outline: none;
    background: none;
    color: #555;
    border: 4px solid #EBEBED;
    margin-top : 0%;
    margin-bottom: 1%;
    border-radius: 10px;
    box-shadow: inset 1px 1px 1px #cbced1, inset -8px -8px 8px #fff;
`;
const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <Input
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="fullName"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></Input>
      </td>
      <td>
        <Input
          type="text"
          required="required"
          placeholder="Enter an address..."
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></Input>
      </td>
      <td>
        <Input
          type="text"
          required="required"
          placeholder="Enter a phone number..."
          name="phoneNumber"
          value={editFormData.phoneNumber}
          onChange={handleEditFormChange}
        ></Input>
      </td>
      <td>
        <Input
          type="email"
          required="required"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></Input>
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;