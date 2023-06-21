import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 8000,
    database_url: process.env.DATABASE_URI,
    default_student_pass: process.env.DEFAULT_USER_PASS,
    default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
    default_admin_pass: process.env.DEFAULT_ADMIN_PASS,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS
};
