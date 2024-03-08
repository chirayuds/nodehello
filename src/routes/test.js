import express from 'express';
const router = express.Router();
import { authenticateToken } from '../helpers/jwt.js';
import * as test from '../api/test/test.js';

/* -----------------------------------Test Routes -----------------------------------------*/
router.get('/test', test.test);
/* -----------------------------------Test Routes -----------------------------------------*/

export default router;