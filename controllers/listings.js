const Listing = require ("../models/listing.js");
module.exports.index = async (req,res) =>{
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", {allListings})
};

module.exports.renderNewForm = async (req, res) => {
    
    res.render("listings/new.ejs")
}

module.exports.showListing =async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
    populate:{
        path: "author",
    },
})
.populate("owner");
    if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.createListing =async(req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,"..",filename);
    
    // console.log("Received Form Data:", req.body);  // Log the form data

    // try {
    //     let listingData = req.body.listing;
    //     if (!listingData) {
    //         return res.status(400).send("Invalid form submission");
    //     }

    //     let newListing = new Listing(listingData);
    //     await newListing.save();

    //     console.log("Listing Saved to DB:", newListing);
    //     res.redirect("/listings");  
    // } catch (err) {
    //     console.error("Error saving listing:", err);
    //     res.status(500).send("Error saving listing");
    // }

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    if (req.file) {
        newListing.image = {url,filename};
    }
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}

module.exports.editListing =async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", {listing, originalImageUrl});

}

module.exports.updateListing =async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url,filename};
        await listing.save();
}

    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing =async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}