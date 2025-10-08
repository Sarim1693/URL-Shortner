const express=require('express');
const router=express.Router();
const db=require('./../db');
const shortid=require('shortid');

router.post('/short_url', async(req, res)=>{
    const {original_url}=req.body;
    if(!original_url) return res.status(400).json({error: 'URL is required to shorten'});

    const short_code=shortid.generate();
    const short_url=`https://localhost:5000/${short_code}`;

    try{
        const [result]=await db.query(
            "INSERT INTO urlshortner (original_url, short_code, short_url) VALUES (?,?,?)",
            [original_url, short_code, short_url]
        );
        res.status(200).json({short_url});
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server Error'});
    }
});

router.get('/:code', async(req, res)=>{
    const {code}=req.params;

    try{
        const [rows]= db.query(
            "SELECT original_url FROM urlshortner WHERE short_code=?"
            [code]
        );
        if(rows.length===0){
            return res.status(404).json({error: "URL Not Found"});
        }
        res.redirect(rows[0].original_url);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({err: "Internal Server Error"});
    }
});
module.exports=router