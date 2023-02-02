const router = require('express').Router()

const { Router } = require('express');
const todoItemsModel = require('../models/todoItems');

// Create an Item
router.post('/api/items', async (req,res) => {
    try {
        const newItem = new todoItemsModel({
            item:req.body.item
        })
        // save this item
        const saveItem = await newItem.save()
        res.status(200).json(saveItem);
    } catch (err) {
        res.json(err)
    }
})


// Get all Items
router.get('/api/items', async (req,res)=> {
    try{
        const allTodoItems = await todoItemsModel.find({})
        res.status(200).json(allTodoItems)
    } catch(err) {
        res.json(err)
    }
})

// Update an item
router.put('/api/items/:id', async (req,res)=> {
    try{
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item Updated')
    } catch(err) {
        res.json(err)
    }
})

// Delete
router.delete('/api/items/:id', async (req,res)=> {
    try{
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted')
    } catch(err) {
        res.json(err)
    }
})


module.exports = router;