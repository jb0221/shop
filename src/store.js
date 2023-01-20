import { configureStore ,createSlice} from "@reduxjs/toolkit";
import { useResolvedPath } from "react-router-dom";

import user from './store/userSlice';


 let cartItem = createSlice({ 
    name : 'cartItem',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1} ],
    reducers : { 
        
        chnageCart(state,action){
           
            state.map((a,i)=>{ 
                 if(a.id==action.payload ){
                     console.log(a.id +" " + a.name);
                     a.count +=1;
                 }

            })
        } 
    } 
 });

 export let {chnageCart } = cartItem.actions  
export default configureStore({

    reducer: {

        user :  user.reducer ,
        cartItem : cartItem.reducer
    }
})