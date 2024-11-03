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
 *         quantity:
 *           type: integer
 *           description: La quantité du produit
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
 *                   description: L'ID de la session de paiement
 *                   example: "cs_test_a1b2c3d4e5f6g7h8i9j0"
 *       403:
 *         description: Accès interdit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur
 *                   example: "Accès interdit: token manquant ou invalide"
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