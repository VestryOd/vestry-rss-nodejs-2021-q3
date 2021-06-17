import IUser, { userCreatePayload, UserResponse } from '../resources/users/model';

class CustomError extends Error {
  status: number;

  message: string;

  constructor({ status, message }: { status: number; message: string }) {
    super();
    this.status = status;
    this.message = message;
  }
}

const unionTwoObjects = (source: IUser, target: userCreatePayload): UserResponse => ({
  ...source,
  ...target,
});
// const result = { ...source };
// if (typeof target === 'object' && Object.keys(target)?.length) {
//   Object.keys(target).forEach((el) => {
//     const key = el[0];
//     if (key) {
//       result[key] = target[key];
//     }
//   });
// }
// return result;

export { CustomError, unionTwoObjects };
