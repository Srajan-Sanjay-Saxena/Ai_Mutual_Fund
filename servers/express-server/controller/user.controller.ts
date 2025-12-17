import { BadRequest } from 'controller/error/error.badRequest.controller.js';
import { OkResponseStrategy } from 'controller/response/response.ok.controller.js';
import { NextFunction, Request, Response } from 'express';
import { catchAsync } from 'utils/catchAsyncFunc.js';

const userAuthController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, id } = req.body;

    if (!email || !id) {
      return next(
        new BadRequest().handleResponse(res, {
          info: 'Email and ID are required',
        })
      );
    }

    const [firstName, lastName] = name ? name.split(' ') : ['', ''];

    // const user = await prisma.user.upsert({
    //   where: { email },
    //   update: {},
    //   create: {
    //     id,
    //     email,
    //     firstName: firstName || '',
    //     lastName: lastName || null,
    //   },
    // });

    new OkResponseStrategy().handleResponse(res, {
      // ...user,
      status: 'success',
      message: 'User authenticated successfully',
    });
  }
);


export { userAuthController };