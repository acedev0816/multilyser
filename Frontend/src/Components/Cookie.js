import React from "react";
import { useNavigate } from 'react-router-dom';
import {Row, Col, Grid} from "antd";
import "../App.css"

const { useBreakpoint } = Grid;

export default function CookiePolicy(){

    const breakpoints= useBreakpoint();
    const jobFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    const headerFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    const subHeaderFontSize=breakpoints.xs?'4vw':'1.5vw';
    const subContentFontSize=breakpoints.xs?'3vw':'1.2vw';
    const navigate=useNavigate();


    return(
        <div className="content" style={{height:"100%"}}>  
            <Row className="privacy-header-container" justify="center" align="middle" style={{fontSize:headerFontSize}} xs={24} sm={24} md={24} xl={24}>
                Multilyser Cookie Policy 
            </Row>
            <Row style={{height:"100%"}} gutter={4} align="top" justify="start">
                <Col xs={24} sm={24} md={3} xl={4}/>
                <Col  xs={24} sm={24} md={21} xl={16} align="middle" style={{padding:"30px"}}>
                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Introduction  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        At Multilyser.com, we enhance your digital experience through the use of cookies and similar tracking technologies. This Cookie Policy explains our use of cookies on our website(s).
                        Please refer to our Privacy Policy for details on how we handle personal data in relation to cookies.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Understanding Cookies  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Cookies are small text files stored on your device when you visit our website.
                        They help recognize your device on subsequent visits, enabling essential functions and tracking user interactions.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Types of Cookies
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>Session Cookies:</b> Temporary cookies deleted when you close your browser.</li>
                            <li><b>Permanent Cookies:</b> Remain on your device post-browser closure, persisting for the duration specified within the cookie or until manually deleted.</li>

                        </ul>
                    </div>
                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Our Use of Cookies
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>Preference Cookies:</b> Remember your website choices (like username, language) and personalize your experience.</li>
                            <li><b>Marketing Cookies:</b> Collect interaction data to enhance our communication and your overall experience. These cookies, often set by third parties, support ad performance, user profiling, and targeted advertising.</li>
                            <li><b>Other Tracking Technologies:</b>Includes embedded transparent images in webpages or emails, capturing data like IP addresses, device info, and location.</li>

                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        First-Party and Third-Party Cookies  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>First-Party Cookies:</b>Set directly by our website, readable only by us.</li>
                            <li><b>Third-Party Cookies: </b> Set by external parties when you visit our website. We use reputable third parties (e.g., Google Analytics, LinkedIn) for insights and effective marketing. These cookies might be used on other sites and are governed by their respective policies.</li>

                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Managing Cookies 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <p style={{textAlign:"left"}}>
                            Upon your first visit, we’ll request consent for non-essential cookies. You can withdraw consent or adjust settings at any time via your browser (usually found under “Help,” “Settings,” or “Edit”). Restricting cookies might limit access to certain website functionalities.
                        </p>
                        By using our services, and/or giving us your personal details (such as entering your email address) you give your consent. If you prefer not to, we ask you to update the privacy settings in your browser and not handing any other information to us.
                    </div>
                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Policy Updates  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We may update this Cookie Policy. Significant changes affecting your rights or our obligations will be generally not be communicated in advance.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Contact Us 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        For queries about our cookie usage, email hello@multilyser.com.
                    </div>

                   

                    <button
                        className="job-button"
                        
                        onClick={()=>{navigate("/")}}
                        style={{padding:"20px", fontSize:jobFontSize}}
                    >   
                                Go to First Page.
                    </button>
                </Col>
                <Col xs={24} sm={24} md={3} xl={4}/>
                
           </Row>
             
            
        </div>
      
    )
}