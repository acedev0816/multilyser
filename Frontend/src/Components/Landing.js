import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import { Row, Col,Form, Grid} from 'antd';
import { validate } from 'react-email-validator';
import { useDispatch } from 'react-redux';
import {emailEnteredSuccess} from '../redux/protectedRouteSlice'
const { useBreakpoint } = Grid;

export default function Landing(){

    const [form] = Form.useForm();
    const breakpoints= useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
    const contentTitleFontSize=breakpoints.xs? '5vw':'3.5vw';
    const websiteExplanFontSize=breakpoints.xs ? '4vw':'1.9vw'

    const rightTitleFontsize=breakpoints.xs ? '3.8vw' : "1.6vw";
    const privacyExplanationFontSize=breakpoints.xs ? '3vw':'1.1vw';
    const emailFontSize=breakpoints.xs?'5vw':'1.6vw';
    const alignmentContentTitle=breakpoints.xs? 'center':
                breakpoints.sm && breakpoints.md? 'left':
                breakpoints.sm ? 'center': // Extra Small screens
                breakpoints.md ? 'left' :  // Medium screens
                breakpoints.lg ? 'left' :  // Extra Large screens
                'left';  // Default size (adjust as needed) 
                
    const navigate=useNavigate()
    const dispatch=useDispatch();


    const [email, setEmail]=useState(false)
    const [emailError, setEmailError]= useState("")
    const [emailEntered, setEmailEntered]=useState(false)

    const onEmailChange=(e)=>{
        setEmail(e.target.value)
        const length=e.target.value.length
        
        const isValidEmail=validate(e.target.value);
        console.log(length)
        if(isValidEmail===false&&length!==0) setEmailError("Your Email is not valid.")
        else if(isValidEmail===false&&length===0) setEmailError("Please enter your email.")
        else 
        {
            setEmailError("")
            setEmailEntered(true)
        }        
    }
   

    const confirmEmail=(e) =>{
       
        
        if(emailEntered===true) {
            console.log("confirm Email")
            dispatch(emailEnteredSuccess({emailEntered,email}))

            navigate('/task')
        }
        

    }

    return (
        <div id='content'>

             <Row style={{height:"100%"}} gutter={4} align="middle" justify="center">
              
                
                <Col xs={24} sm={24} md={14} xl={12}>
                    <div class="left-content">
                        <div class="content-title" style={{ textAlign:alignmentContentTitle, fontSize:contentTitleFontSize}}>Run ChatGPT-prompts on</div>
                        <div class="content-title" style={{color:"#FF9D54",textAlign:alignmentContentTitle,fontSize:contentTitleFontSize}}>live website data in bulk</div>
                        <div class="website-expalanation" style={{fontSize:websiteExplanFontSize}}>
                            Multilyser.com all-in-one efficiency tool for anyone
                            needing to run tasks in bulk – <span style={{color:"#FF9D54",textDecoration: "underline"}}>leveraging ChatGPT on live website data.</span>
                        
                        </div>
                        <Form
                                form={form}
                                name="basic"
                                className="ant-form-large"
                                autoComplete="off"
                        >
                            <div class="email-input-group" >
                                <input className="email-input" style={{fontSize:emailFontSize}} placeholder='Enter your email' type='email' onChange={onEmailChange}/>    
                                <button class="email-button" style={{fontSize:emailFontSize}} onClick={confirmEmail} disabled={!(emailEntered&&emailError.length===0)}>Next</button>  
                            </div>
                        </Form>
                        {emailError.length>0 && <p style={{ color:"red", margin:'20px',fontSize:privacyExplanationFontSize }}> {emailError}</p>}
                        <div class="privacy-explanation" style={{fontSize:privacyExplanationFontSize}}> 
                            *By entering your email, you consent to our <a href="/Terms_of_Service.docx" download>T</a>
                            &
                            <a href="/Cookie_Policy.docx" download>C</a> and <a href="/Privacy_Policy.docx" download>Privacy Policy</a>
                            , cheers! 
                        </div>
                    </div>
                </Col>

                <Col xs={24} sm={24} md={10} xl={9} style={{padding: "25px"}}>
                    <div className="right-content">
                        <Row className="right-title" style={{fontSize:rightTitleFontsize}} >
                            We  &nbsp;<b style={{ textDecoration: "underline",fontStyle:"italic"}}>fixed</b>&nbsp; the ChatGPT-limitations:
                        </Row>
                        <Row className="context" style={{fontSize:rightTitleFontsize}}>
                            ✔ Works on any language
                        </Row>
                        <Row className="context" style={{fontSize:rightTitleFontsize}}>
                            ✔ Real time, live data
                        </Row>
                        <Row className="context" style={{fontSize:rightTitleFontsize}}>
                            ✔ Run your prompts in bulk
                        </Row>
                        <Row className="context" style={{fontSize:rightTitleFontsize}}>
                            ✔ Saves weeks of manual labor
                        </Row>
                        
                        <Row className="right-context" style={{fontSize:rightTitleFontsize}}>
                            Your competitors might be using us <br/>
                            – Can you afford not to use multilyser.com?
                        </Row>
                    </div>
                </Col>

               
             </Row>

        </div>
    );
}