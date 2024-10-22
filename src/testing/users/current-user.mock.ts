import { RoleEnum } from '../../users/enums/role.enum';

export const currentUserMock = {
  userId: 2,
  userEmail: 'lf@gmail.com',
  userRole: RoleEnum.admin,
  iss: 'user-auth',
  aud: 'arnia-cars-users',
  sub: 'user-login',
};
