import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function ManageMedicines() {

  const [columns, setColumns] = useState([
    { title: 'Date', field: 'date' },
    { title: 'Medicine', field: 'medicine'},
    { title: 'Doctor', field: 'doctor'},
    { title: 'Client', field: 'user'},
    { title: 'Times', field: 'times'},
    { title: 'Note', field: 'note'},
    { title: 'Total', field: 'total'},
  ]);

  const [data, setData] = useState([]);


  const getMedicine = (arr) => {

      let str = ""

      for(let i of arr) {
          str += i.name + " (" + i.quantity + "), "
      }
      str = str.slice(0, -1).slice(0, -1)
      return str  
  }

  useEffect(() => {
      axios.get('http://localhost:8080/prescriptions//getallprescriptions')
      .then(res => {
        const newData = res.data.map(dt => {
            return {...dt,
                date: dt.date.slice(0,10),
                medicine: getMedicine(dt.medicine),
                doctor: dt.doctorId.fullname,
                user: dt.userId.fullname
            }
        })
        setData(newData)
      })
  },[])

  return (
    <MaterialTable
      icons={tableIcons}
      title="Manage prescriptions"
      columns={columns}
      data={data}
    />
  )
}
