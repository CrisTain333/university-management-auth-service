import { z } from 'zod';
import {
    academicSemesterCodes,
    academicSemesterMonths,
    academicSemesterTitles
} from './academicSemester.constant';

const academicSemesterZodSchema = z.object({
    body: z.object({
        title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
            required_error: 'Title is required'
        }),
        year: z.string({
            required_error: 'Year Is required'
        }),
        code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
            required_error: 'Code is required'
        }),
        startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
            required_error: 'Start month is needed'
        }),
        endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
            required_error: 'End month is needed'
        })
    })
});

export const AcademicSemesterValidate = {
    academicSemesterZodSchema
};
