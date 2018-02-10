
const Todo = require('../models').Todo;
const User = require('../models').User;
const TodoItem = require('../models').TodoItem;



/* this will add attribute user_id to Todo table as UserId  */
User.hasMany(Todo, { foreignKey: 'UserId' });







module.exports = {

    create(req, res) {

        return User
            .create({
                username: req.body.username,
            })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));



    },

    /*we're fetching all todos from our database and 
    sending them back to the user as an array in the response. 
    If we encounter an 
    error while fetching the todos from the database, 
    we send that error object instead.*/

    list(req, res) {
        return User
            .findAll({
                include: [{
                    model: Todo,
                    as: 'todos',

                    include: [{

                        model: TodoItem,
                        as: 'todoItems',
                       
                    }]




                }],
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error));
    },



    retrieve(req, res) {

        return User
            .findById(req.params.user_id, {

                include: [{

                    model: Todo,
                    as: 'todos',

                    include: [{

                        model: TodoItem,
                        as: 'todoItems',
                        where: { todoId:req.params.user_id }

                    }]

                }],

            })
            .then(user => {

                if (!user) {

                    return res.status(404).send({

                        message: 'user Not Found',

                    });

                }

                return res.status(200).send(user);

            })
            .catch(error => res.status(400).send(error));

    },



    update(req, res) {

        return User
            .findById(req.params.user_id, {

                include: [{

                    model: Todo,
                    as: 'todos',


                }],

            })
            .then(user => {

                if (!user) {
                    return res.status(404).send({
                        message: 'User Not found',
                    });

                }
                return user
                    .update({

                        username: req.body.username,


                    })
                    .then(() => res.status(200).send(user)) //send back the updated user
                    .catch((error) => res.status(400).send(error));




            })
            .catch((error) => res.status(400).send(error));

    },


    destory(req, res) {

        return User
            .findById(req.params.user_id)
            .then(user => {

                if (!user) {

                    return res.status(400).send({

                        message: 'User Not Found',


                    });

                }
                return todo
                    .destroy()
                    .then(() => res.status(200).send({ message: 'User deleted successfully' }))
                    .catch(error => res.send(400).send(error))



            })
            .catch(error => res.status(400).send(error));

    }




};