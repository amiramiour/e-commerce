/**
 * @swagger
 * tags:
 *   name: User
 *   description: CRUD to manage user
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - role
 *       properties:
 *         created:
 *           type: datetime
 *           description: Date of creation
 *         modified:
 *           type: datetime
 *           description: Date of update
 *         firstname:
 *           type: string
 *           description: User firstname
 *         lastname:
 *           type: string
 *           description: User lastname
 *         email:
 *           type: string
 *           description: User email / primary key
 *         password:
 *           type: string
 *           description: User password
 *         role:
 *           type: string
 *           description: To find out is it's an admin or a normal account
 */


/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Create a new user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Votre compte a bien été créé.
 *       401:
 *         description: Un compte est déjà lié à cet email.
 *       409:
 *         description: L'email n'a pas le bon format. 
 *
 *       500:
 *         description: Une erreur est survenue lors de la création de votre compte.
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Connect to an user account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Utilisateur connecté avec succès.
 *       401:
 *         description: Email ou mot de passe incorrect.
 *       404:
 *         description: Aucun compte ne correspond à cet email.
 *       500:
 *         description: Erreur lors du traitement des données.
 */