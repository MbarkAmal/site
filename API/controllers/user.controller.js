const user = require ('../models/User');


exports.getAllUser = (req, res)=> {
    user.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error("Error fetching users", error);
            res.status(500).json({message: "Internal server error"})
        });
}

//delete user
exports.delete = async (req , res)=>{
    try {
        const id = req.params.id;
        const result = await user.findByIdAndDelete({_id: id});
        res.status(200).json({ message: "User deleted successfully", result });
    } catch (error) {
        console.error("Error deleting User:", error);
        res.status(500).json({ message: "Internal server error" });
   
    }
};