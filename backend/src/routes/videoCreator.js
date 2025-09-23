const express = require('express');
const adminMiddleware = require('../middleware/adminMiddleware');
const videoRouter =  express.Router();
const {generateUploadSignature,saveVideoMetadata,deleteVideo} = require("../controllers/videoSection")

videoRouter.get("/create/:problemId", (req, res, next) => {
  console.log('Video create route hit for problemId:', req.params.problemId);
  next();
}, adminMiddleware, generateUploadSignature);
videoRouter.post("/save",adminMiddleware,saveVideoMetadata);
videoRouter.delete("/delete/:problemId",adminMiddleware,deleteVideo);


module.exports = videoRouter;