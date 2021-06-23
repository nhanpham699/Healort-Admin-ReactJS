import React, {useState, useRef} from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'


import './addDoctorModal.css'
function getModalStyle() {
    const top = 50 
    const left = 50
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));


export default function SimpleModal(props) {

  const {open, handleOpen} = props  
  const [gender, setGender] = useState(null);
  const [experience, setExperience] = useState(0);
  const yearsArr = []
  for(let i = 2; i<=30; i ++){
      yearsArr.push(i)
  }
  const classes = useStyles();
  const [file, setFile] = useState();
  const [modalStyle] = React.useState(getModalStyle);

  const el = useRef();  
  
  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleExperience = (event) => {
    setExperience(event.target.value);
  };

  const handleAddDoctor = (e) => {
        e.preventDefault();
        const {email, fullname, hometown, phone, birthyear, description} = e.target;
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        
        console.log(description.value);
        var formData = new FormData();
        
        formData.append('photo', file) 
       
        formData.append('email', email.value)
        formData.append('fullname', fullname.value)
        formData.append('gender', gender.toString())
        formData.append('hometown', hometown.value)
        formData.append('phone', phone.value)
        formData.append('birthyear', birthyear.value)
        formData.append('experience', experience)
        formData.append('description', description.value)
        
        axios.post("http://localhost:8080/doctors/signup", formData, config)
        .then(res => {
            window.location.reload(true)
        })
  }

  const handlleChange = (e) => {
    const file = e.target.files[0]; //access file
    
    setFile(file);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title">Add doctor</h2>
    <form style={{maxHeight: 500, overflow: 'auto'}} onSubmit={handleAddDoctor} noValidate autoComplete="off">
      <TextField name="email" className="add-input" label="Email" />
      <TextField name="fullname" className="add-input" label="Full name" />
      <div>
        <span style={{color: 'gray', fontSize: 16, position: 'relative', top: 9}}>Gender</span>
        <Select
          style={{position: 'relative', top: 7, left: 20}}
          value={gender}
          onChange={handleGender}
        >
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
        </Select>
      </div>
      <TextField name="birthyear" className="add-input" label="Birth year" />
      <TextField name="hometown" className="add-input" label="Home Town" />
      <TextField name="phone" className="add-input" label="Phone" />
      <div>
        <span style={{color: 'gray', fontSize: 16, position: 'relative', top: 9}}>Experience</span>
        <Select
          style={{position: 'relative', top: 7, left: 20}}
          value={experience}
          onChange={handleExperience}
        >   
        {yearsArr.map(year => (
          <MenuItem value={year}>{year + ' years'}</MenuItem>
        ))}  
        </Select>
      </div>
      <p style={{color: 'gray', fontSize: 16, position: 'relative', top: 9}}>Description</p>
      <TextareaAutosize name="description" aria-label="Description" placeholder="Description" rowsMin={3} />
      <input ref={el} onChange={(e) => handlleChange(e)} className="add-image-file" type="file" label="Image" />
      <button className="add-comfirm" type="submit">Comfirm</button>       
     </form> 
  </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
