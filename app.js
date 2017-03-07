//　必要なモジュール読み込み
// expressモジュール読み込み
const express = require('express')(); 
// httpモジュール読み込み
// httpオブジェクト生成
const http = require('http').Server(express);
// socket.ioモジュール読み込み
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

//　名前を格納する変数

express.get(`/`, (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

express.get('/chat', (req, res) =>{
	res.sendFile(__dirname + '/chat.html');
});


http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (array) => {
    console.log('message: ' + array[0]);
    io.emit('chat message',  array);
  });
});