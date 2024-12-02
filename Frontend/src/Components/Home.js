import React, { useState, useEffect } from "react";
import { Form, Slider, Input, Button, Select} from 'antd';
import PaymentModal from "./PaymentModal";
// import { Label } from "@material-ui/icons";
const { TextArea } = Input;
const marks = {
  1: 'Specific',
  5: 'Balanced',
  10: 'Wide',
  20: 'Extended',
};



export default function Home() {
  
  const [form] = Form.useForm();
  const [open, setOpen] =useState(false);
  const [clientReady, setClientReady] = useState(false)
  const [urls, setUrl] =useState([])
  const [slider, setSlider]= useState(5);
  const [question, setQuestion]= useState("")
  const [email, setEmail]=useState(false)
  const [error, setError]= useState(false)

  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0)

  const markValues = Object.keys(marks).map(Number);
  const step = Math.max(...markValues); // Set step to the maximum difference between mark values


  useEffect(() => {
    setClientReady(true)
  }, [])

  useEffect(() => {
    console.log("url_count:",count)
    if(count!==0) onCalculatePrice(count,slider)
  }, [count, slider])
  const openModal=(data)=>{
      setOpen(data);
  }

  const showmodal=()=>{
   
      setOpen(!open)
  }

  const onFinish = ()=>{
      console.log("success!")
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onCalculatePrice =(count, slider) => {
      fetch("/calculate_price", {
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
  const onUrlChange=(e)=>{
   
    let url_list=e.target.value
    url_list = url_list.split('\n').filter(str => str !== "");
    setUrl(url_list)
    const count= url_list.length;
    setCount(count)
    if(count>1000) setError(true)
    else setError(false)
  }

  const onSliderChange=(value)=>{
      setSlider(value)

  }

  const onQuestionChange=(e)=>{
      setQuestion(e.target.value)
  }
  const onEmailChange=(e)=>{
     setEmail(e.target.value)
  }



  return (
    <div>
        <h1 className="app-title">Ask me anything</h1>
        <Form
          form={form}
          name="basic"
          className="ant-form-large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="url"
            rules={[
              {
                required: true,
                message: 'Please input Domains!',
              },
            ]}
          >
            <TextArea onChange={onUrlChange} className="url-input-form" placeholder="Write input URLs here."  rows={7} />
            
          </Form.Item>
          {error && <p style={{ color:"red"}} >*You must enter less than 1000 urls</p>}
          <p className="domain-count">How many pages are you going to scrape per url?</p>
          <Form.Item
            name="slide"
          >
            <Slider initialValue={1} onChange={onSliderChange} min={1} max={20} step={step} defaultValue={slider}/>
            {/* <Slider initialValue={1} onChange={onSliderChange} min={1} max={20} step={step} marks={marks} defaultValue={slider}/> */}
          </Form.Item>
          

          <Form.Item
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
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input placeholder="Write your email here." onChange={onEmailChange}/>
          </Form.Item>
          <Form.Item>
            {/* <div style={{textAlign:"center"}}>
              <label><b>Total Price:{price} USD</b></label>
            </div> */}
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                className="get-answers"
                htmlType="submit"
                onClick={showmodal}
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(['url', 'prompt', 'email'], true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length||
                  error
                }
              >
                Get Answers
              </Button>
            )}
          </Form.Item>
        </Form>
      <PaymentModal
        open={open}
        openModal={openModal}
        urls={urls}
        slider={slider}
        question={question}
        email={email}
      >
      </PaymentModal>

      
    </div>
  );
}