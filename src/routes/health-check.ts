import { Router, Request, Response } from 'express';

const router: Router = Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     tags:
 *       - Health Check
 *     summary: Check server's health
 *     description: Returns server's health status in JSON format
 *     responses:
 *       200:
 *        description: Ok, the server is running
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/HealthCheck'
 *       500:
 *         $ref: '#/components/responses/500'
 */

router.get(
	'/',
	(req: Request, res: Response): Response => res.json({ isRunning: true })
);

export default router;
