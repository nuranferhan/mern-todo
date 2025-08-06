const router = require("express").Router();
const User = require("../models/user"); 
const List = require("../models/list");

//create
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        
        if (existingUser) {
            const maxOrderTask = await List.findOne({ user: existingUser._id }).sort({ order: -1 });
            const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;
            
            const list = new List({ 
                title, 
                body, 
                user: existingUser._id,
                order: newOrder,
                isCompleted: false
            }); 
            await list.save();
            
            existingUser.list.push(list._id);
            await existingUser.save();
            
            res.status(200).json({ list });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//update 
router.put("/updateTask/:id", async (req, res) => {
    try {
       const { title, body} = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, { title, body }); 
        list.save().then(() => res.status(200).json({ message: "Task Updated"}));    
 
    }
        catch (error) { 
            console.log(error);
}
});

router.put("/toggleComplete/:id", async (req, res) => {
    try {
        const { isCompleted } = req.body;
        const list = await List.findByIdAndUpdate(
            req.params.id, 
            { isCompleted }, 
            { new: true }
        );
        
        if (list) {
            res.status(200).json({ message: "Task completion status updated", list });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/updateOrder", async (req, res) => {
    try {
        const { tasks } = req.body; 
        
        const updatePromises = tasks.map(task => 
            List.findByIdAndUpdate(task.id, { order: task.order })
        );
        
        await Promise.all(updatePromises);
        res.status(200).json({ message: "Task order updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id,
            { $pull: { list: req.params.id }}); 
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).then(() => 
                res.status(200).json({ message: "Task Deleted"}));
} 
    }
        catch (error) { 
            console.log(error);
}
});

//getTask
router.get("/getTasks/:id", async (req, res) => { 
    const list = await List.find({ user: req.params.id }).sort({ order: 1 }); 
    if(list.length != 0){
        res.status(200).json({ list: list });
    }
    else {
        res.status(200).json({ message: "No Tasks" });
    }
});

module.exports = router;