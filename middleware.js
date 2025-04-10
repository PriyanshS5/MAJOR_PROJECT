const Listing = require("./models/listing");
const Review = require("./models/review");
const expressError = require("./utils/expressError.js");
const {listingSchema, reviewSchema } = require("./schema.js");  //sbme 2 dots kuki bahr main folder m jake fir dusre folder m jana h

module.exports.isLoggedIn = (req, res, next) =>{
   console.log(req.path, "..", req.originalUrl );
     if(!req.isAuthenticated()) {
      //redirectUrl save
      req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
     }
     next();
}
module.exports.saveRedirectUrl = (req, res, next) =>{
   if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl;
   }
   next();
}

module.exports.isOwner = async (req, res, next) => {
   let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "you don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res, next) => {
   let {error} = listingSchema.validate(req.body);
   if (error){
       let errMsg = error.details.map((el) => el.message).join(",");
       throw new expressError(400, errMsg);
   }
   else{
       next();
   }
};
module.exports.validateReview = (req,res, next) => {
   let {error} = reviewSchema.validate(req.body);
   if (error){
       let errMsg = error.details.map((el) => el.message).join(",");
       throw new expressError(400, errMsg);
   }
   else{
       next();
   }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId} = req.params;
     let listing = await Review.findById(reviewId);
     if(!review.author._id.equals(res.locals.currUser._id)){
         req.flash("error", "It is'nt your review.");
         return res.redirect(`/listings/${id}`);
     }
     next();
 }