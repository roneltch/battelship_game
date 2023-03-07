const express = require('express'); //Import the express dependency
const port = 1234;                  //Save the port number where your server will be listening
const app = express();//Instantiate an express app, the main work horse of this server

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

const router = express.Router();
var times=0;
router.get('/',function(req,res){
  times++;
  res.render("player1", {
  cnt:times});
});

router.get('/p2',function(req,res){
  times++;
  res.render("player2", {
  cnt:times});
});

//add the router
app.use('/', router);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

var board1 = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];
var board2 = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
];

let lastMove = {"player":1, "cell":0}

p1 = 0;
p2 = 0;

//player1
router.get('/GetMove1/:c/:s/:r', function(req,res){
   //lastMove.player = req.params.p
   lastMove.cell = req.params.c
  // row = cell /10 col = cell%10
  //row = req.params.c / 10;
  //col = req.params.c % 10
  rotate = parseInt(req.params.r)
  size = parseInt(req.params.s)
  c = parseInt(req.params.c)
  row = Math.floor(c / 10);
  col = c % 10;

  let sum = c + size



  can = true;
  if(rotate == 0){
    //row
    for(a = col; a< col+size; a++)
    {
      if(board1[row][a] == 1)
      {
        can = false;
        break;
      }
    }

    if(can)
    {
      if(col + size > 10)
      {
        lastMove.cell = -1;
      }

      else{

        for(a = col; a< col+size; a++)
        {
            board1[row][a] = 1;
        }
      }
    }
    else
      lastMove.cell = -1;
  }
  else{
    //col
    for(a = row; a< row+size; a++)
    {
      if(board1[a][col] == 1)
      {
        can = false;
        break;
      }
    }
    
    if(can)
    {
      if(row + size > 10)
      {
        lastMove.cell = -1;
      }

      else{
        for(a = row; a< row+size; a++){
          console.log("a = " + a);
          console.log("col = " + col);
          board1[a][col] = 1;
          console.log("place = " + board1[a][col]);
        }
      }
    }
    else
      lastMove.cell = -1;
  }
  

  console.log(board1);
  res.send(lastMove);

  
})

router.get('/sendMove1/:c', function(req,res){
  c = parseInt(req.params.c)
  row = Math.floor(c / 10);
  col = c % 10;
  if(board2[row][col] == 1)
  {
    board2[row][col] = 0;
    lastMove.cell = 1
    turn.last = 1;
  }
  else
  {
    lastMove.cell = -1
    turn.last = 2;
  }
  res.send(lastMove);
})


router.get('/p1Ready', function(req,res){
  turn.p1 = 1;
})

//player2

router.get('/p2Ready', function(req,res){
  turn.p2 = 1;
})

router.get('/GetMove2/:c/:s/:r', function(req,res){
  //lastMove.player = req.params.p
  lastMove.cell = req.params.c
 // row = cell /10 col = cell%10
 //row = req.params.c / 10;
 //col = req.params.c % 10
 rotate = parseInt(req.params.r)
 size = parseInt(req.params.s)
 c = parseInt(req.params.c)
 row = Math.floor(c / 10);
 col = c % 10;

 let sum = c + size
 console.log("hello = " + row + size);


 can = true;
 if(rotate == 0){
   //row
   for(a = col; a< col+size; a++)
   {
     if(board2[row][a] == 1)
     {
       can = false;
       break;
     }
   }

   if(can)
   {
     if(col + size > 10)
     {
       lastMove.cell = -1;
     }

     else{

       for(a = col; a< col+size; a++)
       {
           board2[row][a] = 1;
       }
     }
   }
   else
     lastMove.cell = -1;
 }
 else{
   //col
   for(a = row; a< row+size; a++)
   {
     if(board2[a][col] == 1)
     {
       can = false;
       break;
     }
   }
   
   if(can)
   {
     if(row + size > 10)
     {
       lastMove.cell = -1;
     }

     else{
       for(a = row; a< row+size; a++){
         console.log("a = " + a);
         console.log("col = " + col);
         board2[a][col] = 1;
         console.log("place = " + board2[a][col]);
       }
     }
   }
   else
     lastMove.cell = -1;
 }
 

 console.log(board2);
 res.send(lastMove);

 
})

router.get('/sendMove2/:c', function(req,res){
  c = parseInt(req.params.c)
  row = Math.floor(c / 10);
  col = c % 10;
  if(board1[row][col] == 1)
  {
    board1[row][col] = 0;
    lastMove.cell = 1
    turn.last = 2;
  }
  else
  {
    lastMove.cell = -1
    turn.last = 1;
  }

  res.send(lastMove);
})



function checkBoard1()
{
  for(row = 0; row < 10; row++)
  {
    for(col = 0; col < 10; col++)
    {
      if(board1[row][col] == 1)
        return 1;
    }
  }
  return 0;
}


function checkBoard2()
{
  for(row = 0; row < 10; row++)
  {
    for(col = 0; col < 10; col++)
    {
      if(board2[row][col] == 1)
        return 1;
    }
  }
  return 0;
}

turn ={"last":1,"isGameOn": 1, "p1":0, "p2":0}

router.get('/whoTurn', function(req,res){

  if(checkBoard1() == 1 && checkBoard2() == 0 && turn.p1 == 1 && turn.p2 == 1)
  {
    turn.last = 1;
    turn.isGameOn = 0;
  }
  else if(checkBoard1() == 0 && checkBoard2() == 1 && turn.p1 == 1 && turn.p2 == 1)
  {
    turn.last = 2;
    turn.isGameOn = 0;
  }
  res.send(turn)
})


router.get('/restart1', function(req,res){
    
     board1 = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];
    p1 = 0;

})

router.get('/restart2', function(req,res){
  p2 = 0;
  board2 = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ];
 
})
