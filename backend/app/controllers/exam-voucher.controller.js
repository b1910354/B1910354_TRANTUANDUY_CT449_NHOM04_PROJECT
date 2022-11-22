const ApiError = require("../api-error");
const ExamVoucher = require("../models/exam-voucher.model");

// create a new ExamVoucher
exports.create = async (req, res, next) => {
    const examVouchers = await ExamVoucher.find().exec();
    if(examVouchers.length) {
        if(Object.keys(req.body) === 0) {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newExamVoucher = new ExamVoucher({
           stt: req.body.stt,
           expression: req.body.expression,
           patientCard: req.body.patientCard,
           scheduleWork: req.body.scheduleWork
        });
        const examVoucher = await ExamVoucher.find(
            {
                $and: [
                    {stt: {$in: req.body.stt}},
                    {scheduleWork: {$in: req.body.scheduleWork}},
                ]
            }
        ).exec();

        if(examVoucher.length) {
            return res.send({
                message: "ExamVoucher already exists",
                content: ExamVoucher
            });
        }

        try {
            const document = await newExamVoucher.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the ExamVoucher.")
            );
        }
    }

    try {
        const documents = await ExamVoucher.insertMany([
            {
                stt: 1,
                expression: "toothache",
                patientCard: "6357a5e97ea2e8d2c861217a",
                scheduleWork: "635806c6217b03afe8b6b5a2"
            },
            {
                stt: 2,
                expression: "toothache",
                patientCard: "6357a5e97ea2e8d2c861217b",
                scheduleWork: "635806c6217b03afe8b6b5a2"
            },
            {
                stt: 3,
                expression: "toothache",
                patientCard: "6357aa445f0bedacbc3574f9",
                scheduleWork: "635806c6217b03afe8b6b5a2"
            },
        ]);
        return res.send(documents);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the ExamVouchers.")
        );
    }
};

// find all ExamVouchers
exports.findAll = async (req, res, next) => {
    try {
        const examVouchers = await ExamVoucher.find().populate("patientCard").populate(
            // "scheduleWork"
            {
                path: 'scheduleWork',
                populate: {
                    path: 'employee',
                    path: 'date'
                },
            }
        ).exec();
        console.log(examVouchers);
        res.send(examVouchers);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all ExamVouchers ???")
        )
    }
}

