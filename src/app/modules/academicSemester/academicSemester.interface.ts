import { Model } from 'mongoose';
export type IAcademicSemesterMonths =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December';

export type IAcademicSemester = {
    title: 'Autumn' | 'Summer' | 'Fall';
    year: number;
    code: '01' | '02' | '03';
    startMonth: IAcademicSemesterMonths;
    endMonth: IAcademicSemesterMonths;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
