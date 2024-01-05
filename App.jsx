import React, { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//components
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./Header";
import Footer from "./Footer";
import LoginHeader from "../LoginHeader";

const TaskPage = () => (
  <>
    <Header />
    <AddTask />
    <TaskList style={{ flex: 1 }} />
  </>
);
const LoginPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <LoginHeader />
    <Login style={{ flex: 1 }} />
    <Footer />
  </div>

);

const SignupPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <LoginHeader />
    <Signup style={{ flex: 1 }} />
    <Footer />
  </div>

);


function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignupPage />}></Route>
            <Route path='/tasks/:userId' element={<TaskPage />}></Route>
          </Routes>
      </BrowserRouter>
      // <Fragment>
      //   <div className="container">
      //     <AddTask />
      //     <TaskList />
      //   </div>
      // </Fragment>

    );
  }
  
  export default App;