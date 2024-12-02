import React from "react";
import { useNavigate } from 'react-router-dom';
import {Row, Col, Grid} from "antd";
import "../App.css"

const { useBreakpoint } = Grid;

export default function Privacy(){

    const breakpoints= useBreakpoint();
    const jobFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    const headerFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    const subHeaderFontSize=breakpoints.xs?'4vw':'1.5vw';
    const subContentFontSize=breakpoints.xs?'3vw':'1.2vw';
    const navigate=useNavigate();


    return(
        <div className="content" style={{height:"100%"}}>  
            <Row className="privacy-header-container" justify="center" align="middle" style={{fontSize:headerFontSize}} xs={24} sm={24} md={24} xl={24}>
                Multilyser Privacy Policy 
            </Row>
            <Row style={{height:"100%"}} gutter={4} align="top" justify="start">
                <Col xs={24} sm={24} md={3} xl={4}/>
                <Col  xs={24} sm={24} md={21} xl={16} align="middle" style={{padding:"30px"}}>
                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Our Commitment to Your Privacy 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        At Multilyser, your privacy is paramount. We are dedicated to safeguarding the Personal Data we handle, ensuring your personal integrity is respected and protected.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Scope of This Policy  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        This document outlines our practices regarding the use, lawful basis, protection, and rights related to your Personal Data.
                        Multilyser is the data Controller responsible for your data under this Policy.
                        It applies when you interact with us, use our services, or visit our websites: Multilyser.com
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Who This Policy Applies To
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li>Service users</li>
                            <li>Potential clients</li>
                            <li>Website visitors</li>

                        </ul>
                    </div>
                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Definitions
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>Applicable Law:</b> Laws governing Personal Data processing, including GDPR.</li>
                            <li><b>Controller:</b> Entity deciding the purposes and methods of Personal Data processing.</li>
                            <li><b>Data Subject:</b>Individual whose Personal Data is processed.</li>
                            <li><b>Personal Data:</b> Any information related to an identifiable person.</li>
                            <li><b>Processing:</b> Operations performed on Personal Data, such as collection, storage, etc.</li>
                            <li><b>Processor:</b> Entity processing Personal Data on behalf of the Controller.</li>
                            <li><b>The Services:</b>Connecting companies with tech talent and offering remote job opportunities.</li>

                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Our Role as a Controller  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We process Personal Data where we determine the purpose and means.
                        This includes managing user accounts, matching clients with talents, invoicing, and occasionally for marketing purposes.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Data Retention  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We retain Personal Data as long as necessary for its intended purpose, based on contractual terms, consent, legal requirements, or our internal assessments.
                    </div>
                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Your Personal Data and How We Use It 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We process your contact details, usage information, and IP address to improve our services, verify your identity, and communicate with you effectively.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        How We Collect Your Data
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li>Directly from you</li>
                            <li>Via third-party technologies like cookies</li>

                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Lawful Basis for Processing
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li>Performance of a contract</li>
                            <li>Legitimate interests</li>

                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Your Rights
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        You have the right to access, rectify, erase, object, restrict processing, and port your data.
                        You can also withdraw consent for future processing.
                        By using our services, and/or giving us your personal details (such as entering your email address) you give your consent. If you prefer not to, we ask you to update the privacy settings in your browser and not handing any other information to us.
                    </div>

                    

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Exercising Your Rights
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Contact us at hello@multilyser.com for any requests.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Data Transfer
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We share your Personal Data with selected third parties under strict privacy protections.
                        Transfers outside the EU/EEA are safeguarded by EU Commission adequacy decisions, standard contract clauses, or other legal measures.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Security Measures 
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We employ, to the largest extent, both organisational and technical measures to protect your data, including encryption, secure networks, and regular security audits.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Use of Cookies  
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Cookies are used to enhance your user experience. Please see our Cookie Policy.
                    </div>


                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Complaints and Authority Contact
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        If you believe we're not processing your data correctly, you can file a complaint with the Swedish Authority for Privacy Protection at imy@imy.se or visit <a href=" https://www.imy.se/">https://www.imy.se/</a> .
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Policy Changes 
                    </div>
                    
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We may update this policy and will inform you of significant changes affecting your rights or our obligations.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Contact Us 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        For questions or concerns about our data practices, please email hello@multilyser.com.
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