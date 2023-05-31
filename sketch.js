let points = [[-3, 0], [-4,-1], [-6, -2],[-6,-3],[-5,-4],[-4,-4],[-3,-4],[1,-2],[-1,1],[5,3],[6,5],[7,5],[7,3],[9,2],[8,1.5],[6,2], [2,-5], [-5, -3],[-5.5,0],[-5,0],[-5,-6],[-4.5,-6], [-5, -3],[-9,3],[-7,4],[7,-3],[5,-4],[-9,3],[-6,-2],[-4,-3],[-2,-2],[-1,-1],[5,3],[4,4],[4.5,4.5],[5.5,4],[-4,-1],[-2,-2],[5,-4]]; //list資料，飛機
var fill_colors = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
var line_colors = "ef476f-ffd166-06d6a0-118ab2-073b4c".split("-").map(a=>"#"+a)
//class:類別,例子
class Obj{//宣告一個類別,針對一個畫的圖案 
 constructor(args){//預設值,基本資料(物件的顏色,移動的速度,大小,初始顯示位置......)
    //this .p= args.p||{x:random(width),y:random(height )}//描述為該物件初始位置,
                        //||(or),當產生一個物件時有傳給位置參數,得使用該參數 ,如果沒有傳參數,就以||後面產出
    this .p= args.p||createVector(random(width),random(height))
    //this.v = {x:random(-1,1),y:random(-1,1)}//設定物件移動速度
    this.v =createVector(random(-1,1),random(-1,1))//把把原本(x:........,y:........)改成向量方向
    this.size =random(5,10)//一個物件的放大倍率
    this.color =random(fill_colors)
    this.strok =random(line_colors)
 }  
 draw(){ // 畫出單一個物件形狀
  push() //執行push()後依照诶的設定,設定原點(0,0)位置
   translate(this.p.x,this.p.y) //以該物件位置為原點
   scale(this.v.x<0?1:-1,-1)//左右翻轉

   fill(this.color)
   stroke(this.strok)
   strokeWeight(3)
   beginShape()
   for(var k=0; k<points.length;k=k+1){
   //line(points[k][0]*this.size,points[k][1]*this.size,points[k+1][0]*this.size,points[k+1][1]*this.size)
    curveVertex(points[k][0]*this.size,points[k][1]*this.size)//畫視為圓弧方式畫圓
   }
   endShape()
  pop()//執行pop()後,原點(0,0)回到整個視窗左上角
 }
 update(){//移動
  this.p.x=this.p.x+this.v.x //x軸目前位置(this.p.x)加上x軸移動速度(this.v.x)
  this.p.y=this.p.y+this.v.y
  if(this.p.x<=0 ||this.p.x>=width){//x軸碰到左邊(<=0),或右邊(>=width)
    this.v.x =-this.v.x//把x軸速度方向改變
  }
  if(this.p.y<=0 ||this.p.y>=height){//y軸碰到上邊(<=0),或下邊(>=height)
    this.v.y =-this.v.y//把y軸速度方向改變
  }
 }
 isBallInRanger(x,y){  //功能:判斷滑鼠按下的位置是 否在物件範圍內
   let d = dist(x,y,this.p.x,this.p.y)//計算兩點(滑鼠按下與物件中心點)之間距離,放到d變數內
  if(d<5*this.size){
    return true // 滑鼠與物件的距離小於物件的寬度,代表碰觸了,則傳回true的值(碰觸 )
  }else{
    return false //滑鼠與物件的距離大於物件的寬度,代表沒有碰觸了,則傳回false的值(未碰觸)
  }


 }
}
//定義一個飛彈物件class
class Bullet{
  constructor(args){//預設值,基本資料(物件的顏色,移動的速度,大小,初始顯示位置......)
      this.r= args.r||10 //設計的飛彈有大有小時,傳參數 args.r,沒有傳參數就已10為主
      this.p = args.p||createVector(width/2,height/2)//建立一個向量{x:width/2,y:height/2}
      this.v = args.v||createVector(mouseX-width/2,mouseY-height/2).limit(5)
      this.color =args.color||"#e09f3e"
    }
  draw(){ //畫出物件程式碼
     push()
         translate(this.p.x,this.p.y)
         fill(this.color)
         noStroke()
         //riangle(25,25,-25,this.r)
         //square(25,50,25,50,this.r)
         ellipse(0,0,this.r)
     pop()
  }
  update(){//計算出移動後的位置
    this.p.x=this.p.x+this.v.x //x軸目前位置(this.p.x)加上x軸移動速度(this.v.x)
    this.p.y=this.p.y+this.v.y
  }
}
var monster_colors = "8ecae6-219ebc-023047-ffb703-fb8500".split("-").map(a=>"#"+a)
class Monster{//宣告一個怪物類別,名稱為monster
  constructor(args){//預設值,基本資料(物件的顏色,移動的速度,大小,初始顯示位置......)
    this.r= args.r||random(50,100) //設計的怪物的主題,傳參數 args.r,沒有傳參數就已10為主
    this.p = args.p||createVector(random(width),random(height))//建立一個向量,由電腦亂數顯示初始位置
    this.v = args.v||createVector(random(-1,1),random(-1,1))//移動的速度,如果沒有傳args參數就會利用亂數(-1.1)抽出x,y軸的移動數度
    this.color =args.color||random(monster_colors)
    this.mode =random(["happy","bad"])//+++++++++++
  }
  draw(){//劃出元件
     push()//重新設定
      translate(this.p.x,this.p.y)//原點座標(0,0)移到物件中心上
      fill(this.color)
      noStroke()
      ellipse(0,0,this.r)
      
      //++++++++++
      if(this.mode=="happy"){
       fill(255)
       ellipse(0,0,this.r/2)
       fill(0)
       ellipse(10,0,this.r/3)
       
      }else{
          fill(255)
          arc(0,0,this.r/2,this.r/2,0,PI)
          fill(0)
          arc(0,0,this.r/3,this.r/3,0,PI)
      }
      stroke(this.color)
      strokeWeight(3)
      noFill()
      //line(this.r/2,0,this.r,0)
      for(var j =0;j<8;j++){
          rotate(PI/4)
          beginShape()
           for(var i =0;i<(this.r/2);i++){
             vertex(this.r/2+i,sin(i/5+frameCount/10)*10)
          }
          endShape()
        }

     pop()//恢復整個試窗左上角

  }
  update(){//計算出移動元件位置
    this.p.add(this.v)
    //碰壁彈回
    if(this.p.x<=0 ||this.p.x>=width){//x軸碰到左邊(<=0),或右邊(>=width)
      this.v.x =-this.v.x//把x軸速度方向改變
    }
    if(this.p.y<=0 ||this.p.y>=height){//y軸碰到上邊(<=0),或下邊(>=height)
      this.v.y =-this.v.y//把y軸速度方向改變
    }

  }
}
//+++++++++++++++飛機物件類別
var ball //目前要處理的物件.暫時放在ball變數內
var balls =[] //把產生的"所有"物件,為物件倉庫,所有物件在這
//++++++++飛彈物件定義
var bullet //目前要處理的物件.暫時放在bulletl變數內
var bullets =[] //把產生的"所有"物件,為物件倉庫,所有物件在這
//++++++++++++
//+++++++++++怪物物件類別
var monster //目前要處理的物件.暫時放在bulletl變數內
var monsters =[] //把產生的"所有"物件,為物件倉庫,所有物件在這
//++++++++++++++++

