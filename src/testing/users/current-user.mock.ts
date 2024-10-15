import { RoleEnum } from '../../users/enums/role.enum';

export const currentUserMock = {
  userId: 1,
  userEmail: 'lf@gmail.com',
  userRole: RoleEnum.admin,
  iss: 'user-auth',
  aud: 'arnia-cars-users',
  sub: 'user-login',
};
