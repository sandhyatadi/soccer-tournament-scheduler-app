import React from "react";

const ReadOnlyRow = ({ schedule, handleEditClick, handleDeleteClick }) => {
  if(schedule) {
  return (
    <tr>
      <td>{schedule.date}</td>
      <td>{schedule.teama}</td>
      <td>{schedule.teamb}</td>
      <td>{schedule.venue}</td>
      <td>{schedule.volunteer}</td>
      <td>{schedule.time}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, schedule)}
        >
        Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(schedule.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
else
{
  return (<h4> No teams scheduled yet!!</h4>)
}
};
export default ReadOnlyRow;