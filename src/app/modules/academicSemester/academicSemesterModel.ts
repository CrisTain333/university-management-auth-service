import { Schema, model } from 'mongoose';
import { AcademicSemesterModel, IAcademicSemester } from './academicSemester.interface';
import {
    academicSemesterCodes,
    academicSemesterMonths,
    academicSemesterTitles
} from './academicSemester.constant';
import ApiError from '../../../error/ApiError';

const academicSemesterSchema = new Schema<IAcademicSemester>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterTitles
        },
        year: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCodes
        },
        startMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths
        },
        endMonth: {
            type: String,
            required: true,
            enum: academicSemesterMonths
        }
    },
    {
        timestamps: true
    }
);

academicSemesterSchema.pre('save', async function (next) {
    const ifExits = await AcademicSemester.findOne({ title: this.title, year: this.year });

    if (ifExits) {
        throw new ApiError(409, 'Academic semester all ready exits');
    }
    next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
    'AcademicSemester',
    academicSemesterSchema
);
