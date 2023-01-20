import userEvent from '@testing-library/user-event';
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase } from './../store/userSlice';
function Cart (){ 

    // Redux를 사용하면 컴포넌트들 간의 props 없이 state 공유 가능 react version이 18.1 이상이어야함 (package.json)   
    //npm install @reduxjs/toolkit react-redux
    // 1. src밑에 store.js 생성  2.index.js 가서 <Provider store={store}> 쓰기 

    //let user = useSelector((state)=>{return state})      // ReduxSto./re 가져와줌, Redux store에 있는 모든 state 가져옴 return state.user
   
    let cartItem = useSelector((state)=>{return state.cartItem});
    let user = useSelector((state)=>{return state.user});
    let dispatch =useDispatch();
    return(
        <div>
            {user} 의 장바구니
            <button  onClick={()=>{
                dispatch(increase());
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
                                        dispatch(changeName());
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