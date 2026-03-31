const utilities = require(".");
const { body, validationResult } = require("express-validator");
const accountModel = require("../models/account-model");

const validate = {};

validate.addClassificationRules = () => {
    return [
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isAlphanumeric()
            .isLength({ min: 1 })
            .withMessage("Please provide a valid classification name."),
    ]
}

validate.addInventoryRules = () => {
    return [
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Make value is missing")
            .isLength({ min: 1 })
            .withMessage("Please provide a make."), // on error this message is sent.

        body("inv_model")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a model."),

        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Year value missing.")
            .isNumeric()
            .withMessage("Year must be a number."),

        body("inv_description")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a description."),

        body("inv_image")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide an image."),

        body("inv_thumbnail")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a thumbnail."),

        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Price value is missing.")
            .isNumeric()
            .withMessage("Price must be a number."),

        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .withMessage("Miles value is missing.")
            .isNumeric()
            .withMessage("Miles must be a number."),

        body("inv_color")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide a color."),

        body("classification_id")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .isInt()
            .withMessage("Please provide a make."),
    ]
}

validate.checkAddClassificationData = async (req, res, next) => {
    const { classification_name } = req.body;
    let errors = [];
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav();
        res.status(400).render("inventory/add-classification", {
            title: "Add Classification",
            nav,
            errors,
            classification_name,
        });
    } else {
        next();
    }
}

 validate.checkAddInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_price, inv_miles, classification_id, inv_color, inv_image, inv_thumbnail } = req.body;
    let errors = [];
    errors = validationResult(req);

    if (!errors.isEmpty()) {
       let nav = await utilities.getNav();
        const classificationSelect = await utilities.buildClassificationList(classification_id);
        res.status(400).render("inventory/add-inventory", {
            title: "Add Inventory",
            nav,
            errors,
            classificationSelect,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_price,
            inv_miles,
            classification_id,
            inv_color,

            inv_image,
            inv_thumbnail,

        });
    } else {
        next();
    }
}


module.exports = validate;
