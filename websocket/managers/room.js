'use strict';
const roomsCtrl = require('../../database/controllers/rooms');

/*  Returns the number of connected teachers in a room.

    PARAMS
      sockets (object)
      roomId (string): id of the room

    RETURN
      (number): the number of connected teachers in the room
*/
const countTeachers = (sockets, roomId) => {
  return Object.keys(sockets[roomId]['teacher']).length;
};

/*  Creates a new room in the sockets object.

    PARAMS
      sockets (object)
      name (string): name of the room
      password (string): password of the room

    RETURN
      none
*/
const createIfDoesntExistInRAM = (sockets, name) => {
  if (!sockets[name]) {
    sockets[name] = {
      student: { },
      teacher: { }
    }
  }
};

/*  Deletes a room from the RAM.

    PARAMS
      sockets (object)
      roomId (string): name of the room

    RETURN
      none
*/
const deleteFromRAM = (sockets, roomId) => {
  if (!sockets[roomId]) {
    return;
  }

  Object.keys(sockets[roomId]['teacher']).forEach(id => {
    sockets[roomId]['teacher'][id].socket.emit('disconnect', {});
  });

  Object.keys(sockets[roomId]['student']).forEach(id => {
    sockets[roomId]['student'][id].socket.emit('disconnect', {});
  });

  delete sockets[roomId];
};

/*  Retrieves a room from the database.

    PARAMS
      name (string): name of the room
      callback (function): called once the room is retrieved. Can take 1 argument:
        room (object): room retrieved from the database. Null if not found

    RETURN
      none
*/
const doesExistInDb = (name, callback) => {
  roomsCtrl.find(name, room => {
    callback(room);
  });
};

module.exports = {
  countTeachers,
  createIfDoesntExistInRAM,
  deleteFromRAM,
  doesExistInDb
};