var score =0

function preload(){//程式碼準備執行之前,所執行的程式碼內容.比set up更早執行
  bullet_sound=loadSound("music/boomp1.mp3")

}

let startTime;
let elapsedTime;


function setup() {
  createCanvas(windowWidth, windowHeight);
  startTime = millis(); // 紀錄程式開始運行的時間
  for(var i=0;i<20;i=i+1){//i=0,2,4,6,
   ball =new Obj({})//產生一個新的obj class元件
   balls.push(ball)//把ball的物件放入到ball陣列內

  }
  for(var i=0;i<20;i=i+1){//i=0,2,4,6,
    monster =new Monster({})//產生一個新的monster class元件
    monsters.push(monster)//把monster的物件放入到monsters陣列內
 
   }
 
}

  



function draw() {
background(220);

// for(var j=0;j<balls.length;j=j+1){
//   ball =balls[j]
//   ball.draw()
//   ball.update()
//  }
//飛機的顯示
 for(let ball of balls ){//只要是陣列的方式,都可以用此方式處理
  ball.draw()
  ball.update()
  for(let bullet of bullets){  //檢查飛彈物件
     if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){//飛彈物件也沒有接觸 
       balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠案到的物件編號 (ball.indexOf(ball))
       bullets.splice(bullets.indexOf(bullet),1)
       score = score+1
       bullet_sound.play()
       
 }
  }
//飛彈的顯示
 for(let bullet of bullets ){
  bullet.draw()
  bullet.update()
 }
//怪物顯示
 for(let monster of monsters ){
  monster.draw()
  monster.update()
  
 }
 textSize(50)
 text(score,800,50)  //在座標為(100,100)上,顯示score分數的內容
push()
  let dx =mouseX-width/2
 let dy =mouseY -height/2
let angle=atan2(dy,dx)//算出角度
let w=100
let h=50
//angle+=0.01;
 translate(width/2,height/2)
 fill("#588157")
 noStroke()
 rotate(angle);
 ellipse(0,0,w,h)//橢圓形砲台
 fill("#000814")
 ellipse(20,5,8,8)
 fill("#000814")
 ellipse(20,-8,8,8)
 fill("#d90429")
 triangle(-5,5,5,5,0,-5)
 fill("#a3b18a")
 noStroke()
 ellipse(50,20,50,20)
 fill("#a3b18a")
 noStroke()
 ellipse(50,-20,50,20)
 pop()
}
elapsedTime = millis() - startTime;
  
  // 將毫秒轉換為秒
  let seconds = floor(elapsedTime / 1000);
  
  // 顯示計時器
  textSize(50);
  textAlign(CENTER, CENTER);
  text(seconds, 100, 100);
}
function  mousePressed(){
  //+++++++++++++++++產生一物件
  // ball =new Obj({p:{x:mouseX,y:mouseY}
  // })//在滑鼠按下的地方產生一個新的obj class元件
  // balls.push(ball)//把ball的物件放入到ball陣列內
  //++++++++++++++++++++++++++++++++


  //+++++++++++++++++物件按下滑鼠消失不見,分數加1分.
  // for(let ball of balls){  //檢查每一物件
  //  if(ball.isBallInRanger(mouseX,mouseY)){ 
  //    balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠案到的物件編號 (ball.indexOf(ball))
  //    score = score+1
  //   }
  // }
//+++++++++++++++++++++++++


//+++++案移下產生飛彈++++++++++
bullet = new Bullet({})//在滑鼠按下的地方產生一個新的Bullet (產生一個飛彈))
bullets.push(bullet) //把bullet的物件放入到bullet陣列內

}
