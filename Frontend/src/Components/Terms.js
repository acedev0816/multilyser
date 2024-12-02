import React from "react";
import { useNavigate } from 'react-router-dom';
import {Row, Col, Grid} from "antd";
import "../App.css"

const { useBreakpoint } = Grid;

export default function Terms(){

    const breakpoints= useBreakpoint();
    const jobFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    const headerFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    const subHeaderFontSize=breakpoints.xs?'4vw':'1.5vw';
    const subContentFontSize=breakpoints.xs?'3vw':'1.2vw';
    const navigate=useNavigate();


    return(
        <div className="content" style={{height:"100%"}}>  
            <Row className="privacy-header-container" justify="center" align="middle" style={{fontSize:headerFontSize}} xs={24} sm={24} md={24} xl={24}>
                    Multilyser Terms of Use
            </Row>
            <Row style={{height:"100%"}} gutter={4} align="top" justify="start">
                <Col xs={24} sm={24} md={3} xl={4}/>
                <Col  xs={24} sm={24} md={21} xl={16} align="middle" style={{padding:"30px"}}>
            
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <p style={{textAlign:"left"}}>
                            Welcome to Multilyser!
                            Thank you for choosing our services. 
                            These Terms of Use ("Terms") govern your use of Multilyser’s suite of services, and other related software, applications, and websites ("Services"). By using our Services, you enter into a binding agreement with Multilyser, and agree to these Terms, including our Service Terms and arbitration provisions.

                        </p>
                        <p style={{textAlign:"left"}}>Users in the European Economic Area, Switzerland, or the UK are also subject to these Terms.</p>

                        We recommend reviewing our Privacy Policy, which explains our data handling practices, although it's not part of these Terms.

                    </div>


                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Who We Are 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Multilyser is dedicated to advancing AI adoption, aiming to benefit all of humanity but mainly efficiency hackers who want to play around with and leverage AI for boring and tiresome tasks. 
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Registration and Access
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li>
                                <b>Age Requirement:</b>
                                You must be at least 13 years old, or the minimum age required in your country, to use our Services. Users under 18 need parental or guardian consent.
                            </li>
                            <li><b>Account Registration:</b>: Provide accurate, complete information for account creation. Your account is personal; don't share your credentials or allow others access. If you're registering on behalf of someone else or an entity, you must be authorized to accept these Terms on their behalf.</li>

                        </ul>
                    </div>
                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Using Our Services
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>Permitted Use:</b> You're allowed to access and use our Services, provided you adhere to these Terms, all applicable laws, and any additional policies we provide.</li>
                            <li><b>Prohibited Activities</b> Illegal, harmful, immoral or abusive uses are not allowed. This includes rights violations, unauthorized modification, distribution, or reverse engineering of our Services, misrepresenting AI-generated content, breaching security or rate limits, and using our Output to create competing models. You may not use our Services for websites which explicitly prohibits the use of “scraping”-technique or data collection of their content.</li>
                            
                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Corporate Domain
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Accounts created with a corporate email may be integrated into your organization's business account, subject to administrative control.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Third-Party Services 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Our Services may include third-party elements. We aren't responsible for these components, which are subject to their own terms. For example, we use OpenAI’s “ChatGPT” to generate content. By using our Service, you also accept the terms and conditions of OpenAI L.L.C.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Content Responsibilities
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>Your Content:</b> You're responsible for any input ("Input") and corresponding output ("Output") from our Services. Ensure your Content complies with laws and these Terms, and that you have the necessary rights and permissions.</li>
                            <li><b>Ownership of Content:</b> You retain ownership of your Input and the Output, to which we assign any of our rights to you, where possible.</li>
                            <li><b>Similarity and Use of Content:</b> Output may not be unique. We, and ChatGPT, may use your Content to enhance our Services.</li>
                            
                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Accuracy and Liability 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        AI and machine learning are not infallible. Outputs may be inaccurate or inappropriate and should not be the sole basis for (especially ”critical”) decisions.
                        You should never use our services where any wrong information may lead to any form of damage.
                        We do not take any responsibility of the content created through our services, consider this only as “draft” subject to your final “sign-off” before any sort of usage.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Our Intellectual Property 
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Multilyser and its affiliates retain all rights to the Services.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Payment
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>Your Content:</b> You're responsible for any input ("Input") and corresponding output ("Output") from our Services. Ensure your Content complies with laws and these Terms, and that you have the necessary rights and permissions.</li>
                            <li><b>Ownership of Content:</b> You retain ownership of your Input and the Output, to which we assign any of our rights to you, where possible.</li>
                            <li><b>Similarity and Use of Content:</b> Output may not be unique. We, and ChatGPT, may use your Content to enhance our Services.</li>
                            
                        </ul>
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Termination and Suspension
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        We may suspend or terminate your access for Terms violations, legal compliance, or safety concerns. Inactive accounts may also be terminated.
                        You can appeal any suspension or termination by submitting your case to hello@multilyser.com.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Disclaimer of Warranties 
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Our Services are provided "AS IS," without warranties of any kind, except as prohibited by law.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Limitation of Liability
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Our liability is limited to the maximum extent permitted by law.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Indemnity 
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Users will indemnify us against third-party claims related to their use of the Services or any Terms violation.
                    </div>


                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Dispute Resolution
                    </div>

                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        Disputes will be resolved through binding arbitration, with an option to opt-out within 30 days of account creation or Terms updates.
                        We encourage informal dispute resolution before arbitration.
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        Copyright Complaints 
                    </div>
                    
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        If you believe in copyright infringement, please notify us through hello@multilyser.com
                    </div>

                    <div className="sub-title" style={{fontSize:subHeaderFontSize }} >
                        General Terms
                    </div>
                    <div className="sub-content" style={{fontSize:subContentFontSize}} >
                        <ul>
                            <li><b>Assignment:</b>You cannot transfer your rights or obligations under these Terms. </li>
                            <li><b>Changes to Terms or Services:</b> We may update these Terms or Services. </li>
                            <li><b>Governing Law:</b>Swedish Law</li>
                            
                        </ul>
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