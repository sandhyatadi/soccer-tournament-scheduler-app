import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
const Past = () => {
  const [matches, setmatches] = useState([])

  useEffect(() => {
    axios.post('http://localhost:5000/sendallmatches', {
      token: JSON.parse(localStorage.getItem("userdetails")).token
    }).then((response) => {
      const arr = response.data[0].schedules
      var l = arr.length;
      if (l > 0) {
        for (var i = 0; i < l; ++i) {
          arr[i].date = new Date(arr[i].date)
        }
        const sarr = arr.slice().sort(function (a, b) {
          return b.date - a.date;
        });
        var today = new Date();
        var cdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        console.log(sarr[0].date)
        var c = 0;
        console.log('cdate', cdate)
        while (new Date(sarr[c].date).getDate() < today.getDate()) {
          c++;
        }
        var tname;
        axios.post('http://localhost:5000/getteamname',{
            token:JSON.parse(localStorage.getItem("userdetails")).token,
            coachid : JSON.parse(localStorage.getItem("userdetails")).id
        }).then((response)=>{
            console.log('udfdsuf',response.data);
            tname = response.data;
        })
        console.log('i', c)
        var farr = sarr.slice(c,l)
        var narr = []
        for(var j = 0 ;j < farr.length; ++j){
          if(farr.teama === tname)
          narr.push(farr[j])
        }
      
      
        console.log(farr)
        setmatches(narr);
      }
    })
  }, [])
  return (
    <div>
      <h2>Upcoming Matches</h2>
      <Styles>
        <table>
          <thead>
            <tr>
              <th>Opponent</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(row => (
              <tr>
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
    </div>
  )
}

export default Past
