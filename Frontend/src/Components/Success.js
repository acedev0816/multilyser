import React, {useEffect} from "react";
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Grid} from "antd";

import "../App.css";
const { useBreakpoint } = Grid;

export default function Success() {
    const paymentStatus = useSelector((state)=> state.protect.paymentStatus);
    const navigate=useNavigate();

    useEffect(()=>{
        console.log("paymentStatus:",paymentStatus)
    },[paymentStatus])

    const breakpoints= useBreakpoint();
    const jobFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    // const rightTitleFontsize=breakpoints.xs ? '3.8vw' : "1.6vw";
    
    return(
        <div className="content" style={{height:"100%"}}>  
            <Row style={{height:"100%"}} gutter={4} align="middle" justify="center">
                <Col xs={24} sm={24} md={4} xl={6}/>
                <Col  xs={24} sm={24} md={16} xl={12} align="middle" style={{padding:"30px"}}>
                    <div style={{fontSize:jobFontSize, fontWeight:"bolder", textAlign:"left", color:"#666666"}} >Job successfully sent, we will send you the delivery to your email within a few hours.</div>
                
                    <button
                        className="job-button"
                        
                        onClick={()=>{navigate("/")}}
                        style={{padding:"20px", fontSize:jobFontSize}}
                    >   
                                Create New Order
                    </button>
                </Col>
                <Col xs={24} sm={24} md={4} xl={6}/>
                
           </Row>
             
            
        </div>
      
    )
}