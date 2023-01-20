import userEvent from '@testing-library/user-event';
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { changeName, increase } from '../store/userSlice';
import {chnageCart} from './../store';
// 함수는 import state는 useSelector

function Cart (){ 

    // Redux를 사용하면 컴포넌트들 간의 props 없이 state 공유 가능 react version이 18.1 이상이어야함 (package.json)   
    //npm install @reduxjs/toolkit react-redux
    // 1. src밑에 store.js 생성  2.index.js 가서 <Provider store={store}> 쓰기 

    //let user = useSelector((state)=>{return state})      // ReduxSto./re 가져와줌, Redux store에 있는 모든 state 가져옴 return state.user
   
    let cartItem = useSelector((state)=>{return state.cartItem});

    //let user = useSelector((state)=>{return state.user});
    let state = useSelector((state)=>state);
    let dispatch =useDispatch();
    return(
        <div>
            <h5>{state.user.name}{state.user.age} 의 장바구니</h5>
            <button onClick={()=>{ 
                dispatch(increase(100));
            }}>버튼</button> 
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        cartItem.map((item,idx)=>{
                            return(
                                <tr key={idx}>
                                <td>{(idx)+1}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                                <td>
                                    <button onClick={()=>{ 
                                        dispatch(chnageCart(item.id));
                                    }}>+</button>
                                </td>
                                </tr>
                            )
                        })
                    }   
                    
                </tbody>
            </Table> 
        </div>
    )

}


export default Cart;