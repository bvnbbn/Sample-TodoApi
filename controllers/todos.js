
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;



Todo.hasMany(TodoItem, {foreignKey:'todoId'});


module.exports = {

    create(req, res) {

        return Todo
            .create({
                title: req.body.title,
                userId:req.params.user_id,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error));



    },

    /*we're fetching all todos from our database and 
    sending them back to the user as an array in the response. 
    If we encounter an 
    error while fetching the todos from the database, 
    we send that error object instead.*/

    list(req, res) {
        return Todo
          .findAll({
            include: [{
              model: TodoItem,
              as: 'todoItems',
            }],
          })
          .then(todos => res.status(200).send(todos))
          .catch(error => res.status(400).send(error));
      },



      retrieve(req,res){

        return Todo
            .findById(req.params.todo_id,{

                include:[{

                    model:TodoItem,
                    as:'todoItems',


                }],

            })
            .then(todo => {

                if(!todo) {

                        return res.status(404).send({

                            message: 'Todo Not Found',

                        });

                }

                return res.status(200).send(todo);

            })
            .catch(error => res.status(400).send(error));

      },


    /* retrieve todo by user id */

    retrieveTodo_by_userid(req,res){

        return Todo
            .findById(req.params.user_id,{

                include:[{

                    model:TodoItem,
                   
                    as:'todoItems',


                }],

            })
            .then(todo => {

                if(!todo) {

                        return res.status(404).send({

                            message: 'Todo Not Found',

                        });

                }

                return res.status(200).send(todo);

            })
            .catch(error => res.status(400).send(error));

      },


      /* retrieve todo by todoItem id */

    retrieveTodo_by_todoItem_id(req,res){

        return Todo
            .findAll({

                include:[{


                    model:TodoItem,
                    where:{todoId:req.params.todo_id },
                   
                    as:'todoItems',


                }],

            })
            .then(todo => {

                if(!todo) {

                        return res.status(404).send({

                            message: 'Todo Not Found',

                        });

                }

                return res.status(200).send(todo);

            })
            .catch(error => res.status(400).send(error));

      },










      update(req,res){

        return Todo
                .findById(req.params.todo_id, {

                    include: [{

                        model:TodoItem,
                        as:'todoItems',


                    }],

                })
                .then(todo => {

                    if(!todo){
                        return res.status(404).send({
                            message: 'Todo Not found',
                        });

                    }
                    return todo
                        .update({

                            title:req.body.title ,


                        })
                        .then (() => res.status(200).send(todo)) //send back the updated todo
                        .catch((error) => res.status(400).send(error));

                


                })
                .catch((error) => res.status(400).send(error));

      },


      destory(req,res){

            return Todo
                .findById(req.params.todo_id)
                .then(todo => {

                    if(!todo){

                        return res.status(400).send({

                            message: 'Todo Not Found',


                        });

                    }
                    return todo
                        .destroy()
                        .then(()=> res.status(200).send({ message: 'Todo deleted successfully'}))
                        .catch(error => res.send(400).send(error))



                })
                .catch(error => res.status(400).send(error));

      }




};