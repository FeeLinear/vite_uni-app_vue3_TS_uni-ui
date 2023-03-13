import type * as UserModel from './user.model'
import prerequest from '@/utils/request'

class UserService {
  // 获取列表
  static getList(params: UserModel.GetUserListParm) {
    return prerequest.post<UserModel.GetUserListResp>(
      '/list',
      { params },
    )
  }
}

export default UserService