const taskController = require('../controllers/TaskController');

module.exports = function(app){
    app.get('/stored', taskController.storedTasks);
    app.get('/edit/:id', taskController.editTask);
    app.post('/edit/:id', taskController.editTaskProcess);
    app.post('/create-one', taskController.createTask);
    app.post('/remove/:id', taskController.removeTask);
    app.get('/trash', taskController.renderTrash);
    app.get('/restore/:id', taskController.restoreTask);
    app.get('/force-delete/:id', taskController.forceDeleteTask);
    app.post('/set-done/:id', taskController.setDoneTask);
    app.get('/done', taskController.renderDoneTasks);
    app.get('/', taskController.renderHome);
}