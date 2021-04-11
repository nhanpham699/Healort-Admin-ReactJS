import React, {useState, useRef} from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
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
  const classes = useStyles();
  const [file, setFile] = useState('');
  const [modalStyle] = React.useState(getModalStyle);

  const el = useRef();   
  const handleAddDoctor = (e) => {
        e.preventDefault();
        const {email, fullname, gender, hometown, phone, birthyear } = e.target;
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        var formData = new FormData();
        formData.append('file', file) //appending file
        formData.append('email', email.value)
        formData.append('fullname', fullname.value)
        formData.append('gender', gender.value)
        formData.append('hometown', hometown.value)
        formData.append('phone', phone.value)
        formData.append('birthyear', birthyear.value)
        // console.log(formData);
        axios.post("http://localhost:8080/doctors/signup", formData, config)
        .then(res => {
            console.log(res.data.add);
        })
  }

  const handlleChange = (e) => {
    const file = e.target.files[0]; //access file
    setFile(file);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
    <h2 id="simple-modal-title">Add product</h2>
    <form onSubmit={handleAddDoctor} noValidate autoComplete="off">
      <TextField name="email" className="add-input" label="Email" />
      <TextField name="fullname" className="add-input" label="Full name" />
      <TextField name="gender" className="add-input" label="Gender" />
      <TextField name="birthyear" className="add-input" label="Birth year" />
      <TextField name="hometown" className="add-input" label="Home Town" />
      <TextField name="phone" className="add-input" label="Phone" />
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
