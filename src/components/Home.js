import { useState } from "react";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";

const Home = () => {

    const [isCreate, setIsCreate] = useState(false);

    const showCreateBox = () => {
        setIsCreate(true)
    }

    return (
        <div className="wrapper">
            <div className="container">
                <div className="header-wrapper">
                    <h2 className="header-text">TODO List</h2>
                    <button className="add-butn" onClick={() => showCreateBox()}>Add Task</button>
                </div>

                {/* Create Task  */}
                {isCreate && <CreateTask iscreated={setIsCreate} />}

                <TaskList />
            </div>
        </div>
    );
}

export default Home;