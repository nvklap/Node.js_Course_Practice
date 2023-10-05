import { Router, Request, Response, NextFunction } from 'express';

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
 *              type: object
 *              properties:
 *                status:
 *                  type: boolean
 *                  description: Shows whether server is running or not
 *                  example: true
 *       500:
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: Internal Server Error
 */

router.get(
	'/',
	(req: Request, res: Response, next: NextFunction): Response =>
		res.json({ isRunning: true })
);

export default router;
