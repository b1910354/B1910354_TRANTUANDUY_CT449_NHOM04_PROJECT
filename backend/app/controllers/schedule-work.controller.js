const ApiError = require("../api-error");
const ScheduleWork = require("../models/schedule-work.model");

// create a new ScheduleWork
exports.create = async (req, res, next) => {
    const scheduleWorks = await ScheduleWork.find().exec();
    if(scheduleWorks.length) {
        if(Object.keys(req.body) === 0 || req.body.date == null || req.body.shifts == null || req.body.employee == null) {
            return next(
                new ApiError(
                    400,
                    "Data to create can not be empty"
                )
            );
        }

        const newScheduleWork = new ScheduleWork({
            date: new Date(req.body.date),
            note: req.body.note,
            shifts: req.body.shifts,
            employee: req.body.employee,
        });
        const scheduleWork = await ScheduleWork.find(
            {
                $and: [
                    {employee: {$in: req.body.employee}},
                    {date: {$in: req.body.date}},
                ]
            }
        ).exec();

        if(scheduleWork.length) {
            return res.send({
                message: "ScheduleWork already exists",
                content: scheduleWork
            });
        }

        try {
            const document = await newScheduleWork.save();
            return res.send(document);
        }catch(error) {
            return next(
                new ApiError(500, "An error occurred while creating the ScheduleWork.")
            );
        }
    }

    try {
        const documents = await ScheduleWork.insertMany([
            {
                date: "635791c8f4eedf009624cdea",
                note: "abc",
                employee: "635805bcc18f7e53ba9f2097",
                shifts: ['634fbbf04d87d700542f02ff', '634fbbf04d87d700542f0300', '634fbbf04d87d700542f0302'],
            },
            {
                date: "635791c8f4eedf009624cdea",
                note: "abc",
                employee: "635805bcc18f7e53ba9f2098",
                shifts: ['634fbbf04d87d700542f02ff', '634fbbf04d87d700542f0300', '634fbbf04d87d700542f0302'],
            },
            {
                date: "635791c8f4eedf009624cdea",
                note: "abc",
                employee: "635805bcc18f7e53ba9f2099",
                shifts: ['634fbbf04d87d700542f02ff', '634fbbf04d87d700542f0301', '634fbbf04d87d700542f0302'],
            },
        ]);
        return res.send(documents);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while creating the ScheduleWorks.")
        );
    }
};

// find all ScheduleWorks
exports.findAll = async (req, res, next) => {
    try {
        const scheduleWorks = await ScheduleWork.find().populate("date").populate("employee").populate("shifts").exec();
        res.send(scheduleWorks);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all ScheduleWorks ???")
        )
    }
}

exports.find = async (req, res, next) => {
    try {
        const scheduleWork = await ScheduleWork.findById({_id: req.params.id}).populate("date").populate("employee").populate("shifts").exec();
        res.send(scheduleWork);
    }catch(error) {
        return next(
            new ApiError(500, "An error occurred while querying all ScheduleWorks ???")
        )
    }
}

