import { Router } from "express";

const chatRouter = Router();

chatRouter.get("/",(req,res)=>{
    res.render("chat", {title: 'Chat'})
})

export default chatRouter;