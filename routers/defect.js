const express = require('express')

const router = express.Router()
const Defect = require('../models/defect')
router.get('/',(req,res)=>{
    res.render('defects')
})

router.get('/new',(req,res)=>{
    res.render('defects/new',{defect : new Defect()})
})

router.post('/',async (req,res)=>{
    const defect = new Defect({
        reportedBy : req.body.reportedBy,
        priority : req.body.priority,
        assignedTo : req.body.assignedTo,
        state : req.body.state,
        points : req.body.points,
        environment:req.body.environment,
        product: req.body.product,
        shortDescription: req.body.shortDescription,
        description: req.body.description
    })
    try {
        const newDefect = await defect.save()
        res.redirect('/defects')
    } catch {
        res.redirect('/')
    }
})

module.exports = router