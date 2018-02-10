var express = require ('express');
var router = express.Router();
var model = require('../models/index');
var db = require('../models');
const todosController = require('../controllers').todos;


/* GET todo  listing */



//db.Todo.belongsTo(db.User);


/*router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));*/



router.post('/:user_id', todosController.create);

router.get('/', todosController.list)

router.get('/:todo_id',todosController.retrieve);

router.put('/:todo_id', todosController.update);

router.delete('/:todo_id',todosController.destory);


router.get('/todo/:user_id',todosController.retrieveTodo_by_userid);


router.get('/todoitem/:todo_id',todosController.retrieveTodo_by_todoItem_id);


/*

router.get('/', function(req,res,next){

    model.Todo.findAll({

        include: [
            {

                model: db.User,

            }
        ]

    })
        .then(todos => res.json({

            error:false,
            data:todos

        }))
        .catch(error => res.json({

            error:true,
            data:[],
            error:error

        }));



});

/* POST todo. 
router.post('/', function (req, res, next) {
    const {
        title,
        description,
        userId 
    } = req.body;
    model.Todo.create({
            title: title,
            description: description,
            UserId:userId,

        })
        .then(todo => res.status(201).json({
            error: false,
            data: todo,
            message: 'New todo has been created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});


router.put('/:id', function (req, res, next) {
 
    const todo_id = req.params.id;
 
    const { title, description } = req.body;
 
    model.Todo.update({
            title: title,
            description: description
        }, {
            where: {
                id: todo_id
            }
        })
        .then(todo => res.status(201).json({
            error: false,
            message: 'todo has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});


/*GET todo listing 

router.delete('/:id', function(req,res,next){

    const todo_id = req.params.id;

    model.Todo.destroy({


        where :{

            id:todo_id
        }
    })
    .then (status => res.status(201).json({
        error:false,
        message:'todo has been deleted.'

    }))
    .catch(error => res.json({


        error:true,
        error:error
    }));

});
*/



module.exports = router;