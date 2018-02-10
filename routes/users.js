var express = require ('express');
var router = express.Router();
var db = require('../models');
const usersController = require('../controllers').users;




/*add the user */
router.post('/',usersController.create);



/* GET users listing. */

router.get('/',usersController.list);

/* Get user listing by specific Id */
router.get('/:user_id',usersController.retrieve);


/* update the user*/
router.put('/:user_id', usersController.update);


/*  delete the user*/
router.delete('/:user_id',usersController.destory);

module.exports = router;
