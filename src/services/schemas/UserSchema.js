export default class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      email: 'string',
      token: 'string',
    },
  };
}
