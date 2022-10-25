import { NextFunction, Request, Response, Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.utils';

const router = Router();

router.get('/health-check', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Successfully connected to API.',
  });
});

router.get(
  '/test',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    JSON.parse('A string');

    res.status(200).json({
      response: 'successful',
      data: {
        something: 2,
      },
    });
  })
);

export default router;
