import React from "react";

const ReadOnlyRow = ({ player, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{player.fullName}</td>
      <td>{player.address}</td>
      <td>{player.phoneNumber}</td>
      <td>{player.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, player)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(player.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;