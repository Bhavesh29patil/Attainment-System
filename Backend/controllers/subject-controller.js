const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Student = require('../models/studentSchema.js');
const sampleExcelSchema = require('../models/sampleExcelSchema.js')
const mongoose = require('mongoose')

const subjectCreate = async (req, res) => {
  try {
    const subjects = req.body.subjects.map((subject) => ({
      subName: subject.subName,
      subCode: subject.subCode,
      sessions: subject.sessions,
    }));

    const existingSubjectBySubCode = await Subject.findOne({
      'subjects.subCode': subjects[0].subCode,
      school: req.body.adminID,
    });

    if (existingSubjectBySubCode) {
      res.send({ message: 'Sorry this subcode must be unique as it already exists' });
    } else {
      const newSubjects = subjects.map((subject) => ({
        ...subject,
        sclassName: req.body.sclassName,
        school: req.body.adminID,
      }));

      const result = await Subject.insertMany(newSubjects);
      res.send(result);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const allSubjects = async (req, res) => {
  try {
    let subjects = await Subject.find({ school: req.params.id })
      .populate("sclassName", "sclassName")
    if (subjects.length > 0) {
      res.send(subjects)
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const classSubjects = async (req, res) => {
  try {
    let subjects = await Subject.find({ sclassName: req.params.id })
    if (subjects.length > 0) {
      res.send(subjects)
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const freeSubjectList = async (req, res) => {
  try {
    let subjects = await Subject.find({ sclassName: req.params.id, teacher: { $exists: false } });
    if (subjects.length > 0) {
      res.send(subjects);
    } else {
      res.send({ message: "No subjects found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSubjectDetail = async (req, res) => {
  try {
    let subject = await Subject.findById(req.params.id);
    if (subject) {
      subject = await subject.populate("sclassName", "sclassName")
      subject = await subject.populate("teacher", "name")
      res.send(subject);
    }
    else {
      res.send({ message: "No subject found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// const deleteSubject = async (req, res) => {
//     try {
//         const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

//         // Set the teachSubject field to null in teachers
//         await Teacher.updateOne(
//             { teachSubject: deletedSubject._id },
//             { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
//         );

//         // Remove the objects containing the deleted subject from students' examResult array
//         await Student.updateMany(
//             {},
//             { $pull: { examResult: { subName: deletedSubject._id } } }
//         );

//         // Remove the objects containing the deleted subject from students' attendance array
//         await Student.updateMany(
//             {},
//             { $pull: { attendance: { subName: deletedSubject._id } } }
//         );

//         res.send(deletedSubject);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };

const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);

    // Remove the deleted subject from teachSubject array in teachers
    await Teacher.updateMany(
      { teachSubject: deletedSubject._id },
      { $pull: { teachSubject: deletedSubject._id } }
    );

    // Remove the objects containing the deleted subject from students' examResult array
    await Student.updateMany(
      {},
      { $pull: { examResult: { subName: deletedSubject._id } } }
    );

    // Remove the objects containing the deleted subject from students' attendance array
    await Student.updateMany(
      {},
      { $pull: { attendance: { subName: deletedSubject._id } } }
    );

    res.send(deletedSubject);
  } catch (error) {
    res.status(500).json(error);
  }
};


const deleteSubjects = async (req, res) => {
  try {
    const deletedSubjects = await Subject.deleteMany({ school: req.params.id });

    // Set the teachSubject field to null in teachers
    await Teacher.updateMany(
      { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
      { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
    );

    // Set examResult and attendance to null in all students
    await Student.updateMany(
      {},
      { $set: { examResult: null, attendance: null } }
    );

    res.send(deletedSubjects);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSubjectsByClass = async (req, res) => {
  try {
    const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });

    // Set the teachSubject field to null in teachers
    await Teacher.updateMany(
      { teachSubject: { $in: deletedSubjects.map(subject => subject._id) } },
      { $unset: { teachSubject: "" }, $unset: { teachSubject: null } }
    );

    // Set examResult and attendance to null in all students
    await Student.updateMany(
      {},
      { $set: { examResult: null, attendance: null } }
    );

    res.send(deletedSubjects);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getTargetData = async (req, res) => {
  const { subid } = req.params;
  // console.log(subid)
  try {
    const excelDoc = await sampleExcelSchema.findOne({ subjectid: subid });
    // console.log(excelDoc)
    if (!excelDoc) {
      return res.status(404).json({ error: "Document not found" });
    }
    const targetData = excelDoc.Target;
    res.status(200).json(targetData);
    // console.log(targetData)
  } catch (error) {
    console.error("Error fetching target data:", error);
    res.status(500).json({ error: "Failed to fetch target data" });
  }
};




const AddTarget = async (req, res) => {
  const { targetData } = req.body;
  const { subid } = req.params;
  // console.log(subid)
  // console.log(targetData)
  try {
    // Find the document by subject ID
    const excelDoc = await sampleExcelSchema.findOne({ subjectid: subid });
    // console.log(excelDoc);
    if (!excelDoc) {
      return res.status(404).json({ error: "Document not found" });
    }

    // Update the target data in the document
    // excelDoc.Target.Level1UT = targetData.Level1UT;
    // excelDoc.Target.Level1SPPU = targetData.Level1SPPU;
    // excelDoc.Target.Level2UT = targetData.Level2UT;
    // excelDoc.Target.Level2SPPU = targetData.Level2SPPU;
    // excelDoc.Target.Level3UT = targetData.Level3UT;
    // excelDoc.Target.Level3SPPU = targetData.Level3SPPU;
    excelDoc.Target.Level1SPPU = targetData.Level1SPPU;
    excelDoc.Target.Level1UT = targetData.Level1UT;
    excelDoc.Target.Level2SPPU = targetData.Level2SPPU;
    excelDoc.Target.Level2UT = targetData.Level2UT;
    excelDoc.Target.Level3SPPU = targetData.Level3SPPU;
    excelDoc.Target.Level3UT = targetData.Level3UT;
    excelDoc.Target.AddMarksPerCO = targetData.AddMarksPerCO;
    // Save the updated document
    await excelDoc.save();

    res.status(200).json({ message: "Target added successfully" });
  } catch (error) {
    console.error("Error saving target data to ExcelSchema:", error);
    res.status(500).json({ error: "Failed to save target data" });
  }
};

const AddCOPOArticulationMatrix = async (req, res) => {
  const dataToInsert = req.body;
  const sid = req.params.sid
  console.log(sid)
  const columnAverages = {};
  Object.keys(dataToInsert[0]).forEach((column) => {
    // const values = dataToInsert.map((row) => row[column]);
    const values = dataToInsert
      .map((row) => row[column])
      .filter((cellValue) => cellValue !== 0);

    // const average = values.reduce((sum, value) => sum + value, 0) / values.length;
    // columnAverages[column] = average;

    const average = values.reduce((sum, value) => sum + (isNaN(value) ? 0 : value), 0) / values.length;
    columnAverages[column] = isNaN(average) ? 0 : average;

  });
  try {
    const subject = await Subject.findById(sid);
    // Save the entire array of objects as a single document
    const result = await sampleExcelSchema.create({
      data: dataToInsert,
      avg: columnAverages,
      subjectid: sid,
      subjectName: subject.subName,
      sclassName: subject.sclassName,
    });

    res.json(result)
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
  }
}

const COPOArticulationMatrix = async (req, res) => {
  const sid = req.params.sid;
  try {
    const document = await sampleExcelSchema.findOne({ subjectid: sid });

    if (document) {
      if (document.data && document.data.length > 0) {
        res.status(200).json({ data: document.data, avg: document.avg });
      } else {
        res.status(404).json({ message: "Data not present" });
      }
    } else {
      res.status(404).json({ message: "No document found with the provided subjectId" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const AddCOWiseMarks = async (req, res) => {
  const data = req.body;
  const sid = req.params.sid

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingData = await sampleExcelSchema.findOne({ subjectid: sid });
      if (!existingData) {
        console.log('No document found with subject = "DSA"');
        res.status(404).send('No document found with subject = "DSA"');
        return;
      }

      const countA = new Array(data[0].length).fill(0);

      for (let i = 0; i < data.length; i++) {
        const row = data[i];

        for (let j = 0; j < row.length; j++) {
          if (typeof row[j] === 'undefined') {
            row[j] = 0;
            countA[j]++;
          } else if (row[j] == 'A') {
            // If the value is not a number, set it to 0
            row[j] = 0;
            countA[j]++;
          }
        }

        const studentData = {
          srNo: row[0],
          rollNo: row[1] ? row[1].toString() : '0',
          seatNo: row[2] ? row[2].toString() : '0',
          name: row[3] || 'Unknown',
          CO: {
            CO1: row[4] || 0,
            CO2: row[5] || 0,
            CO3: row[6] || 0,
            CO4: row[7] || 0,
            CO5: row[8] || 0,
            CO6: row[9] || 0,
          },
          SPPU: row[10] || 0,
          // unitTest1: row[12] || 0,
          // unitTest2: row[13] || 0
        };

        existingData.students.push(studentData);
      }

      const FinalcountAArray = countA.slice(4)
      const TotalStudents = data.length
      // console.log(TotalStudents)
      // console.log(FinalcountAArray)

      existingData.TotalStudents = TotalStudents;
      existingData.FinalcountAArray.push(FinalcountAArray);



      await existingData.save();
      await session.commitTransaction();
      session.endSession();

      console.log('Data inserted into existing document successfully');
      res.status(200).send('Data inserted into existing document successfully');
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      console.error('Error saving student data:', error);
      res.status(500).send('Error saving student data:', error);
    }
  } catch (error) {
    console.error('Error starting transaction:', error);
    res.status(500).send('Error starting transaction:', error);
  }
}

const COWiseMarks = async (req, res) => {
  const sid = req.params.sid;
  try {
    const document = await sampleExcelSchema.findOne({ subjectid: sid });

    if (document) {
      if (document.students && document.students.length > 0) {
        res.status(200).json({ students: document.students, TotalStudents: document.students, FinalcountAArray: document.FinalcountAArray });
      } else {
        res.status(404).json({ message: "Data not present" });
      }
    } else {
      res.status(404).json({ message: "No document found with the provided subjectId" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const GenerateCOAttainment = async (req, res) => {
  const { targetData } = req.body;
  try {
    const subid = req.params.id;
    const excelSchema = await sampleExcelSchema.findOne({ subjectid: subid });
    if (!excelSchema) {
      return res
        .status(404)
        .json({ message: "ExcelSchema not found for the specified subid" });
    }
    const students = excelSchema.students;
    const TotalStudents = excelSchema.TotalStudents;
    const FinalcountAArray = excelSchema.FinalcountAArray;
    const targetDataFromDB = excelSchema.Target;

    const CO1_UT1_present = TotalStudents - FinalcountAArray[0][0];
    const CO1_UT2_present = TotalStudents - FinalcountAArray[0][1];
    const CO1_UT3_present = TotalStudents - FinalcountAArray[0][2];
    const CO1_UT4_present = TotalStudents - FinalcountAArray[0][3];
    const CO1_UT5_present = TotalStudents - FinalcountAArray[0][4];
    const CO1_UT6_present = TotalStudents - FinalcountAArray[0][5];

    const SPPU_PRESENT = TotalStudents - FinalcountAArray[0][6];
    const Marks = targetDataFromDB.AddMarksPerCO;

    console.log(Marks)
    // const TargetToAchieveUTlvl1 = 95
    // const TargetToAchieveUTlvl2 = 86
    // const TargetToAchieveUTlvl3 = 78

    // const TargetToAchieveSPPUlvl1 = 100
    // const TargetToAchieveSPPUlvl2 = 95
    // const TargetToAchieveSPPUlvl3 = 90

    // console.log(targetDataFromDB.Level1UT);
    // console.log(targetDataFromDB.Level1SPPU);
    // console.log(targetDataFromDB.Level2UT);
    // console.log(targetDataFromDB.Level2SPPU);
    // console.log(targetDataFromDB.Level3UT);
    // console.log(targetDataFromDB.Level3SPPU);
    const TargetToAchieveUTlvl1 = targetDataFromDB.Level1UT;
    const TargetToAchieveUTlvl2 = targetDataFromDB.Level2UT;
    const TargetToAchieveUTlvl3 = targetDataFromDB.Level3UT;

    const TargetToAchieveSPPUlvl1 = targetDataFromDB.Level1SPPU;
    const TargetToAchieveSPPUlvl2 = targetDataFromDB.Level2SPPU;
    const TargetToAchieveSPPUlvl3 = targetDataFromDB.Level3SPPU;

    function countStudentsForEachCOGreaterThanOrEqualFour(students) {
      let countByCOlvl1 = {
        CO1: 0,
        CO2: 0,
        CO3: 0,
        CO4: 0,
        CO5: 0,
        CO6: 0,
        SPPU: 0,
      };

      const coFields = [
        "CO1",
        "CO2",
        "CO3",
        "CO4",
        "CO5",
        "CO6",
        "SPPU",
      ];

      students.forEach((student) => {
        coFields.forEach((coField) => {
          const coValue = student.CO[coField];
          if (coValue >= 0.4 * Marks) {
            countByCOlvl1[coField]++;
          }
        });
      });

      students.forEach((student) => {
        const sppuValue = student.SPPU;
        if (sppuValue >= 40) {
          countByCOlvl1["SPPU"]++;
        }
      });

      return countByCOlvl1;
    }

    function countStudentsForEachCOGreaterThanOrEqualSix(students) {
      let countByCOlvl2 = {
        CO1: 0,
        CO2: 0,
        CO3: 0,
        CO4: 0,
        CO5: 0,
        CO6: 0,
        SPPU: 0,
      };

      const coFields = [
        "CO1",
        "CO2",
        "CO3",
        "CO4",
        "CO5",
        "CO6",
        "SPPU",
      ];

      students.forEach((student) => {
        coFields.forEach((coField) => {
          const coValue = student.CO[coField];
          if (coValue >= 0.6 * Marks) {
            countByCOlvl2[coField]++;
          }
        });
      });

      students.forEach((student) => {
        const sppuValue = student.SPPU;
        if (sppuValue >= 60) {
          countByCOlvl2["SPPU"]++;
        }
      });

      return countByCOlvl2;
    }
    function countStudentsForEachCOGreaterThanOrEqualSixpointSix(students) {
      let countByCOlvl3 = {
        CO1: 0,
        CO2: 0,
        CO3: 0,
        CO4: 0,
        CO5: 0,
        CO6: 0,
        SPPU: 0,
      };

      const coFields = [
        "CO1",
        "CO2",
        "CO3",
        "CO4",
        "CO5",
        "CO6",
        "SPPU",
      ];

      students.forEach((student) => {
        coFields.forEach((coField) => {
          const coValue = student.CO[coField];
          if (coValue >= 0.66 * Marks) {
            countByCOlvl3[coField]++;
          }
        });
      });

      students.forEach((student) => {
        const sppuValue = student.SPPU;
        if (sppuValue >= 66) {
          countByCOlvl3["SPPU"]++;
        }
      });

      return countByCOlvl3;
    }

    const TargetLevel1 =
      countStudentsForEachCOGreaterThanOrEqualFour(students);
    const TargetLevel2 =
      countStudentsForEachCOGreaterThanOrEqualSix(students);
    const TargetLevel3 =
      countStudentsForEachCOGreaterThanOrEqualSixpointSix(students);

    // console.log(TargetLevel1);
    // console.log(TargetLevel2);
    // console.log(TargetLevel3);

    const PercentStudentLevel1 = {};
    for (const [key, value] of Object.entries(TargetLevel1)) {
      let presentCount;
      switch (key) {
        case "CO1":
          presentCount = CO1_UT1_present;
          break;
        case "CO2":
          presentCount = CO1_UT2_present;
          break;
        case "CO3":
          presentCount = CO1_UT3_present;
          break;
        case "CO4":
          presentCount = CO1_UT4_present;
          break;
        case "CO5":
          presentCount = CO1_UT5_present;
          break;
        case "CO6":
          presentCount = CO1_UT6_present;
          break;
        case "SPPU":
          presentCount = SPPU_PRESENT;
          break;
        default:
          presentCount = 0;
      }

      PercentStudentLevel1[key] = (value / presentCount) * 100;
    }

    let UpcomingTargetlvl1;
    let SumOfUpcomingTargetlvl1 = 0;
    for (const [key, value] of Object.entries(PercentStudentLevel1)) {
      if (key !== "SPPU") {
        SumOfUpcomingTargetlvl1 += value;
      }
    }
    UpcomingTargetlvl1 = SumOfUpcomingTargetlvl1 / 6;

    const PercentStudentLevel2 = {};
    for (const [key, value] of Object.entries(TargetLevel2)) {
      let presentCount;
      switch (key) {
        case "CO1":
          presentCount = CO1_UT1_present;
          break;
        case "CO2":
          presentCount = CO1_UT2_present;
          break;
        case "CO3":
          presentCount = CO1_UT3_present;
          break;
        case "CO4":
          presentCount = CO1_UT4_present;
          break;
        case "CO5":
          presentCount = CO1_UT5_present;
          break;
        case "CO6":
          presentCount = CO1_UT6_present;
          break;
        case "SPPU":
          presentCount = SPPU_PRESENT;
          break;
        default:
          presentCount = 0;
      }

      PercentStudentLevel2[key] = (value / presentCount) * 100;
    }

    let UpcomingTargetlvl2;
    let SumOfUpcomingTargetlvl2 = 0;
    for (const [key, value] of Object.entries(PercentStudentLevel2)) {
      if (key !== "SPPU") {
        SumOfUpcomingTargetlvl2 += value;
      }
    }
    UpcomingTargetlvl2 = SumOfUpcomingTargetlvl2 / 6;

    const PercentStudentLevel3 = {};
    for (const [key, value] of Object.entries(TargetLevel3)) {
      let presentCount;
      switch (key) {
        case "CO1":
          presentCount = CO1_UT1_present;
          break;
        case "CO2":
          presentCount = CO1_UT2_present;
          break;
        case "CO3":
          presentCount = CO1_UT3_present;
          break;
        case "CO4":
          presentCount = CO1_UT4_present;
          break;
        case "CO5":
          presentCount = CO1_UT5_present;
          break;
        case "CO6":
          presentCount = CO1_UT6_present;
          break;
        case "SPPU":
          presentCount = SPPU_PRESENT;
          break;
        default:
          presentCount = 0;
      }

      PercentStudentLevel3[key] = (value / presentCount) * 100;
    }

    let UpcomingTargetlvl3;
    let SumOfUpcomingTargetlvl3 = 0;
    for (const [key, value] of Object.entries(PercentStudentLevel3)) {
      if (key !== "SPPU") {
        SumOfUpcomingTargetlvl3 += value;
      }
    }
    UpcomingTargetlvl3 = SumOfUpcomingTargetlvl3 / 6;

    // console.log(PercentStudentLevel1)
    // console.log(PercentStudentLevel2)
    // console.log(PercentStudentLevel3)

    // console.log(UpcomingTargetlvl1)
    // console.log(UpcomingTargetlvl2)
    // console.log(UpcomingTargetlvl3)

    const Level1Att = {};
    for (const [key, value] of Object.entries(PercentStudentLevel1)) {
      let target;
      if (key == "SPPU") target = TargetToAchieveSPPUlvl1;
      else target = TargetToAchieveUTlvl1;
      Level1Att[key] = (value / target) * 1;
    }

    const Level2Att = {};
    for (const [key, value] of Object.entries(PercentStudentLevel2)) {
      let target;
      if (key == "SPPU") target = TargetToAchieveSPPUlvl2;
      else target = TargetToAchieveUTlvl2;
      Level2Att[key] = (value / target) * 2;
    }

    const Level3Att = {};
    for (const [key, value] of Object.entries(PercentStudentLevel3)) {
      let target;
      if (key == "SPPU") target = TargetToAchieveSPPUlvl3;
      else target = TargetToAchieveUTlvl3;
      Level3Att[key] = (value / target) * 3;
    }

    // console.log(Level1Att)
    // console.log(Level2Att)
    // console.log(Level3Att)

    const Level1FinalAtt = {};
    for (const [key, value] of Object.entries(Level1Att)) {
      if (value > 1) Level1FinalAtt[key] = 1;
      else Level1FinalAtt[key] = Level1Att[key];
    }

    const Level2FinalAtt = {};
    for (const [key, value] of Object.entries(Level2Att)) {
      if (value > 2) Level2FinalAtt[key] = 2;
      else Level2FinalAtt[key] = Level2Att[key];
    }

    const Level3FinalAtt = {};
    for (const [key, value] of Object.entries(Level3Att)) {
      if (value > 3) Level3FinalAtt[key] = 3;
      else Level3FinalAtt[key] = Level3Att[key];
    }

    // console.log(Level1FinalAtt)
    // console.log(Level2FinalAtt)
    // console.log(Level3FinalAtt)

    const FinalAtt = [Level1FinalAtt, Level2FinalAtt, Level3FinalAtt];
    // console.log(FinalAtt)

    const SumOfFinalAttUT = {};
    let SumOfFinalAttSPPU = 0;

    FinalAtt.forEach((obj) => {
      for (const key in obj) {
        if (key !== "SPPU") {
          if (SumOfFinalAttUT[key]) {
            SumOfFinalAttUT[key] += obj[key];
          } else {
            SumOfFinalAttUT[key] = obj[key];
          }
        } else {
          SumOfFinalAttSPPU += obj[key];
        }
      }
    });

    // console.log(SumOfFinalAttUT)
    // console.log(SumOfFinalAttSPPU)

    const UTAttainmentOfAllCO = {};
    for (const key in SumOfFinalAttUT) {
      UTAttainmentOfAllCO[key] = SumOfFinalAttUT[key] / 6;
    }
    // console.log(UTAttainmentOfAllCO);

    const FinalSumOfAllUT = Object.values(UTAttainmentOfAllCO).reduce(
      (acc, val) => acc + val,
      0
    );

    const FinalUTAttainment =
      FinalSumOfAllUT / Object.keys(UTAttainmentOfAllCO).length;
    const FinalSPPUAttainment = SumOfFinalAttSPPU / 6;

    // console.log("UT Attainment:", FinalUTAttainment);
    // console.log("SPPU Attainment:", FinalSPPUAttainment);
    const OverallAttainment =
      FinalUTAttainment * 0.3 + FinalSPPUAttainment * 0.7;
    // console.log("Final Attainment:", OverallAttainment);

    // console.log("Upcoming Target Level 1:", UpcomingTargetlvl1)
    // console.log("Upcoming Target Level 2:", UpcomingTargetlvl2)
    // console.log("Upcoming Target Level 3:", UpcomingTargetlvl3)

    const FinalAttainmentData = [
      {
        FinalUTAttainment,
        FinalSPPUAttainment,
        OverallAttainment,
        UpcomingTargetlvl1,
        UpcomingTargetlvl2,
        UpcomingTargetlvl3,
      },
    ];
    const FinalAttainmentData2 = [
      {
        TargetLevel1,
        TargetLevel2,
        TargetLevel3,
        PercentStudentLevel1,
        PercentStudentLevel2,
        PercentStudentLevel3,
        UpcomingTargetlvl1,
        UpcomingTargetlvl2,
        UpcomingTargetlvl3,
        Level1Att,
        Level2Att,
        Level3Att,
        Level1FinalAtt,
        Level2FinalAtt,
        Level3FinalAtt,
        FinalUTAttainment,
        FinalSPPUAttainment,
        OverallAttainment,
        UTAttainmentOfAllCO,
      },
    ];
    excelSchema.OverallAttainment = OverallAttainment.toFixed(2);
    await excelSchema.save();
    res.status(200).json({ FinalAttainmentData2 });
  } catch (error) {
    console.error('Error finding ExcelSchema:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

const GeneratePOAttainment = async (req, res) => {
  const subid = req.params.id;
  const excelSchema = await sampleExcelSchema.findOne({ subjectid: subid });
  if (!excelSchema) {
    return res.status(404).json({ message: "ExcelSchema not found for the specified subid" });
  }
  const POAttainmentt = excelSchema.avg[0]; 

  const processedData = {};
  for (const key in POAttainmentt) {
    if (typeof POAttainmentt[key] === 'number') {
      processedData[key] = POAttainmentt[key] * excelSchema.OverallAttainment; 
    }
  }
  excelSchema.POAttainment = processedData;
  await excelSchema.save();

  return res.status(200).json({ processedData });

}


module.exports = {
  subjectCreate,
  freeSubjectList,
  classSubjects,
  getSubjectDetail,
  deleteSubjectsByClass,
  deleteSubjects,
  deleteSubject,
  allSubjects,
  AddCOWiseMarks,
  GenerateCOAttainment,
  GeneratePOAttainment,
  AddCOPOArticulationMatrix,
  COPOArticulationMatrix,
  COWiseMarks,
  AddTarget,
  getTargetData,
};