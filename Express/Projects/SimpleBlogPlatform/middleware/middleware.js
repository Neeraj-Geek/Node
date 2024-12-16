import { body, validationResult } from "express-validator";
const validateUser = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

export default validateUser;
