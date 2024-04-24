const router = require('express').Router();
const sampleExcelSchema = require('../models/sampleExcelSchema.js');
const Subject = require('../models/subjectSchema.js')

// const { adminRegister, adminLogIn, deleteAdmin, getAdminDetail, updateAdmin } = require('../controllers/admin-controller.js');


const {
  addCOSForSubject, GetCosForSubject, deleteCOSForSubject} = require("../controllers/teacher-controller.js");
const { adminRegister, adminLogIn, getAdminDetail,GetFinalAttainmentData,GetFinalAttainmentPOs } = require('../controllers/admin-controller.js');

const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
  studentRegister,
  studentLogIn,
  getStudents,
  getStudentDetail,
  deleteStudents,
  deleteStudent,
  updateStudent,
  studentAttendance,
  deleteStudentsByClass,
  updateExamResult,
  clearAllStudentsAttendanceBySubject,
  clearAllStudentsAttendance,
  removeStudentAttendanceBySubject,
  removeStudentAttendance } = require('../controllers/student_controller.js');
const {
  subjectCreate,
  classSubjects,
  deleteSubjectsByClass,
  getSubjectDetail,
  deleteSubject,
  freeSubjectList,
  allSubjects,
  deleteSubjects,
  AddCOWiseMarks,
  GenerateCOAttainment,
  GeneratePOAttainment,
  AddCOPOArticulationMatrix,
  COPOArticulationMatrix,
  COWiseMarks,
  AddTarget,
  getTargetData,
} = require("../controllers/subject-controller.js");
const { allteachers, teacherRegister, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../controllers/teacher-controller.js');

// Admin

router.post('/AdminReg', adminRegister);
router.post('/AdminLogin', adminLogIn);

router.get("/Admin/:id", getAdminDetail)

router.get("/GetFinalAttainmentData",GetFinalAttainmentData);
router.get("/GetFinalAttainmentPOs",GetFinalAttainmentPOs);


// router.delete("/Admin/:id", deleteAdmin)

// router.put("/Admin/:id", updateAdmin)

// Student

router.post('/StudentReg', studentRegister);
router.post('/StudentLogin', studentLogIn)

router.get("/Students/:id", getStudents)
router.get("/Student/:id", getStudentDetail)

router.delete("/Students/:id", deleteStudents)
router.delete("/StudentsClass/:id", deleteStudentsByClass)
router.delete("/Student/:id", deleteStudent)

router.put("/Student/:id", updateStudent)

router.put('/UpdateExamResult/:id', updateExamResult)

router.put('/StudentAttendance/:id', studentAttendance)

router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);

router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance)

// Teacher

router.post('/TeacherReg', teacherRegister);
router.post('/TeacherLogin', teacherLogIn)


router.get("/Teachers", allteachers);

router.get("/Teachers/:id", getTeachers)
router.get("/Teacher/:id", getTeacherDetail)

router.delete("/Teachers/:id", deleteTeachers)
router.delete("/TeachersClass/:id", deleteTeachersByClass)
router.delete("/Teacher/:id", deleteTeacher)

router.put("/TeacherSubject", updateTeacherSubject)

router.post('/TeacherAttendance/:id', teacherAttendance)

// Notice

router.post('/NoticeCreate', noticeCreate);

router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices)
router.delete("/Notice/:id", deleteNotice)

router.put("/Notice/:id", updateNotice)

// Complain

router.post('/ComplainCreate', complainCreate);

router.get('/ComplainList/:id', complainList);

// Sclass

router.post('/SclassCreate', sclassCreate);

router.get('/SclassList/:id', sclassList);
router.get("/Sclass/:id", getSclassDetail)

router.get("/Sclass/Students/:id", getSclassStudents)

router.delete("/Sclasses/:id", deleteSclasses)
router.delete("/Sclass/:id", deleteSclass)

// Subject

router.post('/SubjectCreate', subjectCreate);

router.get('/AllSubjects/:id', allSubjects);
router.get('/ClassSubjects/:id', classSubjects);
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail)

router.delete("/Subject/:id", deleteSubject)
router.delete("/Subjects/:id", deleteSubjects)
router.delete("/SubjectsClass/:id", deleteSubjectsByClass)

// CO
router.post("/AddCOs", addCOSForSubject);
router.get("/GetCOs", GetCosForSubject);
router.delete("/AddCOs", deleteCOSForSubject);

// Add-Articulation-Matrix
router.post('/AddCOPOArticulationMatrix/upload/:sid', AddCOPOArticulationMatrix);
router.get('/COPOArticulationMatrix/:sid', COPOArticulationMatrix);

// Add-Target
router.post("/Subject/AddTarget/:subid", AddTarget);
router.get("/Subject/AddTarget/:subid", getTargetData);

// CO-WiseMarks
router.post('/AddCOWiseMarks/upload/:sid', AddCOWiseMarks);
router.get('/COWiseMarks/:sid', COWiseMarks);

// Attainment 
router.get("/Subject/GenerateCOAttainment/:id", GenerateCOAttainment)
router.get("/Subject/GeneratePOAttainment/:id", GeneratePOAttainment)

//Add target
// router.post("/AddTarget", AddTarget);

module.exports = router;