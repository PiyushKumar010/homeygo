const express=require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");



router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);
  
  //Show Route
  router.get("/:id", wrapAsync(listingController.showListing));

  
  //Create Route
  router.post(
    "/",
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );
  
  
  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner,listingController.renderEditForm);
  
  //Update Route
  router.put("/:id",isLoggedIn,isOwner,
    upload.single("listing[image]"),
    validateListing,
     listingController.updateListing);
  
  //Delete Route
  router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing) );


  module.exports=router;