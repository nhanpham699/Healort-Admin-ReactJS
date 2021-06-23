import React, { useEffect, useState } from 'react'
import './ManageReview.css'
import axios from 'axios'
export default function ManageReview() {

    const [data, setData] = useState([])
    const [review, setReview] = useState([])
    const [doctorId, setDoctorId] = useState()

    const getData = async() => {
        const res = await axios.get('http://localhost:8080/doctors/getalldoctors')
        setData(res.data)
    }

    const getReview = (review,id) => {
        setReview(review)
        setDoctorId(id)
    }

    const handleHide = async(re) => {
        const res = {
            review : re,
            doctorId: doctorId
        }
        await axios.post('http://localhost:8080/doctors/updatereview', res)
        .then(res => getReview(res.data.review, res.data._id))
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <div className="review-container">
            <div className="review-left">
                {data?.map((doc,index) => (
                    <div onClick={() => getReview(doc.review,doc._id)} className="doctor-item" key={index}>
                        <div className="doctor-item-left">
                            <img className="doctor-avatar" src={'http://localhost:8080' + doc.avatar} />
                        </div>
                        <div className="doctor-item-right">
                            <p className="doctor-text"><b>{doc.fullname}</b></p>
                            <p className="doctor-text">{doc.hometown}</p>
                            <p className="doctor-text">{doc.birthyear}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="review-right">
                <h1 className="title">Review</h1>    
                {review?.map((re,index) => (
                    <div className="user-item" key={index}>
                        <div className="user-review">
                            <div className="user-item-left">
                                <img className="user-avatar" src={'http://localhost:8080' + re.userId.avatar} />
                            </div>
                            <div className="user-item-right">
                                <p className="user-text"><b>{re.userId.fullname}</b></p>
                                <p className="user-text">{re.rating}</p>
                                <p className="user-text">{re.comment}</p>
                            </div>
                        </div>
                        <div className="user-hide">
                            { !re.state 
                            ? <button onClick={() => handleHide(re)} className="hide-button">Hide</button> 
                            : <button className="hided-button">Hided</button> }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}