import express from 'express';
import { FacultyController } from './faculty.controller';
import validateRequest from '../../../middleware/validateRequest';
import { FacultyValidation } from './faculty.validation';
import auth from '../../../middleware/auth';
import { USER_ENUM_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
    '/:id',
    auth(
        USER_ENUM_ROLE.ADMIN,
        USER_ENUM_ROLE.FACULTY,
        USER_ENUM_ROLE.SUPER_ADMIN
    ),
    FacultyController.getSingleFaculty
);
router.get(
    '/',
    auth(
        USER_ENUM_ROLE.ADMIN,
        USER_ENUM_ROLE.FACULTY,
        USER_ENUM_ROLE.SUPER_ADMIN
    ),
    FacultyController.getAllFaculties
);

router.patch(
    '/:id',
    validateRequest(FacultyValidation.updateFacultyZodSchema),
    FacultyController.updateFaculty
);

router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
