import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  venues
}) => {
  return (
    <tr>
      <td>
        <input
          type="date"
          name="date"
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
          required="required"
          placeholder="TEAM B"
          onChange={handleEditFormChange}
          value={editFormData.teamb}
        />
      </td>
      <td>
        <select
          type="text"
          name="venue"
          required="required"
          placeholder="Enter a Field"
          onChange={handleEditFormChange}
          value={editFormData.venue}
        >
          <option></option>
          {venues.map(venue => (
            <option value={venue.location}>{venue.location}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Referee"
          onChange={handleEditFormChange}
          name="referee"
          value={editFormData.referee}
        />
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