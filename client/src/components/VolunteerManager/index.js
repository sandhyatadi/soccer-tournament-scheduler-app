import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import styled from "styled-components";
import axios from "axios";

const Div = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  padding : 2%;
`;
const Styles = styled.div`
  padding: 1rem;
  table {
    width : 70vw;
    border-radius: 25px;
    box-shadow: -8px -8px 8px #fff,8px 8px 8px #cbced1;
    border: 1px solid #EBEBED;
    tr {
      :last-child {
        td {
          border-bottom: 0;/
        }
      }
    }
    button {
        cursor: pointer;
        width: 100%;
        border-radius: 5px;
        font-weight: 700;
        font-family: 'Lato', sans-serif;
        color: #fff;
        text-align: center;
        background-color: #448a96;
        transition: all 0.5s;
        &:hover {
            background-color: #337180;
          }
        &:active {
            background-color: #88ef9e;
        }
    }
    th{
        background-color : #EBEBED;
        border-radius : 25px;
    },
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 2px solid #EBEBED;
      border-right: 2px solid #EBEBED;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const VolunteerManager = () => {
  const [_rows, set_rows] = useState([]);
  const [teams, setteams] = useState([]);
  const [volunteers, setvolunteers] = useState([]);

  const [addFormData, setAddFormData] = useState({
    teama: "",
    teamb: "",
    date: "",
    time: "",
    venue: "",
    volunteer: ""
  });

  const [editFormData, setEditFormData] = useState({
    teama: "",
    teamb: "",
    date: "",
    time: "",
    venue: "",
    volunteer: ""
  });

  const [edit_rowId, setEdit_rowId] = useState(null);
  const [venues, setvenues] = useState([]);
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  };


  // console.log(JSON.parse(localStorage.getItem("userdetails")).token);
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const new_row = {
      id: nanoid(),
      teama: addFormData.teama,
      teamb: addFormData.teamb,
      date: addFormData.date,
      time: addFormData.time,
      volunteer: addFormData.volunteer,
      venue: addFormData.venue
    };
    console.log(new_row.time)
    const new_rows = [..._rows, new_row];
    set_rows(new_rows);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const edited_row = {
      id: edit_rowId,
      date: editFormData.date,
      venue: editFormData.venue,
      teama: editFormData.teama,
      teamb: editFormData.teamb,
      time: editFormData.time,
      volunteer:editFormData.volunteer
    };

    const new_rows = [..._rows];

    const index = _rows.findIndex((_row) => _row.id === edit_rowId);

    new_rows[index] = edited_row;

    set_rows(new_rows);
    setEdit_rowId(null);
  };

  const handleEditClick = (event, _row) => {
    event.preventDefault();
    setEdit_rowId(_row.id);

    const formValues = {
      teama: _row.teama,
      teamb: _row.teamb,
      date: _row.date,
      time: _row.time,
      venue: _row.venue,
      volunteer: _row.volunteer
    };

    setEditFormData(formValues);
  };
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("userdetails")).token)
    axios.post('http://localhost:5000/sendVenue', {
      token: JSON.parse(localStorage.getItem("userdetails")).token
    }).then((response) => {
      setvenues(response.data)
      console.log(response)
    })
    axios.post('http://localhost:5000/sendTeams', {
      token: JSON.parse(localStorage.getItem("userdetails")).token
    }).then((response) => {
      setteams(response.data)
      console.log(response)
    })
    axios.post('http://localhost:5000/sendallvolunteers', {
      token: JSON.parse(localStorage.getItem("userdetails")).token
    }).then((response) => {
      setvolunteers(response.data)
      console.log('vols',response.data)
    })
    axios.post('http://localhost:5000/sendallmatches',{
      token: JSON.parse(localStorage.getItem("userdetails")).token
    }).then((response) => {
      const arr = response.data[0].schedules
      var l = arr.length;
      if(l > 0){
      for(var i = 0; i < l ; ++i) {
        arr[i].date = new Date(arr[i].date)
      }
      const sarr = arr.slice().sort(function(a,b){
        return b.date - a.date;
      });
      for(i = 0; i < l; i++) {
        sarr[i].date = sarr[i].date.toDateString().substring(0,10)
      }
      set_rows(sarr);
    }})
  }, []);

  const handleCancelClick = () => {
    setEdit_rowId(null);
  };

  const handleDeleteClick = (_rowId) => {
    const new_rows = [..._rows];

    const index = _rows.findIndex((_row) => _row.id === _rowId);

    new_rows.splice(index, 1);

    set_rows(new_rows);
  };
  const handleformsubmit = async (e) => {
    await axios.post('http://localhost:5000/addschedules', {
      token: JSON.parse(localStorage.getItem("userdetails")).token,
      schedules: _rows
    }).then((response)=>{
      console.log(response)
    })
  }

  return (
    <Div>
      <h2>Schedule Events</h2>

      <Styles>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>Venue</th>
                <th>volunteer</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {_rows.map((_row) => (
                <Fragment>
                  {edit_rowId === _row.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      venues={venues}
                      volunteers={volunteers}
                    />
                  ) : (
                    <ReadOnlyRow
                      schedule={_row}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      <h4>Add to Schedule</h4>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="date"
            name="date"
            required="required"
            placeholder="Enter date"
            onChange={handleAddFormChange}
          />

          <select
            type="text"
            name="teama"
            required="required"
            placeholder="TEAM A"
            onChange={handleAddFormChange}
          >
            <option>Team A</option>
            {teams.map(venue => (
              <option value={venue.teamName}>{venue.teamName}</option>
            ))}
          </select>
          <select
            type="text"
            name="teamb"
            required="required"
            placeholder="TEAM B"
            onChange={handleAddFormChange}
          >
            <option>Team B</option>
            {teams.map(venue => (
              <option value={venue.teamName}>{venue.teamName}</option>
            ))}
          </select>
          <select
            type="text"
            name="venue"
            required="required"
            placeholder="Enter a Field"
            onChange={handleAddFormChange}
          >
            <option>Select Venue</option>
            {venues.map(venue => (
              <option value={venue.location}>{venue.location}</option>
            ))}
          </select>
          <select
            type="text"
            required="required"
            placeholder="volunteer"
            onChange={handleAddFormChange}
            name="volunteer"
          >
            <option>Select volunteer</option>
            {
              volunteers.map(ref => (
                <option value={ref.name}>{ref.name}</option>
              ))}
          </select>
          <input
            type="time"
            name="time"
            required="required"
            placeholder="Time"
            onChange={handleAddFormChange}
            name="time"
          />
     
          <button type="submit">Add</button>
        </form>
      </Styles>
      <br></br>
      <button type="button" onClick={handleformsubmit}> Set Schedule</button>
    </Div>
  );
};

export default VolunteerManager;