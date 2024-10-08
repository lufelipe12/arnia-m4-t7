import { RoleEnum } from '../../users/enums/role.enum';

export class CurrentUserDto {
  userId: number;
  userEmail: string;
  userRole: RoleEnum;
  iss: string;
  aud: string;
  sub: string;
}
