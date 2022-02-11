
import { Navbar } from '../Navbar'
import React from 'react'
import "./style.css"
const ContactUs = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className = "contact-container">
                <div>
                <h1 className="emboss"> Contact Us</h1>
                </div>
                <div className="contact-content">
                    Mailing Address: 905 N Sunvalley Blvd, Mesa, AZ 85207<br/>
                    If you wish to get in contact with any of our JASS coaches, email us at : jass@gmail.com<br/>
                    If you wish to contact any of our JASS Directors, email us at : director@gmail.com<br/>
                </div>
                <h1 className="emboss"> Game Rules</h1>
                </div>
                <div className="contact-sub-content">   
IFAB currently acknowledges 5 laws of soccer that are the standard for any professional or international match played. They are as follows:<br/>
<br/>
<b>Law 1: The Field of Play</b><br/>
Soccer can be played on either grass or artificial turf, but the surface must be green in color. The field must be rectangular in shape, and distinctly marked by two short goal lines and two long-touch lines. The field is divided into halves, separated by the halfway line, which runs from the midpoints of each touchline. At the midpoint of the halfway line is a marked center point surrounded by a lined center circle with a radius of 10 yards. Opposing players are not allowed to enter this circle during the possessing team’s kick-off. The length of the touch line must be greater than the length of the goal line.<br/>
<br/><b>Law 2: The Ball</b><br/>
A soccer ball must be spherical in shape and made of leather or another comparable medium. Its circumference must be in the range of 27 to 28 inches. This rule is only applicable for official sanctioned matches, as youth leagues often employ the use of a smaller ball that is better suited to children.<br/>
<br/><b>
Law 3: The Number of Players</b><br/>
Matches are generally played by two teams of 11 to a side. The goalkeeper is included in the 11-player total. If a team cannot field at least seven players at match time, the game is a forfeit. Teams of fewer than 11 a side can often be seen in youth leagues where smaller teams are used as a developmental tool. FIFA-sanctioned matches are generally limited to three substitutions per match, with the exception of friendly matches. Most youth leagues allow an unlimited number of substitutions, which must also be listed on the game card prior to the beginning of the match, otherwise those players are ineligible. Substitutions may only enter at the halfway line, upon the referee’s approval, and after the player being subbed out has left the pitch. The goalkeeper may be substituted with anyone on the pitch or any eligible substitute on the bench during a game stoppage.<br/>
<br/>
<b>Law 4: The Players’ Equipment</b><br/>
All players are required to wear a jersey, shorts, shin guards, socks and cleats. The socks must cover the shin guards entirely. If the referee deems a player’s equipment unsatisfactory, the player can be sent off until the issue is remedied.<br/>
<br/>
<b>Law 5: The Referee</b><br/>
The referee is the authority on the field, and his word is law. If you question a referee’s decision, you can be disciplined further simply for dissent.<br/>

</div>
            
    
        </div>
    )
}                               

export default ContactUs
