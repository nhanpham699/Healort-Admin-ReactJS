import React, {useState, useEffect} from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from 'react';
import Button from '@material-ui/core/Button';

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
import DoctorModal from '../components/addDoctorModal'

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

export default function ManageDoctors() {

  const [open, setOpen] = React.useState(false);
  const years = {
    2: '2 years',
    3: '3 years',
    4: '4 years',
    5: '5 years',
    6: '6 years',
    7: '7 years',
    8: '8 years',
    9: '9 years',
    10: '10 years',
    11: '11 years',
    12: '12 years',
    13: '13 years',
    14: '14 years',
    15: '15 years',
    16: '16 years',
    17: '17 years',
    18: '18 years',
    19: '19 years',
    20: '20 years',
    21: '21 years',
    22: '22 years',
    23: '23 years',
    24: '24 years',
    25: '25 years',
    26: '26 years',
    27: '27 years',
    28: '28 years',
    29: '29 years',
    30: '30 years'
  }

  const handleOpen = () => {
    setOpen(!open);
  };
  

  const [columns, setColumns] = useState([
    { title: 'Full Name', field: 'fullname' },
    { title: 'Email', field: 'email'},
    { title: 'Birth Year', field: 'birthyear', type: 'numeric'},
    { title: 'Hometown', field: 'hometown'},
    { title: 'Phone', field: 'phone'},
    { title: 'Gender', field: 'gender', lookup: { 0: 'Male', 1: 'Female' }},
    { title: 'Experience', field: 'experience', lookup: years}
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
      // for(let i=2; i; i++){
      //     setYears({i: i + ' year'})
      // }
      axios.get('http://localhost:8080/doctors/getalldoctors')
      .then(res => {
         setData(res.data)
      })
  },[])

  // console.log(years);

  return (
    <div>
        <DoctorModal open={open} handleOpen={handleOpen} />
        <Button style={{position: 'absolute', zIndex: 2133, right: 360, top: 115, height: 30 }} 
        variant="contained" 
        color="primary"
        onClick={handleOpen}>add</Button>
        <MaterialTable
        icons={tableIcons}
        title="Manage doctors"
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                axios.post('http://localhost:8080/doctors/update', newData)
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                axios.post('http://localhost:8080/doctors/delete', {_id: dataDelete[index]})
                dataDelete.splice(index, 1);
                setData([...dataDelete]); 
                console.log(dataDelete)
                resolve()
              }, 1000)
            }),
        }}
      />
    </div>
  )
}
