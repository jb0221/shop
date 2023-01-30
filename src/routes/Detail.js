import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';    
import {Context1} from './../App.js';

let YellowBtn = styled.button`
    background: ${props =>props.bg};
    color : ${props => props.bg =="blue" ? 'white' : 'black'};
    padding : 10px
`

styled.button(YellowBtn)  
 // yellowBtn 속성 복사하고 싶을 때 
 // app.css는 app.js뿐 아니라 detail.js에도 영향 app.js에만 주고 싶으면 app.module.css로 만들기   
function Detail (props){ 

    let {재고} = useContext(Context1);       // object로 받음
    // component가 mount-update-unmount 되는데 그 중 mount, update 될 때 실행됨 
    // useEffect 안에 있는 코드는 html 렌더링 이후에 동작함
    useEffect(()=>{
        
        let a = setTimeout(() => { setTimer(true); }, 2000);
        
        return ()=>{  clearTimeout(a)}
        // retun 이 먼저 실행되는데 이걸 clean up function 이라고 하고
        //  mount될 때 실행 안됨 unmount될때만 실행됨 
        // unmount 되는 건 component가 삭제되는 것을 의미, 다른 페이지로 넘어갈 때

    });

    // useEffect는 mount, state업데이트 시 실행되는데 함수뒤에 [] 넣으면 최초 1번만
    // count state가 변경될 때만 useEffect가 실행되게 하려면 [count]추가 
    // useEffect에 retrun을 넣을 수 있는데 그러면 useEffect동작 전에 return 실행
    // useEffect 안에서 데이터 요청 

    //  useEffect(()=>{})      1. 재렌더링 될 때 마다 코드 실행하고 싶으면
    //  useEffect(()=>{},[])   2. mount 시 1회 코드 실행하고 싶으면 
    /*  useEffect(()=>{        3. unmount 시 1회 코드 실행하고 싶으면 (컴포넌트가 삭제될 때)
        return ()=>{ }
    })     */
    
    // 4. useEffect 실행 전에 코드 클린 업 하고 싶을 때
    // 5. useEffect 가 특정 state 업데이트 시에만 실행하고 싶을 때
    let {id} = useParams();
    let 찾은상품  = props.shoes.find(x=> x.id == id);
    let [count,setCount] = useState(0);
    let [timer, setTimer] = useState(false);
    let inputVal = useRef();
    let [onlyNum,setOnlyNum] = useState(true);
    let [tab,setTab] = useState(0);
    let [detailFade, setDetailFade] = useState('');


    useEffect(()=>{
        setDetailFade('end')
        return ()=>{  setDetailFade('')}
    }, [])  // 최초 한 번만이니깐, 

    useEffect(()=>{
        console.log("onlyNum useEffect");
    }, [onlyNum])


  
    return(
    
        <div className={"container start "+detailFade}>
             
            <input placeholder="숫자만 입력" onChange={(inputVal)=>{
                 if(isNaN(inputVal.target.value)){
                    setOnlyNum(false);
                } else{
                    setOnlyNum(true);
                }
            }}></input>
            {
                onlyNum == false ? 
                <p>숫자만 입력하세요</p> 
                : null
            }

            {
                timer == false ? 
                <div className="alert alert-warning">
                2초 이내 구매 시 할인
                </div> : null
            }
          
            {/* <YellowBtn bg="blue">버튼</YellowBtn>
            <YellowBtn bg="yellow">버튼</YellowBtn> */}
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%"></img>
                </div>  
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p>
                    <button className="btn btn-danger">주문하기</button>
                    <button className="btn btn-danger">장바구니</button>
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{ 
                    setTab(0);

                }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{ 
                    setTab(1);
                }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{ 
                    setTab(2);
                }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabCotent tab={tab}/>
            
        </div>
    )
} 



// function TabCotent({aa,bb,cc}){  // props.aa 로 받기 귀찮으면    
function TabCotent(props){  // 컴포넌트는 무조건 return을 해줘야함    
                            // 탭의 state가 변경될 때마다 end 붙임

                         
    let [fade,setFade] = useState('');                
    useEffect(()=>{
        let a = setTimeout(() => {      // automatic대칭이라는 것 때문에 시간차로 실행
            setFade('end'); 
        }, 100);
        return()=>{ 
            clearTimeout(a);
            setFade('');
        }
    },[props.tab])
   
    // if문 안 쓰고 센스 있게 쓰려면
    return (<div className={"start " + fade}>

        {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][props.tab]}
    </div>) 
       
}    

export default Detail; 


/* single page application의 단점: component간의 state 공유 어려움
   부모 자식 component는 props로 가능. props는 자식의 자식으로 바로 전달 못 함.
   그래서 props 가 싫으면 1. Context api (참고, 성능,속도 별로  2. Redux등 외부 라이브러리
*/