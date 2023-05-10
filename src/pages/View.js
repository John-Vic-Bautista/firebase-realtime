import React, {useState, useEffect} from 'react';
import fireDb from "../firebase";
import { useParams, Link } from 'react-router-dom';
import "./View.css";

const View = () => {
    const [user, setUser] = useState({});

    const {id} = useParams();

    useEffect(() => {
        fireDb.child(`Exercise/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUser({...snapshot.val()});
            } else {
                setUser ({});
            }
        })
    }, [id]);

    console.log("user", user);

    return(
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Exercise Details</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br></br><br></br>
                    
                    <strong>Exercise: </strong>
                    <span>{user.exercise}</span>
                    <br></br><br></br>
                    
                    <strong>Reps: </strong>
                    <span>{user.reps}</span>
                    <br></br><br></br>
                    
                    <strong>Time: </strong>
                    <span>{user.time}</span>
                    <br></br><br></br>

                    <Link to="/">
                        <button className="btn btn-edit">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View