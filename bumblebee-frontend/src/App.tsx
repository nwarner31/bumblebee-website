import React, {useState} from 'react';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import './App.css';

function Layout(props: {role: string, name: string, updateAdProps: (...fields: {name: string, value: any}[]) => void}) {
    return (
        <div className='main-body'>
            <Header role={props.role} name={props.name} logoutUser={props.updateAdProps} />
            <div className='page-body'>
                <Outlet />
            </div>

        </div>

    );
}
function App() {
    const [appProps, setAppProps] = useState({role: 'none', name: 'guest'});
    function updateAppProps(...fields: {name: string, value: any}[]) {
        for(let {name, value} of fields) {
            setAppProps(prevState => {return {...prevState, [name]: value}})
        }
    }
  const router = createBrowserRouter( [
      { element: <Layout role={appProps.role} name={appProps.name} updateAdProps={(...fields: {name: string, value:any}[]) => updateAppProps(...fields)} />,
          children: [
              { path: '', element: <HomePage />},
              { path: '/login', element: <LoginPage loginUser={(...fields: {name: string, value:any}[]) => updateAppProps(...fields)} />},
              {path: '/register', element: <RegisterPage registerUser={(...fields: {name: string, value:any}[]) => updateAppProps(...fields)} />}
          ]}
      ]);
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
