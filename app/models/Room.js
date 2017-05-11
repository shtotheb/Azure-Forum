var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
  username:   { type: String, index: true },
  message:    { type: String, index: true },
  imported:   { type: Date, default: Date.now, index: true}
})

var RoomSchema = mongoose.Schema({
  createdBy:  { type: String, index: true },
  roomName:   { type: String, index: true },
  chats:      [ChatSchema],
  imported:   {type: Date, default: Date.now, index: true},
  updated:    {type: Date, default: Date.now, index: true}
});

var Room = mongoose.model('Room',RoomSchema);
module.exports = Room;
