import { UsersDto } from '../dto/users.model';
import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

/**
 * NEVER USER THIS CLASS IN REAL LIFE.
 * This class for demo ONLY.
 * Consider using ODM/ORM to manage DB in better way.
 */
class UsersDao {
  private static instance: UsersDao;
  users: Array<UsersDto> = []

  constructor() {
    log('Created new instance of UsersDao');
  }

  static getInstance(): UsersDao {
    if (!UsersDao.instance) {
      UsersDao.instance = new UsersDao();
    }

    return UsersDao.instance;
  }

  async addUser(user: UsersDto) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
  }

  async getUsers() {
    return this.users;
  }

  async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
  }

  async putUserById(user: UsersDto) {
    const userIdx = this.users.findIndex((obj: { id: string }) => obj.id === user.id);
    this.users.splice(userIdx, 1, user);
    return `${user.id} updated via PUT.`;
  }

  async patchUserById(user: UsersDto) {
    const userIdx = this.users.findIndex((obj: { id: string }) => obj.id === user.id);
    let currentUser = this.users[userIdx];
    const allowPatchFields = ['password', 'firstName', 'lastName', 'permissionLevel'];
    for (const field of allowPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field];
      }
    }
    this.users.splice(userIdx, 1, currentUser);
    return `${user.id} patched.`;
  }

  async removeUserById(userId: string) {
    const userIdx = this.users.findIndex((obj: { id: string }) => obj.id === userId);
    this.users.splice(userIdx, 1);
    return `${userId} removed.`;
  }

  async getUserByEmail(email: string) {
    const userIndex = this.users.findIndex((obj: { email: string }) => obj.email === email);
    let currentUser = this.users[userIndex];
    return currentUser ? currentUser : null;
  }
}

export default UsersDao.getInstance();

