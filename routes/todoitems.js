var express = require ('express');
var router = express.Router();
var model = require('../models/index');
var db = require('../models');
const todosItemsController = require('../controllers').todoItems;

router.post('/:todo_id',todosItemsController.create);



router.put('/:todo_id/:todoItem_id',todosItemsController.update);

router.delete('/:todo_id/:todoItem_id',todosItemsController.destroy);
module.exports = router;