import axios from "axios";
import { useEffect, useState } from "react";
import EditTask from "./EditTask";

const TaskList = ({ isAllList, list }) => {

    const [idForEdit, setIdForEdit] = useState(0);

    const completeTask = (task) => {
        task.complete = true;
        console.log(task)
        var url = 'http://localhost:8080/updateTask/' + task.id;
        console.log(url);
        fetch(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(task)
        }).then(res => console.log(res))
            .catch(err => console.log(err));
    }

    const deleteTask = (id) => {
        axios.delete('http://localhost:8080/deleteTask/' + id)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const checkDate = (task) => {
        var date = new Date(task.date).toISOString().substring(0, 10);
        var today = new Date().toISOString().substring(0, 10);
        if (date < today) {
            return false;
        }
        return true;
    }

    const checkTime = (task) => {
        var date = new Date(task.date).toISOString().substring(0, 10);
        var today = new Date().toISOString().substring(0, 10);

        var hour = new Date().getHours();


        var time = new Date()
        var current = new Date().toTimeString().slice(0, 8);

        if (date < today) {
            return false;
        } else if (date == today && (task.time < current)) {
            return false;
        } else {
            return true;
        }

    }

    const showEdit = (id) => {
        setIdForEdit(id)
    }

    useEffect(() => {

    }, [list])

    return (
        <div className="content">

            {
                list && list.map((task, index) => (

                    idForEdit === task.id ? <EditTask key={index} id={task.id} setIdForEdit={setIdForEdit} /> : <div className="box" key={index}>

                        <div className="box-header">
                            <h4>{task.title}</h4>
                            <div className="icons-group">
                                {
                                    task.complete
                                        ? <span><i className="fa-solid fa-circle-check completed"></i> </span>
                                        : <span onClick={() => completeTask(task)}><i className="fa-regular fa-circle-check completed"></i></span>
                                }
                                {
                                    !task.complete && <span onClick={() => showEdit(task.id)}><i className="fa-solid fa-pen-to-square"></i></span>
                                }

                                <span><i className="fa-solid fa-trash-can" onClick={() => deleteTask(task.id)}></i></span>
                            </div>
                        </div>
                        <p>{task.description} </p>
                        {
                            checkDate(task) ? <span className="date" id='showdate'>
                                {
                                    task.date
                                }
                            </span> :
                                <span className="date dued" id='showdate'>
                                    {
                                        task.date
                                    }
                                </span>
                        }
                        {
                            checkTime(task) ?
                                <span className="time" id='showtime'>{task.time}</span>
                                :
                                <span className="time dued" id='showtime'>{task.time}</span>
                        }


                    </div>

                ))

            }
        </div >
    );
}

export default TaskList;