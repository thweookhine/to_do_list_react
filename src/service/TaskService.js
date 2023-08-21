import http from '../http-common'

// const getAll = () => http.get('/tasks');

// const create = (task) => http.post('/createTask', task);

class TaskService {
    getAll() {
        return http.get("/tutorials");
    }

    create(task) {
        return http.post("/createTask", task)
    }
}

export default new TaskService();