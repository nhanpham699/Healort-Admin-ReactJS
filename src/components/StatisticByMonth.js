import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import './StatisticTable.css'


const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Revenue of months',
    },
  },
};

const Statistic = () => {

  const [data, setData] = useState([])  
  const [dataTab, setDataTab] = useState([])


  const getSchedule = async () => {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const labelData = []
      const totalData = []
      const res = await axios.get('http://localhost:8080/schedules/getschedulesbyyear/' + year)
      setDataTab(res.data)
      for (let i of res.data){
          labelData.push('Month ' + i.month)
          totalData.push(i.total)
      }

      const data = {
        labels: labelData,
        datasets: [
          {
            label: 'revenue',
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
    getSchedule()
  },[])  

  return(
      <div>
        <div className='header'>
            <h1 className='title'>REVENUE</h1>
        </div>
        <div style={{display: 'flex'}}>
            <Bar data={data} options={options} />
            <div>
                <h2>Statistic table</h2>
                <table className="tb" cellPadding="15">
                  <tr className="tr">
                    <th>Month</th>  
                    <th>Schedule quantity</th>  
                    <th>Total price</th>  
                  </tr>
                  {dataTab.map(dt => (
                    <tr className="tr">
                      <td>{dt.month}</td>
                      <td>{dt.quantity}</td>
                      <td>{dt.total}$</td>
                    </tr>
                  ))}
                </table>
            </div> 
        </div>
      </div>
  )
}

export default Statistic;