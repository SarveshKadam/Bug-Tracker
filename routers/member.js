const express = require('express')

const router = express.Router()
const Member = require('../models/member')


router.get('/',async (req,res)=>{
    const members = await Member.find({})
    res.render('members',{members})
})

router.get('/new',(req,res)=>{
  
    res.render('members/new',{member : new Member()})
})

router.post('/',async (req,res)=>{
    const member = new Member({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        mobilePhone : req.body.mobilePhone,
        workPhone : req.body.workPhone,
        location:req.body.location,
        position: req.body.position
    })
    try {
        const newMember = await member.save()
        res.redirect('/members')
    } catch {
        res.redirect('/')
    }
})

router.get('/:id',async (req,res)=>{
    try {
        const member = await Member.findById(req.params.id)
        res.render('members/edit',{member})
    } catch {
        res.redirect('/members')
    }
})

router.put('/:id',async (req,res)=>{
    let member
    try {
        member = await Member.findById(req.params.id)
        member.firstName = req.body.firstName,
        member.lastName = req.body.lastName,
        member.email = req.body.email,
        member.mobilePhone = req.body.mobilePhone,
        member.workPhone = req.body.workPhone,
        member.location=req.body.location,
        member.position= req.body.position
        await member.save()
        res.redirect(`/members/${member.id}`)
    } catch {
        res.redirect('/')
    }
})





module.exports = router
