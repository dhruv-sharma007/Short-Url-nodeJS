import { nanoid } from "nanoid";
import { Url } from "../model/url.model.js";
import { render } from "ejs";

const handleGenerateShortUrl =  (async(req, res)=>{
   try {
     const shortID = nanoid(5)
     const body = req.body
     if (!body){
         res.status(400).json({error:"Url is required"})
     }
    const result = await Url.create({
         shortId: shortID,
         redirectUrl: body.url,
         visitHistory: [],
     })
 
     return res.status(201).render("home",{Id: shortID})
   } catch (error) {
        console.log("Error Summoned", error)
   }
})

const handleAnalytics = (async(req, res)=>{
    const shortId = req.params.shortId
    const result = await Url.findOne({ shortId })

    res.status(200).json({ TotalClicks: result.visitHistory.length })

})

export{
    handleGenerateShortUrl,
    handleAnalytics
}
