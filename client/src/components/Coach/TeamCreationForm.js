import React, { Fragment, useState,useEffect } from 'react'
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import styled from "styled-components";
import axios from "axios";
const Styles = styled.div`
  padding: 1rem;
  table {
    width : 100%;
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

const Input = styled.input`
    width: 20%;
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
const Div = styled.div`
    margin: 0;
    padding : 0%;
    width: 100vw;
    overflow: hidden;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #555;
    background-color: #ecf0f3;
    box-sizing: border-box;
    padding : 2%;
`;
const TeamCreationForm = () => {
  const [uteamname,setuteamname] = useState();
  const [players, setplayers] = useState([]);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",

    phoneNumber: "",
    email: "",
  });

  const [editplayerId, setEditplayerId] = useState(null);

  useEffect(async() => {
    await axios.post('http://localhost:5000/getTeam',{
      token: JSON.parse(localStorage.getItem("userdetails")).token,
      coachid: JSON.parse(localStorage.getItem("userdetails")).id
    }).then((response)=>{
      console.log(response.data);
      if(response.data.length>0){
      setuteamname(response.data[response.data.length-1].teamName)
      setplayers(response.data[response.data.length-1].team);
      }
  })
  },[])
  
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

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newplayer = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newplayers = [...players, newplayer];
    setplayers(newplayers);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedplayer = {
      id: editplayerId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newplayers = [...players];

    const index = players.findIndex((player) => player.id === editplayerId);

    newplayers[index] = editedplayer;

    setplayers(newplayers);
    setEditplayerId(null);
  };

  const handleEditClick = (event, player) => {
    event.preventDefault();
    setEditplayerId(player.id);

    const formValues = {
      fullName: player.fullName,
      address: player.address,
      phoneNumber: player.phoneNumber,
      email: player.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditplayerId(null);
  };

  const handleDeleteClick = (playerId) => {
    const newplayers = [...players];
    const index = players.findIndex((player) => player.id === playerId);
    newplayers.splice(index, 1);
    setplayers(newplayers);
  };
  const submitPlayers = async() => {
    const loggedInUser = JSON.parse(localStorage.getItem("userdetails"));
      const res = await axios.post('http://localhost:5000/sendteam',{
        coachid : loggedInUser.id,
        teamname : uteamname,
        team : players,
        token : loggedInUser.token
      }).then(response =>{
        console.log('made team')
      })
  };
  return (
    <Div>
  
        <h5>Team Name</h5>
        <Input placeholder="Team Name" value = {uteamname} onChange={e => setuteamname(e.target.value)} ></Input>
      <Styles>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <Fragment>
                {editplayerId === player.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    player={player}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add Players</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Address"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="phone number"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Email"
          onChange={handleAddFormChange}
          name="email"
        />
        <button type="submit">Add</button>
      </form>
      </Styles>
      <br/>
      <button onClick={submitPlayers}>Submit Team</button>
    </Div>
  );
};

export default TeamCreationForm;
