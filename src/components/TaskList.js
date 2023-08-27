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

    const showEdit = (id) => {
        setIdForEdit(id)
    }

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
                        <span className="date" id='showdate'>
                            {
                                task.date
                            }
                        </span>
                        <span className="time" id='showtime'>{task.time}</span>
                    </div>

                ))

            }
        </div >
    );
}

export default TaskList;