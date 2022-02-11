import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import Coursel from '../components/courosel'
import styled from 'styled-components'

const Div = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-evenly;
    align-items : center;
    height : 200 px;
`;

const Home = () => {
    return (
        <Div>
            <Navbar></Navbar>
            <Coursel></Coursel>
            <Footer></Footer>
        </Div>
    )
}

export default Home
