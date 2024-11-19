/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with a hashed password
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: boolean
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Error creating user
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login to get a token
 *     description: Authenticate a user and retrieve a token
 *     parameters:
 *       - in: body
 *         name: credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successfully logged in, returns a token
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Error during login
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Retrieve the currently logged-in user's profile
 *     description: Get the details of the logged-in user based on the token
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       403:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Error retrieving user profile
 */

/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Update the currently logged-in user's details
 *     description: Update user details based on the provided token
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstname:
 *               type: string
 *             lastname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Error updating user
 */

/**
 * @swagger
 * /api/users/delete:
 *   delete:
 *     summary: Delete the currently logged-in user
 *     description: Remove the user from the database based on the token
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       403:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Error deleting user
 */
