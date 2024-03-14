const { Router } = require('express');
const management = require('../controllers/management');

const router = Router();

router.get('/',management.home);
router.get('/students',management.students);

router.get('/update',management.updates);
router.post('/add',management.add);
router.post('/updateStudent',management.updateStudent);
router.post('/addStudentMarks',management.updateStudentMarks);

router.get('/delete',management.deleteStudent);
router.post('/delete',management.deleteStudentRecord);

router.get('/search',management.search);
router.post('/searchStudent',management.searchStudent);

router.get('/filter',management.filter);
router.post('/filterStudent',management.filterStudent);

router.get('/bonus',management.bonus);
router.post('/avgClass',management.avgClass);
router.post('/avgMarks',management.avgMarks);

module.exports = router;