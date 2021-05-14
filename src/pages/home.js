import '../App.css';
import DrawerMenu from '../components/DrawerMenu'
import ManageUsers from './ManageUsers'
import ManageDoctors from './ManageDoctors'
import ManageSchedules from './ManageSchedules'
import ManageMedicines from './ManageMedicines'
import ManagePrescriptions from './ManagePrescriptions'
import DoctorStatistic from './DoctorStatistic'
import RevenueStatistic from './RevenueStatistic'
import Nav from '../components/Nav'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import Cookies from 'universal-cookie';
import React from 'react';

const cookies = new Cookies();
export default function Home() {

    React.useEffect(() => {
        if(!cookies.get("adminId")){
            window.location.href = "/login"
        };
    },[])
    return(
        <div className="app">
            <div>
                <Nav />
            </div>
            <div className="content">
                <div className="left-content">
                    <DrawerMenu />
                </div>
                <div className="right-content">
                    <Route path='/users' component={ManageUsers} />
                    <Route path='/doctors' component={ManageDoctors} />
                    <Route path='/schedules' component={ManageSchedules} />
                    <Route path='/medicines' component={ManageMedicines} />
                    <Route path='/prescriptions' component={ManagePrescriptions} />
                    <Route path='/doctorstatistic' component={DoctorStatistic} />
                    <Route path='/revenuestatistic' component={RevenueStatistic} />
                </div>
            </div>
        </div>
    )
}