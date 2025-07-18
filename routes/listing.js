const express = require("express");
const router = express.Router();
const Listing = require ("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const listingController = require("../controllers/listings.js")

const multer = require('multer')                //we required this for parsing and saving our image files
const {storage} = require("../cloudConfig.js")
const upload = multer({storage})

//Index Route //Create route
router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"), 
    validateListing,
    wrapAsync(listingController.createListing)
  );


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route //Update route
//delete route
router.route("/:id")
.get( wrapAsync (listingController.showListing))
.put(
  isLoggedIn, 
  isOwner,
  upload.single("listing[image]"),
  validateListing, 
  wrapAsync (listingController.updateListing)
)
.delete(isLoggedIn,isOwner, wrapAsync (listingController.deleteListing));

//edit route
router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync (listingController.editListing))

module.exports = router;





