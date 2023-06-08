import { z } from 'zod';
import { academicSemesterMonths } from './academicSemester.constant';

const academicSemesterZodSchema = z.object({
    body: z.object({
        title: z.enum(['Autumn', 'Summer', 'Fall'], {
            required_error: 'Title is required'
        }),
        year: z.number({
            required_error: 'Year Is required'
        }),
        code: z.enum(['01', '02', '03'], {
            required_error: 'Code is required'
        }),
        startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
            required_error: 'Start month is required'
        }),
        endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
            required_error: 'End month is required'
        })
    })
});

export const AcademicSemesterValidate = {
    academicSemesterZodSchema
};
