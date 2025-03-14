export const getProfile = async (req, res) => {
    try {
      const user = await user.findById(req.user.id).select("-password"); // Exclude password field
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  