import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersMiddleware from './middleware/users.middleware';
import UsersController from './controllers/users.controller';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.route('/users')
      .get(UsersController.listUsers)
      .post(
        UsersMiddleware.validateRequiredUserBodyFields,
        UsersMiddleware.validateExistedEmail,
        UsersController.createUser,
      );

    this.app.param('userId', UsersMiddleware.extractUserId);
    this.app.route('/users/:userId')
      .all(UsersMiddleware.validateUserExists)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app.put('/users/:userId', [
      UsersMiddleware.validateRequiredUserBodyFields,
      UsersMiddleware.validateEmailBelongSameUser,
      UsersController.put,
    ]);

    this.app.patch('/users/:userId', [
      UsersMiddleware.validatePatchEmail,
      UsersController.patch,
    ]);

    return this.app;
  }
}
