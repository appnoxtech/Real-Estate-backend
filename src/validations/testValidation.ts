import { body } from 'express-validator';
import { resultChecker } from './validationResult.js';

//#region Test Fields
const testFields = [[body('name', 'Name Is Required: ').not().isEmpty()]];

//#endregion

export const addTeacherValidation = [testFields, resultChecker];
