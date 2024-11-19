/**
 * @swagger
 * components:
 *   schemas:
 *     Size:
 *       type: object
 *       required:
 *         - size
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID unique de la taille
 *         size:
 *           type: string
 *           description: Description de la taille 
 *       example:
 *         id: 1
 *         size: "M"
 */

/**
 * @swagger
 * /api/sizes:
 *   get:
 *     summary: Récupère toutes les tailles
 *     tags: [Sizes]
 *     responses:
 *       200:
 *         description: Liste de toutes les tailles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Size'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/sizes:
 *   post:
 *     summary: Crée une nouvelle taille
 *     tags: [Sizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Size'
 *     responses:
 *       201:
 *         description: Taille créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Size'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/sizes/{id}:
 *   put:
 *     summary: Met à jour une taille existante
 *     tags: [Sizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la taille à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Size'
 *     responses:
 *       200:
 *         description: Taille mise à jour avec succès
 *       404:
 *         description: Taille non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/sizes/{id}:
 *   delete:
 *     summary: Supprime une taille
 *     tags: [Sizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la taille à supprimer
 *     responses:
 *       200:
 *         description: Taille supprimée avec succès
 *       404:
 *         description: Taille non trouvée
 *       500:
 *         description: Erreur serveur
 */
