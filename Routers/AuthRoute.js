import express from "express";
import {
    deleteBook,
    getAllUsers,
    signUp,
    editProfile,
    login,
    createCategory,
    getcategory,
    addBook,
    getbook,
    getBookByid,
    getsubscription,
    createSubscriptionByAdmin,
    getAllUsersWithPromo,
    cancelSubscription,
    changePassword,
    getBookByCategoryId,
    updateProgress,
    getUserProgress,
    getAllUserProgress,
    updateTestScore,
    getReferralStats,
    createpromocode,
    getquestionanswerbyid,
    submittest,
    getbyidtest,
    GetCompletedBooks,
    editBook,
    userbyid,
    startChallenge,
    submitChallengeTest,
    getUserChallengeProgress,
    gatallUserChallengeProgreses,
    promocodeDiscount,
    getPromocodeDiscount,
    UserDelete,
    getPromoCodeUsage,
    getPromocodeRefer,
    getsubscriptionByid,
    SubscriptionDelete,
    getCommissionDiscount,
    GetCompletedBooksByUserId,
    getPromocodeReferById,
    getReviewsByBookId,
    submitReview,
    updateReview,
    deleteReview,
    getReviews,
    updateReviewStatus,
    getReviewsApproved,
    saveOrUpdateAudioProgress,
    getAudioProgress,
    logout,
    saveUserVisited,
    updateVisitedUsersStatus,
    upgradeUserSubscription,
    updateUserSubscription,
    checkBookAttempt,
    getUserById,
    updateUser,
     createVilla,
  getVillas,
  getVillaById,
  updateVilla,
  deleteVilla,
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    getVillasByOwnerId,
    getBookingsByOwner

} from "../Controllers/AuthCtrl.js";


const router = express.Router();
router.get("/users", getAllUsers);
router.delete("/users/:id", UserDelete);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);


// Create
router.post("/Villa", createVilla);
// Read All
router.get("/Villa", getVillas);
// Read One
router.get("/Villa/:id", getVillaById);
// Update
router.put("/Villa/:id", updateVilla);
// Delete
router.delete("/Villa/:id", deleteVilla);
router.get("/Villa/owner/:owner_id", getVillasByOwnerId);


router.post("/Book", createBooking);        // Create
router.get("/Book", getBookings);           // Read all
router.get("/Book:id", getBookingById);     // Read one
router.put("/Book:id", updateBooking);      // Update
router.delete("/Book:id", deleteBooking);   // Delete

router.get("/Book/owner/:owner_id", getBookingsByOwner);











router.get("/getPromoCodeUsage", getPromoCodeUsage);
// router.post("/auth/signup", signUp);


router.post("/auth/signup",  signUp);



router.put("/user/edit/:id", editProfile);
router.post("/auth/login", login);
router.post("/category", createCategory);
router.get("/getcategory", getcategory);
router.get("/getsubscription", getsubscription);
router.post("/book", addBook);
router.get("/book", getbook);
router.get("/book/:id", getBookByid);
router.delete("/book/:id", deleteBook);
router.put("/book/:id", editBook);
router.get("/getAllUsersWithPromo", getAllUsersWithPromo);
router.post("/createSubscriptionByAdmin", createSubscriptionByAdmin);
router.put("/cancelSubscription/:user_id", cancelSubscription);
router.post("/updateProgress", updateProgress);
router.get("/getUserProgress/:user_id", getUserProgress);
router.get("/getBookByCategoryId/:id", getBookByCategoryId);
router.get("/getAllUserProgress", getAllUserProgress);
router.post("/changepassword", changePassword);
router.post("/updateTestScore", updateTestScore);

router.get("/getReferralStats", getReferralStats);
router.post("/createpromocode", createpromocode);
router.get("/getquestionanswerbyid/:id", getquestionanswerbyid);
router.get("/getbyidtest/:id", getbyidtest);
router.post("/submittest", submittest);
router.get("/GetCompletedBooks", GetCompletedBooks);
router.get("/GetCompletedBooks/:id", GetCompletedBooksByUserId);
router.get("/user/:id", userbyid);
router.post("/startChallenge", startChallenge);
router.post("/submitChallengeTest", submitChallengeTest);
router.get("/check", checkBookAttempt);
router.get("/getUserChallengeProgress/:user_id", getUserChallengeProgress);
router.get("/gatallUserChallengeProgreses", gatallUserChallengeProgreses);
router.post("/promocodeDiscount", promocodeDiscount);
router.get("/getPromocodeDiscount", getPromocodeDiscount);
router.get("/getPromocodeRefer", getPromocodeRefer);
router.get("/getPromocodeReferById/:id", getPromocodeReferById);
router.get("/getsubscriptionByid/:id", getsubscriptionByid);
router.get("/getCommissionDiscount", getCommissionDiscount);
router.delete("/SubscriptionDelete/:id", SubscriptionDelete);
router.get("/reviews/:bookId", getReviewsByBookId);
router.post("/reviews", submitReview);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);
router.get("/getReviews", getReviews);
router.get("/getReviewsApproved", getReviewsApproved);
router.put("/reviews/status/:id", updateReviewStatus);
router.post("/adioprogress", saveOrUpdateAudioProgress);
router.get("/getAudioProgress", getAudioProgress);
router.post("/logout", logout);
router.post("/saveUserVisited", saveUserVisited);
// router.get("/GetUserVisited", GetUserVisited);



router.get('/updateVisitedUsersStatus', updateVisitedUsersStatus);
// router.post('/updateUserSubscriptionPlan', updateUserSubscriptionPlan);
router.put("/upgradesubscription", upgradeUserSubscription);

router.put("/updateUserSubscription/:userId", updateUserSubscription);



export default router;
