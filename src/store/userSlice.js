import { createSlice } from "@reduxjs/toolkit";


let user = createSlice({   // state 하나를 slice라고 부름
    name : 'user',
    initialState : {name: 'kim', age :20},
    reducers : { 
        changeName(state){
            state.name = 'park'     // obj는 바로 이렇게 수정 가능 그래서 하나라도 obj로 만듦
        },
        increase(state,action){
            state.age  += action.payload
        }
    }
})





   // redux의 state를 변경: state를 수정하는 함수를 만들고 원할 때 그 함수 실행해달라고 store.js에 요청
   // 만든 함수 export 
export let {changeName} = user.actions   // state 변경 함수들이 남음
export default user;