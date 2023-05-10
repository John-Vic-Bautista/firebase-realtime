import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './AddEdit.css';
import fireDb from "../firebase";
import {toast} from "react-toastify";

const initialState = {
    exercise: "",
    reps: "",
    time: ""
}

const AddEdit = () => {
const [state, setState] = useState(initialState);
const [data, setData] = useState({});

const {exercise, reps, time} = state;

const navigate = useNavigate();

const {id} = useParams();

useEffect(() => {
    fireDb.child("Exercise").on("value", (snapshot) => {
        if (snapshot.val()!== null){
            setData({...snapshot.val()})
        } else {
            setData({});
        }
    });

    return () => {
        setData ({});
    };
}, [id]);

useEffect(() =>{
    if(id) {
        setState({...data[id]})
    } else {
        setState({...initialState})
    }

    return () =>{
        setState({...initialState})
    }
}, [id, data])

const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    if(!exercise || !reps || !time) {
        toast.error("Please provide value in each input field")
    } else {
        if (!id){
            fireDb.child("Exercise").push(state, (err) => {
                 if(err) {
                    toast.error(err);
                } else {
                    toast.success("Plan Added Successfully");;
                }
            });
        } else {
            fireDb.child(`Exercise/${id}`).set(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success("Plan Updated Successfully!");
                }
            });
        setTimeout(() => navigate("/"), 500);
    }}
};
return (
    <div class="body">
        <div style={{marginTop: "10px"}}>
        <div class="">
                <p class="badd">Add an activity</p>
            </div>
            <form style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "150px",
                    alignContent: "center",
                }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="exercise" className="label">Exercise</label>
                <input
                type="text"
                id="exercise"
                name="exercise"
                placeHolder="Name of Exercise..."
                value={exercise || ""}
                onChange={handleInputChange}
                className="input"
            />
                <label htmlFor="reps" className="label">Reps</label>
                <input
                type="number"
                id="reps"
                name="reps"
                placeHolder="Reps of Exercise..."
                value={reps || ""}
                onChange={handleInputChange}
                className="input"
            />
                <label htmlFor="time" className="label">Time</label>
                <input
                type="text"
                id="time"
                name="time"
                placeHolder="Time of Exercise..."
                value={time || ""}
                onChange={handleInputChange}
                className="input"
            />
                <input type="submit" value={id ? "Update" : "Save"} class="button" />
            </form>
        </div>
        </div>
    );
};

export default AddEdit;