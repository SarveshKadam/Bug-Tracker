const express = require('express')

const router = express.Router()
const Defect = require('../models/defect')
const Member = require('../models/member')

router.get('/',async (req,res)=>{
    try {
        const defects = await Defect.find({}).populate('member').exec()
        res.render('defects',{defects})
    } catch (error) {
        res.redirect('/')
    }
    
})

router.get('/new',async(req,res)=>{
    try {
        const defect = new Defect()
        const members = await Member.find({})
        res.render('defects/new',{
            defect,
            members
        })
        
    } catch {
        res.redirect('/defects')
    }
})

router.post('/',async (req,res)=>{
    const defect = new Defect({
        member : req.body.member,
        priority : req.body.priority,
        createdOn : req.body.createdOn,
        state : req.body.state,
        points : req.body.points,
        environment:req.body.environment,
        product: req.body.product,
        shortDescription: req.body.shortDescription,
        description: req.body.description
    })
    try {
        console.log(req.body);
        const newDefect = await defect.save()
        res.redirect('/defects')
    } catch(e) {
        console.log(e);
        res.redirect('/')
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const members = await Member.find({})
        const defect = await Defect.findById(req.params.id)
        res.render('defects/edit',{defect, members})
    } catch {
        res.redirect('/defects')
    }
})

router.put('/:id',async (req,res)=>{
    let defect
    try {
        defect = await Defect.findById(req.params.id)
        defect.member = req.body.member,
        defect.priority = req.body.priority,
        defect.createdOn = req.body.createdOn,
        defect.state = req.body.state,
        defect.points = req.body.points,
        defect.environment=req.body.environment,
        defect.product= req.body.product,
        defect.shortDescription= req.body.shortDescription,
        defect.description= req.body.description
        await defect.save()
        res.redirect(`/defects/${defect.id}`)
    } catch(e) {
        console.log(e);
        res.redirect('/')
    }
})


module.exports = router