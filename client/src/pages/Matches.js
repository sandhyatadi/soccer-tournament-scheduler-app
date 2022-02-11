import React from 'react'
import styled from 'styled-components'
import Ads from '../components/Ads'
import Match from '../components/matches'
import { Navbar } from '../components/Navbar'

const DIV = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : space-evenly;
`;
const Matches = () => {
    return (
        <DIV>
            <Navbar></Navbar>
            <h2>Upcoming Matches</h2>
            <Ads></Ads>
            <h2> Schedules </h2>
            <Match></Match>
        </DIV>
    )
}
export default Matches