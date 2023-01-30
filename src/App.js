import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Navbar,Container,Nav} from 'react-bootstrap';
import { createContext,useState } from 'react';
import data from './data.js';
import {Routes, Route,Link, useNavigate, Outlet,useHistory } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';



export let Context1 = createContext();  
// 1. state 보관함 생성 2. Context로 원하는 컴포넌트 감싸기 
// value로 공유 원하는 state 보내기
// context api는 state안 써도 쓸 데 없는 것까지 재렌더링, component 재사용 어려움 
function App() {
 
  let [shoes,setShoes] = useState(data);
  let [cnt, setCnt] = useState(1);
  let navigate = useNavigate();
  let [loading,setLoading] = useState(false);
  let [재고] = useState([10,11,12]);

  
  return (
  
    <div className="App">

      
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{
                  navigate('/');
              }}>Home</Nav.Link>
               <Nav.Link onClick={()=>{
                  navigate('/cart');
              }}>Cart</Nav.Link>
              <Nav.Link onClick={()=>{
                  navigate('/detail');
              }}>Detail</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<>
            <div className='main-bg'></div>
            <div className='container'>
              {
                loading == true ? 
                 <p>로딩중입니다.</p> : null
              }
              <div className="row">
                {shoes.map((a,i)=>{
                    return( <Card shoes={shoes[i]} i={i} key={i}></Card> ) 
                  })}
              </div>
            </div>

            {
              cnt != 3 ? 
              <button onClick={()=>{
                setLoading(true);
                axios.get('https://codingapple1.github.io/shop/data'+(cnt+1)+'.json')
                //axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((res)=>{
                  
                let copy = [...shoes,...res.data];
                setShoes(copy);
                setCnt(cnt+1);
                setLoading(false);
  
                })
                .catch((data)=>{
                  // 실패한 경우
                  console.log('실패');
                  setLoading(false);
                })
  
                // 서버로 데이터를 전송하는 경우
                //axios.post('/fjfsk',{name: 'kim'});
                // 동시에 ajax 여러개 하려고 하면 promise.all 쓰기 
                // 서버와는 문자로만 통신 가능, json으로 보내면 문자로 인식
  
                // fetch 
                // fetch('http://fsdfskfjslfkj.json')
                // .then((res)=>{
                //     res.json()  // json에서 array/object변환 과정 필요
                // })
                // .then(data=>{
  
                // })
              }}>버튼</button> :
              null
            }
            
          </>}/>

          <Route path="/detail/:id" element={
            // Detail 안의 컴포넌트는 재고 쓸 수 있음
            <Context1.Provider value={{재고}}> 
                <Detail shoes={shoes}/>   
            </Context1.Provider>
          } />

          <Route path="/cart" element={
              <Cart />
          }></Route>
         
          
          {/* <Route path="/about" element={<About/>}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>위치정보임</div>}/>
          </Route>
          <Route path="/event" element={<Event/>}>
            <Route path="one" element={<div>양배추즙</div>} />
            <Route path="two" element={<div>사과즙</div>} />

          </Route> */}
         
          {/* 1. 방법 (get/post) 
              2. 어떤 자료 (url)
              누가 comic.naver.com 으로 요청하면 웹툰 보여주세요~
              https://codingapple1.github.io/shop/data2.json
              ajax 사용해도 get요청 가능 : 리액트에선 서버와 거의 ajax로 통신
               1. xmlhttp
               2. fetch()
               3. axios = npm install axios
          */}
        </Routes>
        
    </div>
  );
} 

function Event (){
  return(
      <>
      <h2>이벤트 페이지임</h2>
      <Outlet></Outlet>
    </>
  )
}

function About (){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  ) 
}
function Card (props){

  let navigate = useNavigate();
 

  return(
    
        <div className='col-md-4' onClick={()=>{
      
            navigate(`/detail/${props.shoes.id}`)
        }}>
            <img src={"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} width="70%" />
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.price}</p>
        </div>
     
  ) 
}

export default App;
