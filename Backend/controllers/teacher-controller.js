const bcrypt = require("bcrypt");
const Teacher = require("../models/teacherSchema.js");
const Subject = require("../models/subjectSchema.js");

const teacherRegister = async (req, res) => {
  const { name, email, password, role, school, teachSubject, teachSclass, post } =
    req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const teacher = new Teacher({
      name,
      email,
      password: hashedPass,
      role,
      school,
      teachSubject,
      teachSclass,
      post
    });

    const existingTeacherByEmail = await Teacher.findOne({ email });

    if (existingTeacherByEmail) {
      await Subject.findByIdAndUpdate(teachSubject, {
        teacher: existingTeacherByEmail._id,
      });

      const obj = await Subject.findById(teachSubject);

      const objid = obj._id;

      await Teacher.updateOne(
        {
          email: email,
        },
        {
          $push: {
            teachSubject: objid,

          },
        },
        { upsert: false, new: true }
      );
      res.status(200).json({ message: "hello" });
    }
    else {
      let result = await teacher.save();
      await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id });
      res.status(200).json({ message: 'New teacher created with subjects' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const teacherLogIn = async (req, res) => {
  try {
    let teacher = await Teacher.findOne({ email: req.body.email });
    if (teacher) {
      const validated = await bcrypt.compare(
        req.body.password,
        teacher.password
      );
      if (validated) {
        teacher = await teacher.populate("teachSubject", "subName sessions");
        teacher = await teacher.populate("school", "schoolName");
        teacher = await teacher.populate("teachSclass", "sclassName");
        teacher.password = undefined;
        res.send(teacher);
      } else {
        res.send({ message: "Invalid password" });
      }
    } else {
      res.send({ message: "Teacher not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL Teacher 

const allteachers = async (req, res) => {
  try {
    let teachers = await Teacher.find({})
      .populate("teachSubject", "subName")
      .populate("teachSclass", "sclassName");
    res.status(200).json({ teachers });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTeachers = async (req, res) => {
  try {
    let teachers = await Teacher.find({ school: req.params.id })
      .populate("teachSubject", "subName")
      .populate("teachSclass", "sclassName");
    if (teachers.length > 0) {
      let modifiedTeachers = teachers.map((teacher) => {
        return { ...teacher._doc, password: undefined };
      });
      res.send(modifiedTeachers);
    } else {
      res.send({ message: "No teachers found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTeacherDetail = async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id)
      .populate("teachSubject", "subName sessions subCode sclassName")
      .populate("school", "schoolName")
      .populate("teachSclass", "sclassName");
    if (teacher) {
      teacher.password = undefined;
      res.send(teacher);
    } else {
      res.send({ message: "No teacher found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTeacherSubject = async (req, res) => {
  const { teacherId, teachSubject } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { teachSubject },
      { new: true }
    );

    await Subject.findByIdAndUpdate(teachSubject, {
      teacher: updatedTeacher._id,
    });

    res.send(updatedTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    await Subject.updateOne(
      { teacher: deletedTeacher._id, teacher: { $exists: true } },
      { $unset: { teacher: 1 } }
    );

    res.send(deletedTeacher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeachers = async (req, res) => {
  try {
    const deletionResult = await Teacher.deleteMany({ school: req.params.id });

    const deletedCount = deletionResult.deletedCount || 0;

    if (deletedCount === 0) {
      res.send({ message: "No teachers found to delete" });
      return;
    }

    const deletedTeachers = await Teacher.find({ school: req.params.id });

    await Subject.updateMany(
      {
        teacher: { $in: deletedTeachers.map((teacher) => teacher._id) },
        teacher: { $exists: true },
      },
      { $unset: { teacher: "" }, $unset: { teacher: null } }
    );

    res.send(deletionResult);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTeachersByClass = async (req, res) => {
  try {
    const deletionResult = await Teacher.deleteMany({
      sclassName: req.params.id,
    });

    const deletedCount = deletionResult.deletedCount || 0;

    if (deletedCount === 0) {
      res.send({ message: "No teachers found to delete" });
      return;
    }

    const deletedTeachers = await Teacher.find({ sclassName: req.params.id });

    await Subject.updateMany(
      {
        teacher: { $in: deletedTeachers.map((teacher) => teacher._id) },
        teacher: { $exists: true },
      },
      { $unset: { teacher: "" }, $unset: { teacher: null } }
    );

    res.send(deletionResult);
  } catch (error) {
    res.status(500).json(error);
  }
};

const teacherAttendance = async (req, res) => {
  const { status, date } = req.body;

  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.send({ message: "Teacher not found" });
    }

    const existingAttendance = teacher.attendance.find(
      (a) => a.date.toDateString() === new Date(date).toDateString()
    );

    if (existingAttendance) {
      existingAttendance.status = status;
    } else {
      teacher.attendance.push({ date, status });
    }

    const result = await teacher.save();
    return res.send(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


const addCOSForSubject = async (req, res) => {
  try {
    const { subid } = req.body;
    const { CO } = req.body;

    const subject = await Subject.findById(subid);
    subject.courseOutcomes.push(CO);
    await subject.save();
  } catch (error) {
    console.log("Error in AddcOSForSubject", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetCosForSubject = async (req, res) => {
  const subid = req.query.subid;

  try {

    let subject = await Subject.findById(subid);

    if (subject) {
      const CO = subject.courseOutcomes || [];
      res.status(200).json({ CO });
    } else {
      res.status(404).json({ message: "No subject found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteCOSForSubject = async (req, res) => {
  try {
    const { subid, CO } = req.body;

    const subject = await Subject.findById(subid);

    if (!subject) {
      return res.status(404).json({ message: "No subject found" });
    }

    // Filter out the specified CO based on outcomeNumber and description
    subject.courseOutcomes = subject.courseOutcomes.filter(
      (existingCO) =>
        existingCO.outcomeNumber !== CO.outcomeNumber ||
        existingCO.description !== CO.description
    );

    // Save the updated subject with the filtered courseOutcomes
    await subject.save();

    res.status(200).json({ message: "Course outcomes deleted successfully" });
  } catch (error) {
    console.log("Error in deleteCOSForSubject", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = {
  allteachers,
  teacherRegister,
  teacherLogIn,
  getTeachers,
  getTeacherDetail,
  updateTeacherSubject,
  deleteTeacher,
  deleteTeachers,
  deleteTeachersByClass,
  teacherAttendance,
  addCOSForSubject,
  GetCosForSubject,
  deleteCOSForSubject
};
