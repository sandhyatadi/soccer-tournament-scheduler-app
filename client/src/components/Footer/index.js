import { Fcons } from "./Fcons";
import "./footer.css";

function Footer() {
    return (
        <div className="foot-outer-box">
            <Fcons onClick={(e) => {
                e.preventDefault();
                window.open('http://twitter.com', "_blank");
            }}>
                <i className="fab fa-twitter" Style="color: #00acee;"></i>
            </Fcons>
            <Fcons onClick={(e) => {
                e.preventDefault();
                window.open('http://facebook.com', "_blank");
            }}>
                <i class="fab fa-facebook-f" color="#3b5998"></i>
            </Fcons>
            <Fcons onClick={(e) => {
                e.preventDefault();
                window.open('https://dribbble.com', "_blank");
            }}> 
                <i className="fab fa-dribbble" Style="color: #ea4c89;"></i>
            </Fcons>
            <Fcons onClick={(e) => {
                e.preventDefault();
                window.open('https://www.linkedin.com', "_blank");
            }}>
                <i class="fab fa-linkedin-in" Style="color:#0e76a8;"></i>
            </Fcons>
            <Fcons onClick={(e) => {
                e.preventDefault();
                window.open('https://gmail.com', "_blank");
            }}>
                <i class="far fa-envelope"></i>
            </Fcons>
            <Fcons onClick={(e) => {
                e.preventDefault();
                window.open('https://getpocket.com', "_blank");
            }}> 
                <i class="fab fa-get-pocket" Style="color:#ee4056;"></i>
            </Fcons>
        </div>
    );
}

export default Footer;