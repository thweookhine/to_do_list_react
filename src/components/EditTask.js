import axios from "axios";
import { useEffect, useState } from "react";

const EditTask = ({ id, setIdForEdit }) => {

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

    const closeEdit = () => {

    }

    const updateTask = (e) => {
        e.preventDefault();
        var url = 'http://localhost:8080/updateTask/' + task.id;
        fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(task)
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
        setIdForEdit(0)
    }

    useEffect(() => {
        axios.get('http://localhost:8080/task?id=' + id).then(res => setTask(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="add-form">
            <h4 className="header-text">Update Task</h4>
            <form onSubmit={e => updateTask(e)}>
                <div className="form-input">
                    <input type="text" name="title" placeholder="Enter Title" value={task.title} onChange={e => handleOnChange('title', e.target.value)} required />
                    <textarea name="desc" cols="30" rows="1" placeholder="Description" value={task.description} onChange={(e) => handleOnChange('description', e.target.value)} required></textarea>
                    <input type="date" name="date" id="date" value={task.date} onClick={() => filterDate()} placeholder="Date" onChange={(e) => handleOnChange('date', e.target.value)} required />
                    <input type="time" name="time" id="time" value={task.time ? task.time : ''} placeholder="time" onChange={(e) => handleOnChange('time', e.target.value)} />
                    <div className="butn-box">
                        <button type="submit" className="add-butn" >Update</button>
                        <button className="add-butn close-butn" onClick={() => setIdForEdit(0)}>Close</button>
                    </div>
                </div>
            </form>

        </div >
    );
}

export default EditTask;