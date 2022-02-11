import React from 'react'
import TeamCreationForm from './TeamCreationForm'
import Upcoming from './Upcoming';
import { useState } from 'react';
import Past from './Past';
import axios from 'axios';
import styled from 'styled-components'

const Div = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-evenly;
    align-items : center;
`;
const Coach = () => {
    return (
        <Div>
           <TeamCreationForm></TeamCreationForm>
            <Upcoming></Upcoming>
            <Past></Past>
        </Div>
    )
}

export default Coach
