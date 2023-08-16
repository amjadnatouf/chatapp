const users = [];

const userConnect = (user) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const userDisconnect = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) return;

  return users.splice(index, 1)[0];
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUsers = () => {
  return users;
};

module.exports = {
  userConnect,
  userDisconnect,
  getUsers,
  getUser,
};
