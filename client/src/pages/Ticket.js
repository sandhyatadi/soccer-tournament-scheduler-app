import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../components/Navbar'
import Seats from '../components/tickets'

const Div = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : space-evenly;
`;
const Ticket = () => {
    return (
        <Div>
            <Navbar></Navbar>
            <Seats></Seats>
        </Div>
    )
}

export default Ticket
