/**
 * @swagger
 * components:
 *   schemas:
 *     Color:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID unique de la couleur
 *         name:
 *           type: string
 *           description: Nom de la couleur
 *       example:
 *         name: "Rouge"
 */

/**
 * @swagger
 * /api/colors:
 *   get:
 *     summary: Récupère toutes les couleurs
 *     tags: [Colors]
 *     responses:
 *       200:
 *         description: Liste de toutes les couleurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Color'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/colors:
 *   post:
 *     summary: Crée une nouvelle couleur
 *     tags: [Colors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Color'
 *     responses:
 *       201:
 *         description: Couleur créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Color'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/colors/{id}:
 *   put:
 *     summary: Met à jour une couleur existante
 *     tags: [Colors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la couleur à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Color'
 *     responses:
 *       200:
 *         description: Couleur mise à jour avec succès
 *       404:
 *         description: Couleur non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/colors/{id}:
 *   delete:
 *     summary: Supprime une couleur
 *     tags: [Colors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la couleur à supprimer
 *     responses:
 *       200:
 *         description: Couleur supprimée avec succès
 *       404:
 *         description: Couleur non trouvée
 *       500:
 *         description: Erreur serveur
 */