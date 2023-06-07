import { z } from 'zod';

const userZodSchema = z.object({
    body: z.object({
        role: z.string({
            required_error: 'role is required'
        })
    })
});

export const UserValidate = {
    userZodSchema
};
