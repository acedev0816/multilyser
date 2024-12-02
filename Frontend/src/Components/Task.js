import React, { useState, useEffect } from "react";
import 'antd/dist/reset.css';
import { Row, Col, Slider,Input,Form, Grid} from 'antd';
import PaymentModal from "./PaymentModal";
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { useBreakpoint } = Grid;


const marks = {
    1: 'Specific',
    5: 'Balanced',
    10: 'Wide',
    20: 'Extended',
};


export default function Task(){

    const [form] = Form.useForm();

    const breakpoints= useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
    const contentTitleFontSize=breakpoints.xs? '5vw':'3.5vw';


    const rightTitleFontsize=breakpoints.xs ? '3.9vw' : "1.8vw";
    const privacyExplanationFontSize=breakpoints.xs ? '3.5vw':'1.1vw';
    const explanationFontSize=breakpoints.xs?'4.0vw':'1.8vw';
    const jobFontSize=breakpoints.xs?'4.5vw':'1.8vw';
    const alignmentContentTitle=breakpoints.xs? 'center':
                breakpoints.sm && breakpoints.md? 'left':
                breakpoints.sm ? 'center': // Extra Small screens
                breakpoints.md ? 'left' :  // Medium screens
                breakpoints.lg ? 'left' :  // Extra Large screens
                'left';  // Default size (adjust as needed)   
    const markValues = Object.keys(marks).map(Number);
    const step = Math.max(...markValues); // Set step to the maximum difference between mark values
    
    const [open, setOpen] =useState(false);
    const [urls, setUrl] =useState([])
    const [slider, setSlider]= useState(5);
    const [question, setQuestion]= useState("")
    const [saveTime, setSaveTime] =useState(0)
    const [saveDay, setSaveDay] = useState(0)
    
    const [urlError, setUrlError]= useState(false)
    const [questionError, setQuestionError]= useState(false)

    const email = useSelector((state)=> state.protect.email)
    const [urlCount, setCount] = useState(0);
    const [price, setPrice] = useState(0)


    

    useEffect(() => {
        console.log("url_count:",urlCount)
        if(urlCount!==0) onCalculatePrice(urlCount,slider)
    }, [urlCount, slider])

    
    const onFinish = ()=>{
            console.log("success!")
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onUrlChange=(e)=>{
   
        let url_list=e.target.value
        url_list = url_list.split('\n').filter(str => str !== "");

        setUrl(url_list)
        setCount( url_list.length)
        onCalculateSaveTime(url_list.length, slider)

        if(url_list.length===0) {
           
            setSaveTime(0)
            setSaveDay(0)
            setPrice(0)
            console.log("url error!!!!")
        } 

        if(url_list.length>500) {
            setUrlError(true)
        }
        else {
            setUrlError(false)
            console.log("url success!")
        }

       
    }

    const onSliderChange=(value)=>{
        setSlider(value)
        onCalculateSaveTime(urlCount,value)
  
    }

    
    const onQuestionChange=(e)=>{
        setQuestion(e.target.value)
        console.log("question:",e.target.value)
        if(e.target.value.length===0) setQuestionError(true)
        else setQuestionError(false)
    }

    const onCalculatePrice =(count, slider) => {
        fetch("https://app.multilyser.com/calculate_price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
                      { 
                          count: count,
                          slider:slider,
                      }
                ),
        })
          .then((res) => res.json())
          .then((data) => {
              console.log(data)
              setPrice(data.amount)
        });
  
    }

    const onCalculateSaveTime= (urlcount, pagecount) =>{
        const savedTime=urlcount*pagecount*15/3600
        const roundedTime = parseFloat(savedTime.toFixed(1));
        
        if(roundedTime!==0){
            const savedDay= roundedTime/8;
            const roundedDay = parseFloat(savedDay.toFixed(1))
            console.log("saveday:",savedDay,roundedTime)
            setSaveTime(roundedTime)
            setSaveDay(roundedDay)
        }
    

    }
    const openModal=(data)=>{
        setOpen(data);
    }

    const showModal=()=>{
   
        setOpen(!open)
    }
    return (
           
        <div id='content'>

             <Row style={{height:"100%"}} gutter={4} align="middle" justify="center">
              

                <Col xs={24} sm={24}  md={14} xl={12}>
                    <div class="left-content">
                        <div class="content-title" style={{ textAlign:alignmentContentTitle, fontSize:contentTitleFontSize}}>
                            Task Configuration
                        </div>
                        <div class="website-expalanation" style={{fontSize:explanationFontSize}}>
                                Which domains’ content do you want us to analyze and base our answers on?
                        </div>
                        <Form 
                            form={form}
                            name="basic"
                            className="ant-form-large"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item shouldUpdate
                                name="url"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please enter urls!',
                                },
                                ]}
                            >   
                                <div className="url-container">

                                    <TextArea onChange={onUrlChange} className="url-input-form" placeholder="Write input URLs here."  rows={4} style={{resize:"none"}} />
                                </div>
                                
                            </Form.Item>
                            {urlError && <p style={{ color:"red" , fontSize:"1.2vw", textAlign:"right"}}>*You must enter less than 500 urls</p>}
                            <div class="website-expalanation" style={{fontSize:explanationFontSize}}>
                                How widely do you want us to look for content?
                            </div>

                            <Form.Item 
                                name="slide"
                            >
                                <Slider initialValue={1} onChange={onSliderChange} min={1} max={20} step={step} marks={marks} defaultValue={slider}/>
                            </Form.Item>
                            
                            <div class="website-expalanation" style={{fontSize:explanationFontSize, paddingTop:"5%", paddingBottom:"2%"}}>
                                What do you want us to do?
                            </div>

                            <Form.Item shouldUpdate
                                name="prompt"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input your question!',
                                },
                                ]}
                            >
                                <Input placeholder="Write your question here." onChange={onQuestionChange} className="question-form"/>
                            </Form.Item>
                        </Form>

                    </div>

                </Col>

                <Col xs={24} sm={24} md={10} xl={9} style={{padding: "25px"}}>
                    <Row className="right-content">
 
                        <Row className="context" style={{fontSize:rightTitleFontsize, paddingTop:"5%"}}>
                            ✔  We will fetch and analyze content from {urlCount*slider} pages.
                        </Row>
                        <Row className="context" style={{fontSize:rightTitleFontsize}}>
                            ✔  This will save you ≈ {saveTime} hrs (≈ {saveDay} working days!)
                        </Row>
                        <Row className="context" style={{fontSize:rightTitleFontsize}}>
                            ✔  Your total cost will be ${price}.
                        </Row>
                        
                        <Row className="right-context" style={{fontSize:rightTitleFontsize, paddingTop:"8%"}} justify="center">
                            Your competitors might be using us <br/>
                            – Can you afford not to use
                            multilyser.com?
                        </Row>

                       
                    </Row>
                    <Row className="button-container" align="middle" justify='center'>
                        <button class="job-button" style={{fontSize:jobFontSize}} onClick={showModal}
                            disabled={ !form.isFieldsTouched(['url', 'prompt'], true)||
                                       urlError||questionError}
                            
                            >
                            Submit Job & Proceed to Payment
                        </button>
                        {   
                          
                            console.log(questionError,urlError, questionError||urlError)
                        }  
                    </Row>
                    <Row>
                    <div class="privacy-explanation" style={{fontSize:privacyExplanationFontSize,paddingTop:'0px'}}> 
                            *By entering your email, you consent to our <a href="/terms">T</a>
                            &
                            <a href="/cookie-policy">C</a> and <a href="/privacy-policy">Privacy Policy</a>
                            , cheers! 
                    </div>
                    </Row>
                </Col>
             </Row>
             
             <PaymentModal
                open={open}
                openModal={openModal}
                urls={urls}
                slider={slider}
                question={question}
                email={email}
              />
            
              
        </div>

       
    );
}