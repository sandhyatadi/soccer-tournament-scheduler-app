
import React from 'react'
import { Navbar } from '../Navbar'
import "./style.css"

const FAQ = () => {
    return (
        <div>

            <Navbar></Navbar>
            <h1 className="emboss"> FAQ</h1>
            <div className="faq-container">
                <ul className = "faq-ol">
                    <li className = "faq-li">1.  Do you provide accommodation?</li>
                    <li className = "faq-li sub-li">A.  You can check out the hotels page to view the hotels near the stadium.</li>

                    <li className = "faq-li">2. What do I need to provide to register?</li>
                    <li className = "faq-li sub-li">A. Navigate to the “Register” option, which redirects to a register page. You need to provide an ID proof ( Acceptable IDs are Passport, State ID, Drivers permit)</li>

                    <li className="faq-li">3. Do I need to pay an admission fee to enter the tournament? </li>
                    <li className="faq-li sub-li">A. No admission fee is required. You can book seats online for the tournament matches.</li>

                    <li className="faq-li">4. What to do in case of unexpected weather during the tournament?</li>
                    <li className="faq-li sub-li">A. In the case of unexpected weather including lightning, thunderstorms, windstorms and rain, the match will be suspended. For information on specific policies for your tournament, call the JASS tournament line at 480-572-5079 or kindly direct to the tournament rules.</li>

                    <li className="faq-li">5. What kind of food and beverages do you provide at the tournament?</li>
                    <li className="faq-li sub-li">A. We have several concession stands and a bar, located all around the stadium. The food options include: Pizzas, Sandwiches, Burgers, Donuts, Pretzels, Fries & Beverages. </li>

                    <li className="faq-li">6. Do I need to possess a coaching license to coach at the JASS tournament?</li>
                    <li className="faq-li sub-li">A. Recreational coaches don’t have to provide a license. But a premier coach has to provide their coaching license to be eligible to coach teams in the premier league matches.</li>

                    <li className="faq-li">7. Whom can I contact for help? </li>
                    <li className="faq-li sub-li">A. Click here to view the contacts of JASS directors, coaches and helpline.</li>

                    <li className="faq-li">8. Does JASS provide transportation for the audience? </li>
                    <li className="faq-li sub-li">A. Each individual is responsible for their own transportation to the tournament. Players, coaches, referees and other supporting team members are exempted.</li>

                    <li className="faq-li">9. When do rehearsals take place?</li>
                    <li className="faq-li sub-li">A. Players have rehearsals thrice a week, in the evening. Two of the sessions are done with the team’s coach and the other rehearsal is done under the supervision of a USSF’s D license coach to assess and help the players improve their abilities.</li>

                    <li className="faq-li">10. Do you provide wheelchair assistance for people with disabilities?</li>
                    <li className="faq-li sub-li">A. Yes, wheelchair assistance is provided at the tournament. It is provided on first come, first serve basis, with a rental price of $15 per match(also, a $75 refundable security deposit)</li>
                </ul>
            </div>
        </div>
    )
}

export default FAQ

