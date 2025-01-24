import express from 'express'
import { Url } from '../model/url.model.js'

const router = express.Router()

router.route('/').get(async(req, res)=>{
    const allUrls = await Url.find({})
    return res.render('home',{urls: allUrls})
})

export default router