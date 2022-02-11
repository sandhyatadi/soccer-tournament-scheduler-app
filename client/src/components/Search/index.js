import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
const Button = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  width: 20vw;
  height: 40px;
  border-radius: 10px;
  font-size: 130%;
  font-weight: 700;
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  background-color: #448a96;
  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
  transition: all 0.5s;
  &:hover {
      background-color: #337180;
    }
  &:active {
      background-color: #88ef9e;
  }
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
const Select = styled.select`
  border: none;
  outline: none;
  background: none;
  font-size: 18px;
  color: #555;
  border: 4px solid #EBEBED;
  padding: 1%;
  margin-top : 1%;
  margin-bottom: 5%;
  border-radius: 25px;
  box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff;
`;
const Div = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  padding : 1%;
`;
const Search = () => {
  const [venues, setvenues] = useState([]);
  const [teams, setteams] = useState([]);
  const [qvenue, setqvenue] = useState();
  const [qteam, setqteam] = useState();
  const [_rows,set_rows] = useState([]);

  useEffect(async () => {
    await axios.post('http://localhost:5000/sendVenue', {
    }).then((response) => {
      setvenues(response.data)
    })
    await axios.post('http://localhost:5000/sendTeams', {
    }).then((response) => {
      setteams(response.data)
    })
  }, [])
  useEffect(() =>{
    console.log('changed rows')
  },[_rows])
  const handleClick = async (event) => {
    await axios.post('http://localhost:5000/searchmatches',{
      venue : qvenue,
      teamname : qteam
    }).then((response) => {
      console.log(response.data[0].schedules)
      set_rows(response.data[0].schedules)
    })
  }
  return (
    <Div>
      <h2>Search</h2>
      <Select type="text" placeholder="Venue" value={qvenue} onChange={e => setqvenue(e.target.value)}>
      <option value=''>Select Venue</option>
            {venues.map(venue => (
              <option value={venue.location}>{venue.location}</option>
            ))}
      </Select>
      <Select type="text" placeholder="Team Name" value={qteam} onChange={e => setqteam(e.target.value)}>
      <option value=''>Select Team</option>
            {teams.map(team => (
              <option value={team.teamName}>{team.teamName}</option>
            ))}
      </Select>
      <Button onClick={handleClick}>Search</Button>
      <h2>Matches</h2>
      <Styles>
        <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>Venue</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
            {_rows.map(row => (
              <tr>
                <td>{row.date}</td>
                <td>{row.teama}</td>
                <td>{row.teamb}</td>
                <td>{row.venue}</td>
                <td>{row.time}</td>
              </tr>
            ))
            }
            </tbody>
        </table>
      </Styles>
    </Div>
  )
}

export default Search
