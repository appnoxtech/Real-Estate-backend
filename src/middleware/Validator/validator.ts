import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { logger } from "../../utils/logger";
import { RESPONSE_STATUS } from '../../utils/constants';

export class Validator {
    rules: any;
    constructor(rules: any) {
        this.rules = rules;
    }

    makeValidation(key: string): any {
        try {
            if (!key) {
                throw new Error(`Invalid validator key '${key}' supplied.`);
            }

            this.rules[key];

            return [
                ...this.rules[key],
                (req: Request, res: Response, next: NextFunction) => {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        const errorResponse = {
                            error: {
                                errType: "ValidationError",
                                message: "Validation errors occurred.",
                                errors: errors.mapped()
                            }
                        };
                        return res.status(RESPONSE_STATUS.BAD_REQUEST).json(errorResponse);
                    }
                    next();
                }
            ];
        } catch (err) {
            logger.error(err);
        }
    }
}
