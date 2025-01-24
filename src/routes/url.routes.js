import { handleGenerateShortUrl, handleAnalytics } from "../controller/url.controller.js";
import express from "express"
import { Router } from "express";

const router = Router()

router.route('/short').post(handleGenerateShortUrl)

router.route('/analytics:shortId').get(handleAnalytics)

export default router  

