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

//update user 
exports.updateUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const updateData = {
            username,
            email,
            password,
            role,
        };

        // Check if the role is being updated to "admin"
        if (role && role.toLowerCase() === "admin") {
            updateData.isAdmin = true; // Set isAdmin to true
        } else {
            updateData.isAdmin = false; // Set isAdmin to false for other roles
        }

        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error while updating user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

  // get one user 

  exports.getoneuser = async (req , res) =>{

    try {
        const result = await user.findOne({_id : req.params.id});

        res.status(200).json({ result });
    }catch(error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};