/**
 * @swagger
 * tags:
 *   name: Checkout
 *   description: Operations de paiement avec Stripe
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom du produit
 *         description:
 *           type: string
 *           description: La description du produit
 *         price:
 *           type: number
 *           description: Le prix du produit en euros
 *           minimum: 0.01
 *         quantity:
 *           type: integer
 *           description: La quantité du produit
 *           minimum: 1
 */

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Créer une session de paiement
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Session de paiement créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: L'url de la session de paiement
 *       401:
 *         description: Produits vide ou Prix ou quantité inférieur à 0
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Products array cannot be empty"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Une erreur est survenue"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */