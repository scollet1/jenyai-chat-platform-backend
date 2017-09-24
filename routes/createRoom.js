const config = require('../config');
const sockets = require('../websocket/sockets');

const createRoom = (req, res) => {
  console.info('route > create classroom');
  let id = req.body.id;
  if (id === undefined) {
    console.error('missing id parameter');
    return res.status(200).json({ success: false });
  }

  let password = req.body.password;
  if (password === undefined) {
    console.error('missing password parameter');
    return res.status(200).json({ success: false });
  }

  if (id.length !== config.roomIdLength) {
    console.error(`classroom id ${id} has not the right size`);
    return res.status(200).json({ success: false });
  }

  if (password.length !== config.passwordLength) {
    console.error(`classroom password ${password} has not the right size`);
    return res.status(200).json({ success: false });
  }

  if (sockets[id] !== undefined) {
    console.warn('classroom already exists');
    return res.status(200).json({ success: false });
  }

  sockets[id] = {
    password,
    student: { },
    teacher: { }
  }
  console.info(`classroom ${id} successfully created`);
  return res.status(200).json({ success: true });
};

module.exports = createRoom;
