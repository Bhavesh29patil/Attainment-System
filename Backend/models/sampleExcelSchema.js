const mongoose = require("mongoose");

const excelSchema = new mongoose.Schema(
  {
    data: [
      {
        CO: {
          type: String,
        },
        PO1: {
          type: Number,
        },
        PO2: {
          type: Number,
        },
        PO3: {
          type: Number,
        },
        PO4: {
          type: Number,
        },
        PO5: {
          type: Number,
        },
        PO6: {
          type: Number,
        },
        PO7: {
          type: Number,
        },
        PO8: {
          type: Number,
        },
        PO9: {
          type: Number,
        },
        PO10: {
          type: Number,
        },
        PO11: {
          type: Number,
        },
        PO12: {
          type: Number,
        },
        PSO1: {
          type: Number,
        },
        PSO2: {
          type: Number,
        },
        PSO3: {
          type: Number,
        },
      },
    ],
    // sheetData : Object,

    avg: [
      {
        CO: {
          type: String,
        },
        PO1: {
          type: Number,
        },
        PO2: {
          type: Number,
        },
        PO3: {
          type: Number,
        },
        PO4: {
          type: Number,
        },
        PO5: {
          type: Number,
        },
        PO6: {
          type: Number,
        },
        PO7: {
          type: Number,
        },
        PO8: {
          type: Number,
        },
        PO9: {
          type: Number,
        },
        PO10: {
          type: Number,
        },
        PO11: {
          type: Number,
        },
        PO12: {
          type: Number,
        },
        PSO1: {
          type: Number,
        },
        PSO2: {
          type: Number,
        },
        PSO3: {
          type: Number,
        },
      },
    ],
    subjectid: {
      type: mongoose.Schema.Types.ObjectId,
    },
    subjectName: {
      type: String,
    },
    sclassName: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Target: {
      Level1SPPU: Number,
      Level1UT: Number,
      Level2SPPU: Number,
      Level2UT: Number,
      Level3SPPU: Number,
      Level3UT: Number,
      AddMarksPerCO: Number,
    },
    students: [
      {
        srNo: {
          type: Number,
          required: true,
        },
        rollNo: {
          type: String,
          required: true,
        },
        seatNo: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        CO: {
          type: {
            CO1: Number,
            CO2: Number,
            CO3: Number,
            CO4: Number,
            CO5: Number,
            CO6: Number,
          },
          required: true,
        },
        SPPU: {
          type: Number,
          required: true,
        },
        // unitTest1: {
        //     type: Number,
        //     required: true
        // },
        // unitTest2: {
        //     type: Number,
        //     required: true
        // }
      },
    ],
    TotalStudents: {
      type: Number,
    },
    FinalcountAArray: {
      type: [[Number]],
    },
    OverallAttainment: {
      type: Number
    },
    POAttainment: {
      PO1: {
        type: Number,
      },
      PO2: {
        type: Number,
      },
      PO3: {
        type: Number,
      },
      PO4: {
        type: Number,
      },
      PO5: {
        type: Number,
      },
      PO6: {
        type: Number,
      },
      PO7: {
        type: Number,
      },
      PO8: {
        type: Number,
      },
      PO9: {
        type: Number,
      },
      PO10: {
        type: Number,
      },
      PO11: {
        type: Number,
      },
      PO12: {
        type: Number,
      },
      PSO1: {
        type: Number,
      },
      PSO2: {
        type: Number,
      },
      PSO3: {
        type: Number,
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("excelSchema", excelSchema);
