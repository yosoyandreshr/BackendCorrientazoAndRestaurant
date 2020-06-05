const UsersManager = module.exports;
const MsUser_Resource = require('../resources/MsUser_Resource');
const Token = require('../utils/Token');

UsersManager.login = async (body, logger) => {
  const user = await MsUser_Resource.login(body, logger);
  if (user) {
    const Users = await MsUser_Resource.getUserbyauthId(user.authId, logger);
    
    const  token= Token.create({  authid: Users.authId ,Id:Users.userId,name:Users.userName,identification:Users.userIdentification,
      phone:Users.userPhone })

    return { authid:user.authId, email:user.authEmail,Id:Users.userId,name:Users.userName,identification:Users.userIdentification,phone:Users.userPhone,token
     };
  }
  return null;
};
