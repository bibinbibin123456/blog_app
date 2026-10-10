
const apiRouter = require("express").Router();

// User controller
const {
    register,
    login,
} = require("../../controllers/userController");

// Admin controller
const {
    login: adminLogin,
} = require("../../controllers/adminController");

// Blog controller
const {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
} = require("../../controllers/blogController");

// Middleware
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

// ==============================
// Public routes
// ==============================

// User registration
apiRouter.post("/user/register", register);

// User login
apiRouter.post("/user/login", login);

// Admin login
apiRouter.post("/admin/login", adminLogin);

// Get all blogs
apiRouter.get("/blogs", getBlogs);

apiRouter.get("/blogs/:id", getBlogById);



// Create a blog
apiRouter.post(
    "/blogs",
    authMiddleware,
    adminMiddleware,
    createBlog
);

// Update a blog
apiRouter.put(
    "/blogs/:id",
    authMiddleware,
    adminMiddleware,
    updateBlog
);

// Delete a blog
apiRouter.delete(
    "/blogs/:id",
    authMiddleware,
    adminMiddleware,
    deleteBlog
);

module.exports = apiRouter;