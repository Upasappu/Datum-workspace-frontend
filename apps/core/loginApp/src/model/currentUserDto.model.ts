import { LoginUserDto,MenuItemDto,UserSettingDto } from "@datum/models";


export interface CurrentUserDto {
  
  token: string;
  users: LoginUserDto;
  settings: string; // JSON string, will be parsed separately

  userPageListView: MenuItemDto[];

}

