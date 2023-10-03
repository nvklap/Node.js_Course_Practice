const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
	res.json({ isRunning: true });
});

module.exports = router;
