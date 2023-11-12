import { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import axios from "axios";

const Home = () => {

    const [isCreate, setIsCreate] = useState(false);
    const [isAll, setIsAll] = useState(false);
    const [list, setList] = useState([]);

    const showCreateBox = () => {
        setIsCreate(true)
    }

    useEffect(() => {
        if (isAll) {
            axios.get('http://localhost:8080/tasks')
                .then(response => {
                    setList(response.data)
                })
                .catch(err => console.log(err))
        } else {
            axios.get('http://localhost:8080/taskForToday')
                .then(response => {
                    setList(response.data)
                })
                .catch(err => console.log(err))
        }

    }, [list, isAll])

    return (
        <div className="wrapper">
            <div className="container">
                <div className="header-wrapper">
                    <h2 className="header-text">TODO List</h2>
                    <div>
                        {
                            isAll ? <button className="alltasks-butn" onClick={() => setIsAll(false)}>Task For Today</button> : <button className="alltasks-butn" onClick={() => setIsAll(true)}>All Tasks</button>
                        }
                        <button className="add-butn" onClick={() => showCreateBox()}>Add Task</button>
                    </div>
                </div>

                {/* Create Task  */}
                {isCreate && <CreateTask iscreated={setIsCreate} />}

                <div>
                    {isAll ? <h3 className="header-text">All Tasks</h3> : <h3 className="header-text">Task For Today</h3>}
                </div>

                <TaskList isAllList={isAll} list={list} />
            </div>
        </div>
    );
}

export default Home;