import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPayment =createAsyncThunk('payment/confirmPayment',async(urls,slider,question, email, model,payment_intent)=>{

    // const response=fetch("/get-websites-summarize", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(
    //                 { 
    //                     urls,
    //                     slider,
    //                     question,
    //                     email:props.email,
    //                     payment_intent:payment_intent_id,
    //                     model:props.model
            
    //                  }
    //           ),
    // })
    
    // return response.data
})

export const protectedRouteSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentStatus:false,
    emailStatus:false,
    email:""
  },
  reducers: {
    paymentConfirmSuccess: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.paymentStatus = true
    },
    paymentConfirmFasle: state => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.paymentStatus = false
      },

    emailEnteredSuccess: (state, action) =>{
       const {emailEntered, email}=action.payload 
       console.log("eamil status", emailEntered)
       console.log(action.payload)
       state.emailStatus =emailEntered
       state.email = email
    }
  }

})

// Action creators are generated for each case reducer function
export const { paymentConfirmSuccess,paymentConfirmFasle, emailEnteredSuccess } = protectedRouteSlice.actions

export default protectedRouteSlice.reducer