import styled from "styled-components";
import testImg from './test.png'
import styles from "./ticket.module.css";

const Myimg = styled.img`
    height : 20vh;
    width : 30vw;
    object-fit : cover;
`;

const Seat = styled.li`
    margin : 0.5% 0.5% 0.5% 0.5%;
    border : none;
    height: 35px;
    width: 35px;
    border-radius: 3px;
    background: #e0e5ec;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
    box-shadow:
    -7px -7px 20px 0px #fff9,
    -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002,
    4px 4px 5px 0px #0001,
    inset 0px 0px 0px 0px #fff9,
    inset 0px 0px 0px 0px #0001,
    inset 0px 0px 0px 0px #fff9,
            inset 0px 0px 0px 0px #0001;
    transition:box-shadow 0.6s cubic-bezier(.79,.21,.06,.81);
    font-size: 16px;
    color: rgba(42, 52, 84, 1);
    text-decoration: none;
    margin-top : 0.5%;
    &:active{
    box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
                -4px -4px 6px 0 rgba(116, 125, 136, .2), 
    inset -4px -4px 6px 0 rgba(255,255,255,.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
    }
`;
const Button = styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    width: 20%;
    border-radius: 30px;
    font-size: 130%;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    color: #fff;
    margin-left : 70%;
    margin-top : 2%;
    text-align: center;
    background-color: #448a96;
    height : 8vh;
    box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #fff;
    transition: all 0.5s;
    &:hover {
        background-color: #337180;
    }
    &:active {
        background-color: #88ef9e;
    }
`;

const Seats = () => {
    var names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    names.forEach(element => {
        element = element * 10;
    });
    return (
        <div>
            <h2> Seat booking</h2>
            <div className={styles.gird}>
                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name}>{name}</Seat>;
                        })}
                </div>
                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name*13}>{name*13}</Seat>;
                        })}
                </div>                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name*17}>{name*17}</Seat>;
                        })}
                </div>                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name*19}>{name*19}</Seat>;
                        })}
                </div>
                <Myimg src={testImg}></Myimg>
                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name*23}>{name*23}</Seat>;
                        })}
                </div>
                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name*29}>{name*29}</Seat>;
                        })}
                </div>
                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name*31}>{name*31}</Seat>;
                        })}
                </div>
                <div className={styles.subgird}>
                    {
                        names.map(function (name, index) {
                            return <Seat key={name*37}>{name*37}</Seat>;
                        })}
                </div>
               
            </div>
            <Button >Book</Button>
        </div>
    )
}

export default Seats
