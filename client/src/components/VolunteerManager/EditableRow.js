import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  venues,
  volunteers
}) => {
  return (
    <tr>
      <td>
        <input
          type="date"
          name="date"
          disabled
          required="required"
          placeholder="Enter date"
          onChange={handleEditFormChange}
          value={editFormData.date}
        />
      </td>
      <td>
        <input
          type="text"
          name="teama"
          disabled
          required="required"
          placeholder="TEAM A"
          onChange={handleEditFormChange}
          value={editFormData.teama}
        />
      </td>
      <td>
        <input
          type="text"
          name="teamb"
          disabled
          required="required"
          placeholder="TEAM B"
          onChange={handleEditFormChange}
          value={editFormData.teamb}
        />
      </td>
      <td>
      <input
          type="text"
          name="teamb"
          disabled
          required="required"
          placeholder="TEAM B"
          onChange={handleEditFormChange}
          value={editFormData.venue}
        />
      </td>
      <td>
        <select
          type="text"
          name="volunteer"
          required="required"
          placeholder="Enter a Field"
          onChange={handleEditFormChange}
          value={editFormData.volunteer}
        >
          <option></option>
          {volunteers.map(volunteer => (
            <option value={volunteer.name}>{volunteer.name}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="time"
          name="time"
          required="required"
          placeholder="Enter time"
          onChange={handleEditFormChange}
          value={editFormData.time}
        />
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