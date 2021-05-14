import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Statistic = () => {

  const [data, setData] = useState([])  
  const classes = useStyles();
  const [week, setWeek] = useState();
  const [dataTab, setDataTab] = useState([])
  const handleChange = async (event) => {
    setWeek(event.target.value);
    await getSchedule(event.target.value)
  };

  const getSchedule = async (w) => {
      const labelData = []
      const totalData = []
      const res = await axios.get('http://localhost:8080/schedules/getschedulesbyweek/' + w)
      setDataTab(res.data)
      for (let i of res.data){
          labelData.push('Day ' + i.date)
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
      <div style={{marginTop: 100}}>
        <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Week</InputLabel>
          <Select
            style={{width: '80%'}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={week}
            onChange={handleChange}
            label="Week"
          >
            <MenuItem value={0}>Current week</MenuItem>
            <MenuItem value={1}>Last week</MenuItem>
            <MenuItem value={2}>2 weeks ago</MenuItem>
          </Select>
        </FormControl>
        </div>
        <div style={{display: 'flex'}}>
            <Bar data={data} options={options} />
            <div>
                <h2>Statistic table</h2>
                <table className="tb" cellPadding="15">
                  <tr className="tr">
                    <th>Day</th>  
                    <th>Schedule quantity</th>  
                    <th>Total price</th>  
                  </tr>
                  {dataTab.map(dt => (
                    <tr className="tr">
                      <td>{dt.date}</td>
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