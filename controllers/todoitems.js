const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {

    console.log(req.params.todo_id)
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todo_id,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error));
  },

  update(req,res){

    return TodoItem
        .find({

          where:{

            id:req.params.todoItem_id,
            todoId:req.params.todo_id,

          },

        })
        .then(todoItem => {

            if(!todoItem){

              return res.status(404).send({  
                message: 'TodoItem Not found',
              });

            }


            return todoItem
              .update({
                  content:req.body.content || todoItem.content,
                  complete:req.body.complete || todoItem.complete,
              })
              .then (updatedTodoItem =>res.status(200).send(updatedTodoItem))
              .catch(error => res.status(400).send(error));

        })
        .catch(error => res.status(400).send(error));

  },

  destroy(req, res) {
    return TodoItem
      .find({
          where: {
            id: req.params.todoItem_id,
            todoId: req.params.todo_id,
          },
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },






};