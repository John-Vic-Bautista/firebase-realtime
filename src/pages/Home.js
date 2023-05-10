import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";

const Home = () => {
    const [data, setData] = useState({});

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
    }, []);

    const onDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this exercise?")) {
            fireDb.child(`Exercise/${id}`).remove((err) => {
                if(err) {
                    toast.error(err)
                } else {
                    toast.success("Exercise Deleted Successfully!")
                }
            })
        }
    }

    return (
        <div class="body"> 
        <div class="bad" style={{marginTop: "100`npmpx"}}>
        <div class="">
                <p class="badd">Exercises</p>
            </div>
            <table className="styled-table">
                <thead >
                    <tr>
                        <th style={{textAlign:"center"}}>No.</th>
                        <th style={{textAlign:"center"}}>Exercises</th>
                        <th style={{textAlign:"center"}}>Reps</th>
                        <th style={{textAlign:"center"}}>Time</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {Object.keys(data).map((id, index) => {
                        return (
                            <tr key={id}>
                                <th scope="row">{index+1}</th>
                                <td>{data[id].exercise}</td>
                                <td>{data[id].reps}</td>
                                <td>{data[id].time}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <p className="normis btn btn-edit">Edit</p>
                                    </Link>
                                        <p
                                        className="normis btn btn-delete"
                                        onClick={() => onDelete(id)}>Delete</p>
                                    <Link to={`/view/${id}`}>
                                        <p className="normiss btn btn-view">View</p>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Home