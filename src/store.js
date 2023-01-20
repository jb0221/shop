import { configureStore ,createSlice} from "@reduxjs/toolkit";
import { useResolvedPath } from "react-router-dom";
import userSlice from './../store/userSlice';



let stock = createSlice({
    name : 'stock',
    initialState : [10,20,30]

 })

 let cartItem = createSlice({ 
    name : 'cartItem',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
      ]  
 });
 
export default configureStore({

    reducer: {
        // (중요) : 여기에 등록해야 사용가능
        user : user.reducer ,
        stock :stock.reducer,
        cartItem : cartItem.reducer
    }
})