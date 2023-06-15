import { Schema, model } from 'mongoose';
import { IFaculty, facultyModel } from './faculty.interface';
import { bloodGroup, gender } from '../student/student.constant';

const facultySchema = new Schema<IFaculty>(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: {
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                middleName: {
                    type: String,
                    required: false
                }
            },
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: gender
        },
        email: {
            type: String,
            required: true
        },
        contactNo: {
            type: String,
            required: true
        },
        presentAddress: {
            type: String,
            required: true
        },
        permanentAddress: {
            type: String,
            required: true
        },
        emergencyContactNo: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        },
        bloodGroup: {
            type: String,
            enum: bloodGroup
        },
        profileImage: {
            type: String
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
            required: true
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

export const Faculty = model<IFaculty, facultyModel>('Faculty', facultySchema);
