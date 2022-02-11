import React from 'react'
import Replay from '../components/Replays'
import styled from 'styled-components'
const Div = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : space-around;
`;
const ReplayPage = () => {
    return (
        <Div>
            <Replay></Replay>
            <h3>Highlight Reels</h3>
        </Div>
    )
}

export default ReplayPage
