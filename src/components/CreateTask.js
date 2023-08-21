import { useEffect, useState } from "react";
import Home from "./Home";
import TaskService from "../service/TaskService";
import axios from "axios";

const CreateTask = ({ iscreated }) => {

    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
        time: ""
    })

    const handleOnChange = (key, value) => {
        setTask(t => (
            {
                ...t,
                [key]: value,
            }
        ))
    }

    const filterDate = () => {
        var dateInput = document.getElementById("date")
        var date = new Date();
        dateInput.setAttribute("min", date.toISOString().substring(0, 10))
    }

    const saveTask = (e) => {
        //console.log(e)
        e.preventDefault();
        fetch('http://localhost:8080/createTask', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(task)
        }).then(res => console.log(res))
            .catch(err => console.log(err));

        iscreated(false);
        // axios({
        //     method: "post",
        //     url: "http://localhost:8080/createTask",
        //     data: JSON.stringify(task),
        //     config: { headers: { "Content-Type": "application-json" } }
        // })
        //     .then(response => {
        //         console.log("it's working!");
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }

    useEffect(() => {

    }, [])

    return (
        <div className="add-form">
            <h4 className="header-text">Add New Task</h4>
            <form onSubmit={e => saveTask(e)}>
                <div className="form-input">
                    <input type="text" name="title" placeholder="Enter Title" value={task.title} onChange={e => handleOnChange('title', e.target.value)} required />
                    <textarea name="desc" cols="30" rows="1" placeholder="Description" onChange={(e) => handleOnChange('description', e.target.value)} required></textarea>
                    <input type="date" name="date" id="date" onClick={() => filterDate()} placeholder="Date" onChange={(e) => handleOnChange('date', e.target.value)} required />
                    <input type="time" name="time" id="time" placeholder="time" onChange={(e) => handleOnChange('time', e.target.value)} />
                    <div className="butn-box">
                        {/* <button className="add-butn" onClick={e => saveTask(e)}>Add</button> */}
                        <button className="add-butn" type="submit">Add</button>
                        <button className="add-butn close-butn" onClick={e => iscreated(false)}>Close</button>
                    </div>
                </div>
            </form >

        </div >
    );
}

export default CreateTask;