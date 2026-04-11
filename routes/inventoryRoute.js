// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");
const invValidate = require("../utilities/inventory-validation");



router.use(["/add-classification", "/add-inventory", "/edit/:inventoryId", "/update", "/delete/:inventoryId", "/delete/",], utilities.checkAuthorizationManager);




router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));



router.get("/edit/:inventoryId", utilities.handleErrors(invController.editInventoryView));
router.post("/update/", invValidate.addInventoryRules(), invValidate.checkUpdateData, utilities.handleErrors(invController.updateInventory));


router.get("/delete/:inventoryId", utilities.handleErrors(invController.buildDeleteInventory));
router.post("/delete/", utilities.handleErrors(invController.deleteInventory));

router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))


router.get("/", utilities.checkAuthorizationManager, utilities.handleErrors(invController.buildManagementView));
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));
router.post("/add-classification", invValidate.addClassificationRules(), invValidate.checkAddClassificationData, utilities.handleErrors(invController.addClassification));
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));
router.post("/add-inventory", invValidate.addInventoryRules(), invValidate.checkAddInventoryData, utilities.handleErrors(invController.addInventory));

module.exports = router;
