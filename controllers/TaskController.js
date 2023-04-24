const db = require('../config/db');

module.exports = {

    // [GET]
    renderHome(req, res, next) {
        const sql = `select * from task where isDeleted = 'false' and isDone = 'false'`;
        db.query(sql, function (err, result) {
            if(err) throw err;
            else {
                result = JSON.parse(JSON.stringify(result));
                res.render('home', {
                    tasks: result
                });
            }
        })
    },

    //[POST]
    createTask(req, res, next) {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        var minute = date.getMinutes();
        if(minute < 10) {
            minute = `0${minute}`;
        }
        var currentTime = date.getHours() + ':' + minute;
        var createdAt = `${currentTime} ${dd}/${mm}/${yyyy}`;
        var sql = `insert into task(name, note, createdAt, isDeleted, isDone) values ('${req.body.name}', '${req.body.note}', '${createdAt}', 'false', 'false')`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                console.log('1 row inserted successfully');
                res.redirect('back');
            }
        })
    },

    //[GET] 
    storedTasks(req, res, next) {
        const sql = `select * from task`;
        db.query(sql, function (err, result) {
            if(err) throw err;
            else {
                result = JSON.parse(JSON.stringify(result));
                res.json(result);
            }
        })
    },

    //[GET]
    editTask(req, res, next) {
        var sql = `select * from task where id = ${req.params.id}`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                result = JSON.parse(JSON.stringify(result));
                res.render('edit', {
                    result: result[0]
                });
            }
        })
    },

    editTaskProcess(req, res, next) {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        var minute = date.getMinutes();
        if(minute < 10) {
            minute = `0${minute}`;
        }
        var currentTime = date.getHours() + ':' + minute;
        var updatedAt = `${currentTime} ${dd}/${mm}/${yyyy}`;
        var sql = `update task set name='${req.body.name}', note='${req.body.note}', updatedAt='${updatedAt}' where id = ${req.params.id}`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                console.log('1 row updated');
                res.redirect('/');
            }
        })
    },

    //[POST]
    removeTask(req, res, next) {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        var minute = date.getMinutes();
        if(minute < 10) {
            minute = `0${minute}`;
        }
        var currentTime = date.getHours() + ':' + minute;
        var deletedAt = `${currentTime} ${dd}/${mm}/${yyyy}`;
        var sql = `update task set isDeleted = 'true', deletedAt = '${deletedAt}' where id = ${req.params.id}`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                console.log('1 row deleted successfully');
                res.redirect('/');
            }
        })
    },

    //[GET]
    renderTrash(req, res, next) {
        var sql = `select * from task where isDeleted = 'true' and isDone = 'false'`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                res.render('trash', {
                    result: result
                });
            }
        });
    },

    //[GET]
    restoreTask(req, res, next) {
        var sql = `update task set isDeleted = 'false' where id = '${req.params.id}'`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                console.log('1 row restored successfully');
                res.redirect('back');
            }
        })
    },

    //[GET]
    forceDeleteTask(req, res, next) {
        var sql = `delete from task where id = '${req.params.id}'`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                console.log('1 row deleted from database successfully');
                res.redirect('back');
            }
        })
    },


    //[POST]
    setDoneTask(req, res, next) {
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        var minute = date.getMinutes();
        if(minute < 10) {
            minute = `0${minute}`;
        }
        var currentTime = date.getHours() + ':' + minute;
        var doneAt = `${currentTime} ${dd}/${mm}/${yyyy}`;
        var sql = `update task set isDone = 'true', doneAt = '${doneAt}' where id = '${req.params.id}'`;
        db.query(sql, function(err, result) {
            if(err) throw err;
            else {
                console.log('set done 1 task successfully');
                res.redirect('back');
            }
        })
    },

    //[GET]
    renderDoneTasks(req, res, next) {
        var sql = `select * from task where isDone = 'true'`;
        db.query(sql, function(err, result) {
            if (err) throw err;
            else {
                console.log('get done tasks successfully');
                res.render('done', {
                    result: result
                })
            }
        })
    }
}