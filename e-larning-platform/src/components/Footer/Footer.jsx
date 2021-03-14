import React, { useCallback, useEffect, useState } from "react"
import "../Auth/login.css";

const Footer = () => {


	return (
		
		<footer>
              <hr />
             <ul>
                 <li>
                     <a className="footer-link" href="https://www.linkedin.com/hp/?trk=learning_login_linkedin" >
                         <img src="https://static-exp1.licdn.com/sc/h/9l9jpbbo1quwqsej3vu7hzj10" alt="LinkedIn Logo"/>
                             <span>©&nbsp;2021</span>
                         </a>
                 </li>
                 <li>
                 <a className="footer-link"  href="https://about.linkedin.com?trk=learning_login_about" >About</a>
                 </li>
                 <li>
                 <a className="footer-link" href="https://www.linkedin.com/help/learning?trk=learning_login_help" >Help</a>
                 </li>
                 <li>
                 <a className="footer-link" href="https://www.linkedin.com/learning/?trk=learning_login_visit_linkedin_learning" >Visit LinkedIn Learning</a>
                 </li>
             </ul>
              </footer>
		
	)
}

export default Footer
