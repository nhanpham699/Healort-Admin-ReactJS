import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = () => {

    const [data, setData] = useState([])  
    const [dataTab, setDataTab] = useState([])

    const getDoctor = async () => {
        const labelData = []
        const totalData = []
        const res = await axios.get('http://localhost:8080/doctors/gettopdoctor')
        setDataTab(res.data)
        for (let i of res.data){
            labelData.push(i.fullname)
            totalData.push(i.quantity)
        }
        const data = {
          labels: labelData,
          datasets: [
            {
              label: 'Patient number',
              data: totalData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        setData(data)
    }  

    useEffect(() => {
        getDoctor()
    },[])  
    
    return(
        <div>
            <div className='header'>
                <h1 className='title'>DOCTORS</h1>
            </div>
            <div>
                <Bar data={data} options={options} />
                <div>
                    <h2 className="h2">Statistic table</h2>
                    <table className="tb doctorTb" cellPadding="15">
                      <tr className="tr">
                        <th>Day</th>  
                        <th>Patient quantity</th>  
                      </tr>
                      {dataTab.map(dt => (
                        <tr className="tr">
                          <td>{dt.fullname}</td>
                          <td>{dt.quantity}</td>
                        </tr>
                      ))}
                    </table>
                </div> 
            </div>
        </div>
    )
};

export default VerticalBar;