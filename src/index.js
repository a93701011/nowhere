
//------get paramete from http------------------------------------

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const dna = urlParams.get('dna');
const tokenid = urlParams.get('tokenid');
const dt = urlParams.get('dt');
const myArray = String(dna).split("");

//-------dna setting-------------------------------------

let xs = ['why', 'rocket_sincos', 'hair', 'rocket_dot', 'cube', 'enlighten', 'humid', 'evident', 'hamster', 'feelgood', 'rabbit', 'human']
let colortypelimit = [7,3,4,2]

let boxstylemap = new Map()
boxstylemap[0] = [6,0.6,0.2,0  ,0.25,1,0.2,0.5] 
boxstylemap[1] = [6,0.6,0.2,0.5,0   ,1,0.2,0.5] 
boxstylemap[2] = [7,0.6,0.2,0.5,0   ,1,0.2,0.5] 
boxstylemap[3] = [8,0.6,0.2,0.5,0   ,1,0.2,0.5] 
boxstylemap[4] = [9,0.6,0.2,0.4,0   ,1,0.2,0.5] 
boxstylemap[5] = [10,0.6,0.2,0.3,0   ,1,0.2,0.5] 
boxstylemap[6] = [15,1 ,0 ,0  ,0.25,1,1  ,0] 
boxstylemap[7] = [15,1 ,0 ,0  ,0   ,1,1  ,0] 
boxstylemap[8] = [15,0 ,1 ,0  ,0   , 0,0 ,1] 

let facetype =  parseInt(fxrand()*8); // skin 0~8
let cloudtype = parseInt(fxrand() * 11); //mask 0~11
let xstype =  parseInt(fxrand()*11) //xs 0~11
let evironment = parseInt(fxrand()*1); // evironment 0~3
let boxstyle = parseInt(fxrand()*9); //boxstyle

// let facetype = myArray[1];
// let cloudtype = myArray[2] =='a'?10:myArray[2] =='b'?11:myArray[2] ; //mask 0~11
// let xstype = myArray[3] =='a'?10:myArray[3] =='b'?11:myArray[3]; //xs 0~11
// let evironment = myArray[6];
// let boxstyle = myArray[4];

//------box-settings-------------------------------------
let colortype = parseInt(fxrand()*colortypelimit[evironment]);
let boxsselect = boxstylemap[boxstyle][0]
let elepool = ["1", "2", "3", "4", "5", "6", "7", "8", "9" ,"10", "11", "12", "13", "14", "15"]
let selecteles = randomSelection(boxsselect);
let ladder = "0,1,2";
let tall = "1,0";
let stair = "ab,ac,ab1,ac1"
let door = "1,2,3,4"


let elements = selecteles.map(a => `.p${a}`);
let elementsname = selecteles.map(a => `p${a}`);
let ele = [];

let laddernameA = [];
let ladA = [];

let laddernameB = [];
let ladB = [];

let laddernameC = [];
let ladC = [];

let elementsnametall = [];
let eletall = [];

let elementsnamestair = [];
let elestair = [];

let doornameA, doorA = [];
let doornameB, doorB = [];
let doornameC, doorC = [];

let svgbox = document.querySelector("#svgbox");
let svgsky = document.querySelector("#svgsky");
let svg = document.querySelector("#svgall");
let svgNS = "http://www.w3.org/2000/svg" //svgbox.namespaceURI;
let cubearea = svg.querySelector('.cubearea');
let svg4gif 


let width = 900;
let height = 900;
let winowinnerwidth = window.innerWidth;
let winowinnerHeight = window.innerHeight;

// console.log(`${winowinnerwidth} ${winowinnerHeight}`)

let genwidth = 761.44;
let genheight = 780;
let minwidth = 69.28 * 2;
let minheight = 60 * 1;
let mindx = 0 

if(facetype == '7'){
genwidth = 1170
genheight = 810;
minwidth = -270;
minheight = 55;
mindx = -271;
}

if( facetype == '6'){
  genwidth = 1384.96
  genheight = 1000;
  minwidth = -484.96;
  minheight = -100;
  mindx =-500;
  }

console.log(minwidth)

let cor = [];
let dx = 0, dy = 0;
let ddx = 34.64;
let ddy = 20;
let boxcount = 0;
let mode = 0;
let laddertypegroupmode = 0;
let stairtypegroupmode = 0;
let s1,s2,sx1,sx2,sy

// 如果已經是梯子 下一個可以的mode
const laddertypemode = new Map();
laddertypemode[1] = 7
laddertypemode[2] = 6
laddertypemode[3] = 6
laddertypemode[4] = 1
laddertypemode[5] = 1
laddertypemode[6] = 7

// 開始不是梯子 : 甚麼 mode 可以有 怎樣的梯子
const modegroupladdertype = new Map();
modegroupladdertype[1] = [1, 6] // mode 1
modegroupladdertype[2] = [2, 3] // mode 6
modegroupladdertype[3] = [4, 5] // mode 7

// 開始不是stair : 甚麼 mode 可以有 怎樣的樓梯

const modestair = Array(9).fill(-1)
modestair[1] = [1,2,3,4] // mode 1
modestair[2] = [3] // mode 2
modestair[3] = [4] // mode 3
modestair[6] = [2] // mode 6
modestair[7] = [1] // mode 7

const modegrouptostairtype = new Map();
modegrouptostairtype[3] = [1,2,3,4] // mode 1
modegrouptostairtype[1] = [2] // mode 6
modegrouptostairtype[2] = [1] // mode 7
modegrouptostairtype[4] = [3] // mode 2
modegrouptostairtype[5] = [4] // mode 3

// 已經是梯子  搭配現在的mode 可以接什麼樓梯
const laddermodestair = Array(7).fill(-1).map(x => Array(9).fill(-1))

laddermodestair[1][2]=[2]
laddermodestair[1][3]=[4]
laddermodestair[1][6]=[2]
laddermodestair[1][7]=[1,2,3]

laddermodestair[2][2]=[3]
laddermodestair[2][3]=[4]
laddermodestair[2][6]=[1,2,4]
laddermodestair[2][7]=[1]

laddermodestair[3][1]=[1]
laddermodestair[3][2]=[1]
laddermodestair[3][3]=[2]
laddermodestair[3][6]=[1,3,4]

laddermodestair[6][1]=[2]
laddermodestair[6][2]=[1]
laddermodestair[6][3]=[2]
laddermodestair[6][7]=[2,3,4]

// 已經有stair 搭配現在的mode 可以接什麼梯子
const stairmodeladder = Array(5).fill(-1).map(x => Array(9).fill(-1))

stairmodeladder[1][2]=[1,2]
stairmodeladder[1][3]=[2,3]
stairmodeladder[1][5]=[3]
stairmodeladder[1][6]=[2,3]
stairmodeladder[1][7]=[3,6]

stairmodeladder[2][2]=[1,6]
stairmodeladder[2][3]=[2,1]
stairmodeladder[2][5]=[6]
stairmodeladder[2][6]=[3,6]
stairmodeladder[2][7]=[1,6]

stairmodeladder[3][2]=[1,6]
stairmodeladder[3][3]=[3]
stairmodeladder[3][6]=[1,2]
stairmodeladder[3][7]=[1,6]

stairmodeladder[4][2]=[3,6]
stairmodeladder[4][3]=[2]
stairmodeladder[4][6]=[2,3]
stairmodeladder[4][7]=[1,2]

// 已經是樓梯 搭配甚麼mode 可以接什麼stair
const stairmodestair = Array(5).fill(-1).map(x => Array(9).fill(-1))
stairmodestair[1][7]  = 4
stairmodestair[2][6]  = 3
stairmodestair[3][6]  = 2
stairmodestair[3][5]  = 1
stairmodestair[4][7]  = 1
stairmodestair[4][5]  = 2

// 已經是樓梯 搭配甚麼mode 是否可以cube
var stairmodeiscube = Array(5).fill(-1).map(x => Array(9).fill(-1))
stairmodeiscube[3][6]  = 1
stairmodeiscube[4][7]  = 1

//-------init-------------------------------------
window.onload = function () {
  init();
  addcss();
  addcloud();
  addvolumn();
  addShootingstuff();
  addanimation();
  // console.log(svg);
  // downloadhtml();
  // downloadhtml4gif();
  // downloadsvg();
}

//-------download function-------------------------------------


const trait = () => {
  trait_list = {};
  trait_list['cubetype'] = selecteles;
  trait_list['boxstyle'] = boxstyle;
  trait_list['skin'] = facetype;
  trait_list['mask'] = cloudtype;
  trait_list['xs'] = xstype;
  trait_list['evironment'] = evironment;
  trait_list['hasdid'] = fxhash;
  trait_list['color'] = colortype;

  return trait_list
}

const cssfile = () => {
  const files = [`css-dist/cartoon_${colortype}.min.css`, `css-dist/subreal_${colortype}.min.css`, `css-dist/iridenscent_${colortype}.min.css`, `css-dist/bw_${colortype}.min.css`];
  return files[evironment]

}
let jsscript = 'image_cartoon.js'
if(facetype == '6'){
  jsscript = 'image_cartoon_6.js'
}
const trait_json = trait();
const css_file = cssfile();
const js_file = 'image_cartoon.js';

console.log(trait_json)

const addcss = () => {
  let css = document.createElement('link')
  css.setAttribute('rel', "stylesheet")
  css.setAttribute('href', `./css/${css_file}`)
  document.head.appendChild(css);
}

const downloadhtml = () => {

  let html = document.createElement('html');
  let head = document.createElement('head');
  let body = document.createElement('body');
  svg4html = svg.cloneNode(true);
  body.appendChild(svg4html);

  let cssscript = document.createElement('style');
  let script1 = document.createElement('script');
  script1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.0/gsap.min.js"
  let script2 = document.createElement('script');
  let script3 = document.createElement('script');


  $.getScript(`./css/${css_file}`)
    .done(function (script, textStatus) {
      cssscript.innerHTML = script;
      svg4html.appendChild(cssscript);

      script2.innerHTML = `const trait_list = ${JSON.stringify(trait_json)}`

      
      $.getScript(`./js/${jsscript}`)
        .done(function (script, textStatus) {
          script3.innerHTML = script;

          body.appendChild(script1);
          body.appendChild(script2);
          body.appendChild(script3);
      

          html.appendChild(body);
          let blob = new Blob([html.outerHTML], { type: 'image/svg+xml' });
          let url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `${tokenid}_${dna}_nowhere.html`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
          }, 100);

        })

    })
}
const downloadsvg = () => {

  const svg4dl = svg.cloneNode(true);
  let cloudarea = svg4dl.querySelector('.cloudarea');
  let cubearea = svg4dl.querySelector('.cubearea');
  if(facetype != '6'){
  const duration = parseInt(fxrand()*20)/10+4
  let clouldanimation1 = svgsky.querySelector('#clouldanimation1').cloneNode(true);
  clouldanimation1.setAttribute('dur', `${duration}s`)
  let clouldanimation2 = svgsky.querySelector('#clouldanimation2').cloneNode(true);
  clouldanimation2.setAttribute('dur', `${duration}s`)
  let clouldanimation3 = svgsky.querySelector('#clouldanimation3').cloneNode(true);
  clouldanimation3.setAttribute('dur', `${duration}s`)
  let clouldanimation4 = svgsky.querySelector('#clouldanimation4').cloneNode(true);
  clouldanimation4.setAttribute('dur', `${duration}s`)
  cloudarea.appendChild(clouldanimation1);
  cloudarea.appendChild(clouldanimation2);
  cloudarea.appendChild(clouldanimation3);
  cloudarea.appendChild(clouldanimation4);
  let clouldanimation9 = svgsky.querySelector('#clouldanimation9').cloneNode(true);
  clouldanimation9.setAttribute('dur', `${duration}s`)
  cubearea.appendChild(clouldanimation9);
  }

  let cssscript = document.createElement('style');
  $.getScript(`./css/${css_file}`)
      .done(function (script, textStatus) {
        cssscript.innerHTML = script;
        svg4dl.appendChild(cssscript)
        let blob = new Blob([svg4dl.outerHTML], { type: 'image/svg+xml'});
        let url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${tokenid}_${dna}_nowhere.svg`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 100);
      })

}


const downloadhtml4gif = () => {

  let html = document.createElement('html');
  let head = document.createElement('head');
  let body = document.createElement('body');
 
  svg_duplicate = svg.cloneNode(true);
  body.appendChild(svg4gif);
  
  let cssscript = document.createElement('style');
  let script1 = document.createElement('script');
  script1.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.0/gsap.min.js"
  let script2 = document.createElement('script');
  let script3 = document.createElement('script');
  let script4 = document.createElement('script');

  $.getScript(`./css/${css_file}`)
    .done(function (script, textStatus) {
      cssscript.innerHTML = script;

      head.appendChild(cssscript);
      html.appendChild(head);

      script2.innerHTML = `const trait_list = ${JSON.stringify(trait_json)}`

      $.getScript(`./js/onload.js`)
        .done(function (script, textStatus) {
          script3.innerHTML = script;
          body.appendChild(script1);
          body.appendChild(script2);
          body.appendChild(script3);
      
          html.appendChild(body);
          let blob = new Blob([html.outerHTML], { type: 'image/svg+xml' });
          let url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = `${tokenid}_${dna}_gif_nowhere.html`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
          }, 100);
        })
    })
}

//-------functions-------------------------------------

function addvolumn(){
  if(facetype == 0 ){

    addCube(9, 400, 220);
    addCube(9, 400-ddx*6, 420); 
    addCube(9, 400+ddx*6, 420);
    addCube(9, 400-ddx*4, 540);
    addCube(9, 400+ddx*4, 540);
  
  }else if(facetype == 1 ){

    addCube(20, 400, 220);
    addCube(20, 400-ddx*6, 420); 
    addCube(20, 400+ddx*6, 420);
    addCube(20, 400-ddx*4, 580);
    addCube(20, 400+ddx*4, 580);
  
  }else if(facetype == 2){

    delta = parseInt(fxrand()*6)
    addCube(9, 250 + ddx*2*delta,220 );
    addCube(30, 250 + ddx*2*(5-delta)  , 580);

  }else if(facetype == 3){

    addCube(20, 220,340 );
    addCube(20, 220+ddx*10, 340);
    addCube(9, 220+ddx*6, 580);

  }else if(facetype == 4){

    addCube(9, 450, 260);
    addCube(25, 450-ddx*6, 540);
    addCube(25, 450+ddx*6, 540);

  }else if(facetype == 5){

    addCube(5, 400, 220);
    addCube(5, 400-ddx*6, 420); 
    addCube(5, 400+ddx*6, 420);
    addCube(5, 400-ddx*4, 540);
    addCube(5, 400+ddx*4, 540);
  }else if(facetype == 6){

    addCube(27, -415.68,-22 );
    addCube(26, -415.68-ddx,38 );
    addCube(27, -415.68,98 );
    addCube(26, -415.68-ddx,158 );
    addCube(27, -415.68,218 );
    addCube(26, -415.68-ddx,278 );
    addCube(27, -415.68,338 );
    addCube(26, -415.68-ddx,398 );
    addCube(27, -415.68,458 );
    addCube(26, -415.68-ddx,518 );
    addCube(27, -415.68,578 );
    addCube(26, -415.68-ddx,638 );
    addCube(27, -415.68,698 );
    addCube(26, -415.68-ddx,758 );
    addCube(27, -415.68,818 );
    addCube(26, -415.68-ddx,878 );
    addCube(27, -415.68,938 );


  }else if(facetype == 7){

    addCube(200, 250,380 );
    addCube(200,250+ddx*8, 380);



  }else{
   
  }
}

function rn(from, to) {
  return parseInt(fxrand() * (to - from + 1)) + from;
}

function randomSelection(n) {
  let newArr = [];
  if (n >= elepool.length) {
    return elepool;
  }
  for (let i = 0; i < n; i++) {
    let newElem = elepool[Math.floor(fxrand() * elepool.length)];
    while (newArr.includes(newElem)) {
      newElem = elepool[Math.floor(fxrand() * elepool.length)];
    }
    newArr.push(newElem);
  }
  return newArr;
}

function elemap(string, key) {
  let elements = string.split(",").map(a => `.${key}${a}`);
  let ele = [];
  elements.map(function (selector) {
    let ref = selector.replace(/[\.#]/g, '');
    ele[ref] = document.querySelector(selector);
  });

  return ele
}

function elenamemap(string, key) {
  let elementsname = string.split(",").map(a => `${key}${a}`);

  return elementsname
}

function init() {

  elements.map(function (selector) {
    let ref = selector.replace(/[\.#]/g, '');
    ele[ref] = document.querySelector(selector);
  });

  ladA = elemap(ladder, 'lA');
  laddernameA = elenamemap(ladder, 'lA');

  ladB = elemap(ladder, 'lB');
  laddernameB = elenamemap(ladder, 'lB');

  ladC = elemap(ladder, 'lC');
  laddernameC = elenamemap(ladder, 'lC');

  eletall = elemap(tall, 't');
  elementsnametall = elenamemap(tall, 't');

  elestair = elemap(stair, 'st');
  elementsnamestair = elenamemap(stair, 'st');

  doorA = elemap(door, 'dA');
  doornameA = elenamemap(door, 'dA');

  doorB = elemap(door, 'dB');
  doornameB = elenamemap(door, 'dB');

  doorC = elemap(door, 'dC');
  doornameC = elenamemap(door, 'dC');

  doorbox = document.querySelector('.dD');

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

}

function genCube(box, eletype) {
  newbodypart = ele[elementsname[eletype]].cloneNode(true);
  box.appendChild(newbodypart);
  box.setAttribute('transform', `translate(${dx},${dy})`);
  return box;
}

function genLadder(box, laddertype) {

  let ladAtype = 0
  let ladBtype = 0
  let ladCtype = 0

  if (laddertype === 1) { //A
    ladAtype = 1;
    newbodypartA = ladA[laddernameA[ladAtype]].cloneNode(true);
    box.appendChild(newbodypartA);
  } 
  else if (laddertype === 2) { //Asq
    ladAtype = 2;
    newbodypartA = ladA[laddernameA[ladAtype]].cloneNode(true);
    box.appendChild(newbodypartA);
  }
  else if (laddertype === 3) { //B
    ladBtype = 1;
    newbodypartB = ladB[laddernameB[ladBtype]].cloneNode(true);
    box.appendChild(newbodypartB);
  } 
  else if (laddertype === 4) { //Bsq
    ladBtype = 2;
    newbodypartB = ladB[laddernameB[ladBtype]].cloneNode(true);
    box.appendChild(newbodypartB);
  }
  else if (laddertype === 5) { //C
    ladCtype = 1;
    newbodypartC = ladC[laddernameC[ladCtype]].cloneNode(true);
    box.appendChild(newbodypartC);
  } 
  else if (laddertype === 6) { //Csq
    ladCtype = 2;
    newbodypartC = ladC[laddernameC[ladCtype]].cloneNode(true);
    box.appendChild(newbodypartC);
  }

  // newbodypartA = ladA[laddernameA[ladAtype]].cloneNode(true);
  // newbodypartB = ladB[laddernameB[ladBtype]].cloneNode(true);
  // newbodypartC = ladC[laddernameC[ladCtype]].cloneNode(true);
  // box.appendChild(newbodypartA);
  // box.appendChild(newbodypartB);
  // box.appendChild(newbodypartC);
  box.setAttribute('transform', `translate(${dx},${dy})`);
  return box;
}

function genDoor(box, doorface, doortype) {
  newbodypart = doorbox.cloneNode(true);
  if (doorface == "A") { newbodydoor = doorA[doornameA[doortype]].cloneNode(true); }
  else if (doorface == "B") { newbodydoor = doorB[doornameB[doortype]].cloneNode(true); }
  else { newbodydoor = doorC[doornameC[doortype]].cloneNode(true); }
  box.appendChild(newbodypart);
  box.appendChild(newbodydoor);
  box.setAttribute('transform', `translate(${dx},${dy})`);
  return box;
}

function genStair(box, stairtype) {
   newbodypart = elestair[elementsnamestair[stairtype-1]].cloneNode(true);
  box.appendChild(newbodypart);
  box.setAttribute('transform', `translate(${dx},${dy})`);
  return box;
}

function genTall(box, talltype) {
  newbodypart = eletall[elementsnametall[talltype]].cloneNode(true);
  box.appendChild(newbodypart);
  box.setAttribute('transform', `translate(${dx},${dy})`);
  return box;
}

function isLadder(x,y){
  if(x>163 & x<726){
      if(y>100 & y<800){
        return 1
      }
    }
  return 0
}


function addCube(num, cx, cy) {

  let reset = 0;
  let laddertype = 0;
  let talltype = 0;
  let stairtype = 0;
  let blank = 0;
  let eletype = 0;
  stairtypegroupmode = 0;
  laddertypegroupmode = 0;
  mode = 0;
  let boxcount = 0;
  let isbreak = 0;
  // corxh = Array(num).fill(0).map(x => Array(2).fill(0))
  corxh=[];

  for (let i = 0; i < num; i++) {

    let loopcount = 1;

    if (i === 0) {
      dx = cx;
      dy = cy;
    } else {

      while (true) {
       
        let newdx,newdy
        genPostion(laddertype, talltype, stairtype);
        results= genPoint(mode,dx,dy);
        newdx = results[0]
        newdy = results[1]
        // console.log(`${i} ${results[0]} ${results[1]}`);
        if (newdx <= genwidth & newdy <= genheight & newdx >= minwidth & newdy >= minheight) {
          if (!isExist(newdx, newdy)) {
            dx = newdx
            dy = newdy
            break;
          }
        }

        if (loopcount === 5) {
          reset++;
          dx = cx - (ddx * 2 * reset);
          dy = cy  //( 20 * reset) ;
          if (reset == 3){
          dx = mindx-1
          }
          laddertype = 0;
          talltype = 0;
          stairtype = 0;
          blank = 0;
          mode = 0;
          break;
        }
        loopcount++;
      }
    }

    if (dx < mindx) {
      dx = corxh[i - 1][0];
      dy = corxh[i - 1][1];

      isbreak = 1;
     
      break;
    }

    boxcount++;
    // corxh[i][0] = dx;
    // corxh[i][1] = dy;
    corxh.push([dx,dy])
    cor.push([dx,dy])

    //-----gen box
    let box = document.createElementNS(svgNS, 'g');
    box.setAttribute('class', 'gen')
    if (i === num-1 || isbreak === 1) {
      // console.log(`最後一個`);
      box = genCube(box, eletype);
      cubearea.appendChild(box);
    }
    //上一個是柱這一個可能是柱子機率高
    else if (talltype == 1) {
      talltype = fxrand() < 0.9 ? 0 : 1;  // 下一個是無蓋柱機率低
      box = genTall(box, talltype);
      box.setAttribute('class', 'tall gen');
      cubearea.appendChild(box);
      blank = 0
    }

    // 如果是可以為梯子的mode(1,6,7), 有60%機率可以選擇梯子
    else if (isLadder(dx,dy) === 1 & laddertypegroupmode > 0 & stairtype === 0 &  blank ==0 & fxrand() < boxstylemap[boxstyle][1]) {
      laddertype = laddertype != 0 ? laddertype : modegroupladdertype[laddertypegroupmode][parseInt(fxrand() * 2)];
      // console.log(`ladder ${i} ${dx} ${dy}`);
      // addTextToSVG(dx, dy, i, "red")
      box = genLadder(box, laddertype);
      box.setAttribute('class', 'ladder gen');
      cubearea.appendChild(box);
      stairtype = 0
      blank = 0
    
    }

    //上一個是梯子 下一個可以是樓梯
    else if (laddertype > 0 & laddermodestair[laddertype][mode] != -1 & fxrand() < boxstylemap[boxstyle][6]){
    
      const stairlist = laddermodestair[laddertype][mode];
      const count = stairlist.length;
      stairtype = stairlist[parseInt(fxrand()*count)];
      
      // console.log("ladder to stair:" + stairtype);

      box.setAttribute('class', 'stair gen');
      box = genStair(box, stairtype);
      
      cubearea.appendChild(box);
      laddertype = 0; // update laddertype = 0 不是ladder
      blank = 0

       // 上一個是樓梯 特定只有3,4樓提 下一個是cube
      }else if( stairmodeiscube[stairtype][mode] == 1 & fxrand() < boxstylemap[boxstyle][7] ){
        
        // console.log('stair to cube')
        eletype = parseInt(fxrand() * elements.length);
        box = genCube(box, eletype);
        cubearea.appendChild(box);
        stairtype = 0 
        laddertype = 0; // update laddertype = 0 不是ladder
        blank = 0

      // 上一個是樓梯 下一個是樓梯
    }else if( stairmodestair[stairtype][mode] != -1 & fxrand() < 1 ){
 
      stairtype = stairmodestair[stairtype][mode];
      // console.log("stair to stair:" + stairtype);
      box.setAttribute('class', 'stair gen');
      box = genStair(box, stairtype);
      
      cubearea.appendChild(box);
      laddertype = 0; // update laddertype = 0 不是ladder
      blank = 0
    
   
      // 上一個是樓梯 下一個是梯子
    }else if( stairmodeladder[stairtype][mode] != -1 & fxrand() < boxstylemap[boxstyle][1]){
      
      const ladderlist = stairmodeladder[stairtype][mode];
 
      const count = ladderlist.length;
      laddertype = ladderlist[parseInt(fxrand()*count)];
      // console.log("stair to ladder:" + laddertype);
      box = genLadder(box, laddertype);
      box.setAttribute('class', 'ladder gen');

      cubearea.appendChild(box);
      stairtype = 0; // update laddertype = 0 不是ladder
      blank = 0
    
      // 如果是 stairgroup 可以樓梯
    }else if ( modestair[mode] != -1 & fxrand() < boxstylemap[boxstyle][2]) {
      
      const stairlist = modestair[mode]
      const count = stairlist.length;
      stairtype = stairlist[parseInt(fxrand()*count)];

      // console.log(stairtype);
      box.setAttribute('class', 'stair gen');
      box = genStair(box, stairtype);
      cubearea.appendChild(box);
      laddertype = 0; // update laddertype = 0 不是ladder
      blank = 0;
          
    //blank
      } else if(laddertype == 0 & stairtype == 0 & blank < 2 &  fxrand() <  boxstylemap[boxstyle][3]){
      
      // console.log("blank")
      if(fxrand()<0.7){
        blank = 1; //下一個可能也是blank
      }else{
        blank = 2; //下一個部會是blank
      }
    // console.log(blank)
    // 如果不是C or Bsq 梯子 可以選擇柱子
    }else if (laddertype != 5 & laddertype != 4 & fxrand() <  boxstylemap[boxstyle][4]) {
        talltype = fxrand() < 0.4 ? 0 : 1;
        box.setAttribute('class', 'tall gen');
        box = genTall(box, talltype);
        stairtype = 0; //update stairtype 
        cubearea.appendChild(box);
        laddertype = 0; // update laddertype = 0 不是ladder
        blank = 0;
    

 
    // door 
    }else if (fxrand() < 0.3) {
        let doorface = ["A", "B", "C"][parseInt(fxrand() * 3)];
        let doortype = parseInt(fxrand() * 4);
        box.setAttribute('class', 'door gen');
        box = genDoor(box, doorface, doortype);
        stairtype = 0 // update stairtype 
        cubearea.appendChild(box);
        laddertype = 0; // update laddertype = 0 不是ladder
        blank = 0;
      } else {
        eletype = parseInt(fxrand() * elements.length);
        box = genCube(box, eletype);
        stairtype = 0;
        cubearea.appendChild(box);
        laddertype = 0; // update laddertype = 0 不是ladder
        blank = 0;

      }
      
    
  }

}

// 決定下一個盒子的移動位置, 有8種移動位置
function genPostion(laddertype, talltype, stairtype) {

  laddertypegroupmode = 0;
  stairtypegroupmode = 0;

  if (talltype === 1) {
    mode = 1;
  }
  else if (mode === 0) {   // 初始化
    mode = parseInt(fxrand() * 7) + 1 
    // if (fxrand()<0.5){ mode=4} else{mode = 8}
  }
  else if (laddertype != 0) {  // 如果前一個是梯子

   if(fxrand()<0.8){
    mode = laddertypemode[laddertype];
   }else{
    mode = [2,3,5][parseInt(fxrand()*3)]; 
   }
  }
  else if (stairtype != 0) {  // 如果前一個是stair
    // 2,3,4,5,6,7
    if(fxrand()<0.7){
    mode = [5,6,7][parseInt(fxrand()*3)];
    }else{
      mode = [2,3][parseInt(fxrand()*2)];
    }
    // console.log("mode: "+ mode + " stairtype: "+ stairtype);
    // console.log(stairmodeladder[stairtype][mode])
  }

  else if (mode === 1) { // 如果是前一個是mode1
    modelist = [1, 2, 3, 4, 8];
    mode = modelist[parseInt(fxrand() * 5)]
  }
  else if (mode === 2) {
    modelist = [1, 2, 4, 6];
    mode = modelist[parseInt(fxrand() * 4)]
  }
  else if (mode === 3) {
    modelist = [1, 3, 7, 8];
    mode = modelist[parseInt(fxrand() * 4)]
  }
  else if (mode === 4) {
    modelist = [1, 2, 4, 5, 6];
    mode = modelist[parseInt(fxrand() * 5)]
  }
  else if (mode === 5) {
    modelist = [4, 5, 6, 7, 8];
    mode = modelist[parseInt(fxrand() * 5)]
  }
  else if (mode === 6) {
    modelist = [2, 4, 5, 6];
    mode = modelist[parseInt(fxrand() * 4)]
  }
  else if (mode === 7) {
    modelist = [3, 5, 7, 8];
    mode = modelist[parseInt(fxrand() * 4)]
  }
  else if (mode === 8) {
    modelist = [1, 3, 5, 7, 8];
    mode = modelist[parseInt(fxrand() * 5)]
  }
  if(facetype =='6'){
    mode = 4
   }

  if (mode === 1) {
    laddertypegroupmode = 3;
  } else if (mode === 6) {
    laddertypegroupmode = 2;
    stairtypegroupmode = 1;
  } else if (mode === 7) {
    laddertypegroupmode = 1;
    stairtypegroupmode = 2;
  } else {
  }
 

}

function genPoint(mode, newx,newy){

  if (mode === 1) {
    newy = newy - ddy * 2;
  } else if (mode === 2) {
    newx = newx + ddx;
    newy = newy - ddy;
  } else if (mode === 3) {
    newx = newx - ddx;
    newy = newy - ddy;
  } else if (mode === 4) {
    newx = newx + ddx * 2;
  } else if (mode === 5) {
    newy = newy + ddy * 2;
  } else if (mode === 6) {
    newx = newx + ddx;
    newy = newy + ddy;
  } else if (mode === 7) {
    newx = newx - ddx;
    newy = newy + ddy;

  } else if (mode === 8) {
    newx = newx - ddx * 2;
  } else {

  }
  return  [newx , newy]
}

//判斷是否已經存在同樣位置的Cube
// function isExist(dx, dy) {
//   for (let j = boxcount; j > 0; j--) {
//     if (dx === corxh[j][0] & dy === corxh[j][1]) {
//       return true;
//     }
//   }
//   return false;
// }

//判斷是否已經存在同樣位置的Cube
function isExist(dx, dy) {
  for (let i = 0; i< cor.length; i++) {
    if (dx === cor[i][0] & dy === cor[i][1]) {
      return true;
    }
  }
  return false;
}


//addShootingStar
function addShootingstuff() {
  let start = parseInt(fxrand() * 3) + 1;
  let dynamicStyles = null;
  let shootstartcss = [];
  let isramdomdeg = false;
  let rk = svg.querySelector('.shootingarea');

  let lin = svgsky.querySelector(`.${xs[xstype]}`);

  if (xs[xstype] === "human") {
    addPpl();
  }
  if (xs[xstype] === "cube") {
    isramdomdeg = true;
  }
  if (xs[xstype] === "hamster") {
    isramdomdeg = true;
  }
  if (xs[xstype] === "why") {
    addPpl();
  }
  if (xs[xstype] === "rabbit") {
    addPpl();
  }
  if (xs[xstype] === "feelgood") {
    start = parseInt(fxrand() * 7) + 4;
  }
  if (xs[xstype] === "humid") {
    start = parseInt(fxrand() * 4) + 4;
    // if(fxrand()>0.95){
    //   start =  parseInt(fxrand() * 20) + 30;
    // }
  }
  if (xs[xstype] === "enlighten") {
    start = parseInt(fxrand() * 4) + 2;
    // if(fxrand()>0.95){
    //   start =  parseInt(fxrand() * 20) + 30;
    // }
  }
  if (xs[xstype] === "hair") {
    start = 8;
    addPpl();
  }

  if(facetype == 7){
    start =  parseInt(fxrand() * 4) + 8;

    width = genwidth
    mwidth = minwidth

  }else{
    width = 900
    mwidth = -60
  }
  // addPpl();
  
  // duplicate一份最後產生的svg
  svg4gif = svg.cloneNode(true);
  let rk4gif = svg4gif.querySelector('.shootingarea');

   for (let i = 0; i < start; i++) {
    let topfrom, topto, leftfrom, leftto
    let sh = lin.cloneNode(true);
    sh.setAttribute('class', `s s-${i} xs`);
    rk.appendChild(sh);

    let dur = parseInt(fxrand() * 20) + 15;
    // if (fxrand() < 0.5) {
    topfrom = parseInt(fxrand() * height);
    topto = parseInt(fxrand() * height);
    if (fxrand() < 0.5) {
      leftfrom = mwidth; leftto = width + 60;
    } else {
      leftfrom = width + 60; leftto = mwidth;
    }

    let deg = parseInt(Math.atan((topto - topfrom) / (leftto - leftfrom)) / Math.PI * 180)
    deg = leftfrom > leftto ? deg + 180 : deg;

    let sthdeg = parseInt(fxrand()*360);

    if(isramdomdeg){
      const keyframes = `
      .s-${i}{
        animation-duration:${dur}s;
        animation-name:particleAnimation${i};}  
      @keyframes particleAnimation${i}{
        from { transform: translate(${leftfrom}px,${topfrom}px) rotate(${sthdeg}deg);}
        to { transform: translate(${leftto}px,${topto}px) rotate(${sthdeg}deg);}
      }`;
      
      shootstartcss.push(keyframes);
    }
    else{
    const keyframes = `
    .s-${i}{
      animation-duration:${dur}s;
      animation-name:particleAnimation${i};
      transform: rotate(${deg}deg);}
    @keyframes particleAnimation${i}{
      from { transform: translate(${leftfrom}px,${topfrom}px) rotate(${deg}deg);}
      to { transform: translate(${leftto}px,${topto}px) rotate(${deg}deg);}
    }`;
    
    shootstartcss.push(keyframes);
    } 
  }
  //add to svg4fig
  for (let i = 0; i < start; i++) {
    let sh = lin.cloneNode(true);

    if(xs[xstype] =="hair" | xs[xstype] == "feelgood"){
      sh.querySelector('animateTransform').remove();
    }

    let g = document.createElementNS(svgNS,'g')
    g.setAttribute('class', `shooting`);
    cx = width/5 * fxrand()* 3 + 1
    cy = height/5 * fxrand()*3 + 1
    sh.setAttribute('transform', `translate(${cx} ${cy})`)
    g.appendChild(sh);
    rk4gif.appendChild(g);
  }

  dynamicStyles = document.createElement('style');
  dynamicStyles.innerHTML = shootstartcss.join('');
  svg.appendChild(dynamicStyles);
}


//add ppl
function addPpl() {
 
  if(facetype =='6'){
    dx = ddx * 2 * (parseInt(fxrand()*6)+8) - 415.68 + ddx
    dy = 60 * ((parseInt(fxrand()*6)+1) * 2 + 1 ) -22
  
  }
  let newbodypartppl
  // newbodypartppl = eleppl[elementsnameppl[parseInt(fxrand() * 1)]].cloneNode(true);

  const standpatel = xs[xstype]
  newbodypartppl = svgbox.querySelector(`.${standpatel}`).cloneNode(true);
  newbodypartppl.setAttribute('transform', `translate(${dx},${dy})`);
  newbodypartppl.setAttribute('class', 'gen xs');
  cubearea.appendChild(newbodypartppl);

}


//cloud 
function addcloud() {

  // console.log('cloudtype:'+ cloudtype)
  let cloudarea = svg.querySelector('.cloudarea');
  const cloud = document.querySelector(`.cloud${cloudtype}`).cloneNode(true);
  cloud.querySelectorAll('path').forEach(e => {
    e.setAttribute('transform', `translate(${winowinnerwidth / 4 - (fxrand() * winowinnerwidth / 2)} 0)`)
  });
  cloudarea.appendChild(cloud);

}


// interactive ------------------------------------------


const  mouseParallax = (id, mouseX,  speed) => {
  var obj = svg.querySelector(id);
  if (obj != null) {
    var movex = (0 - (mouseX - winowinnerwidth/2 ) / winowinnerwidth) * speed * 2
    obj.setAttribute('transform', `translate(${movex} ${0})`);
  }
  // console.log(mouseX)
}

function mouseMove(event) {
  event = event || window.event;
  var x = event.clientX
  var y = event.clientY
  // mouseParallax ( '#layer1',x, y, 80 );
  // mouseParallax('#layer9', x,  -40);
  mouseParallax('#layer4', x,  150);
  mouseParallax('#layer3', x,  100);
  mouseParallax('#layer2', x,  65);
  mouseParallax('#layer1', x,  20);

}

function addHover() {
  svg.querySelectorAll(".gen").forEach(element => {
    element.addEventListener('mouseenter', function () {
      element.querySelectorAll('.hide').forEach(e => {
        e.setAttribute('visibility', 'visible');
      });
      element.querySelectorAll('.show').forEach(e => {
        e.setAttribute('visibility', 'hidden');
      });
    });
  });
  svg.querySelectorAll(".gen").forEach(element => {
    element.addEventListener('mouseleave', function () {
      element.querySelectorAll('.hide').forEach(e => {
        e.setAttribute('visibility', 'hidden');
      });
      element.querySelectorAll('.show').forEach(e => {
        e.setAttribute('visibility', 'visible');
      });
    });
  });
}


function addHoverMo() {
  svg.querySelectorAll(".gen").forEach(element => {
    element.addEventListener('touchstart', function () {
      element.querySelectorAll('.hide').forEach(e => {
        e.setAttribute('visibility', 'visible');
      });
      element.querySelectorAll('.show').forEach(e => {
        e.setAttribute('visibility', 'hidden');
      });
    });
  });
  svg.querySelectorAll(".gen").forEach(element => {
    element.addEventListener('touchend', function () {
      element.querySelectorAll('.hide').forEach(e => {
        e.setAttribute('visibility', 'hidden');
      });
      element.querySelectorAll('.show').forEach(e => {
        e.setAttribute('visibility', 'visible');
      });
    });
  });
}

function autoflip() {
  let i = 0;
  svg.querySelectorAll(".gen").forEach(element => {

    element.querySelectorAll('.hide').forEach(e => {
      setTimeout(function () { e.setAttribute('visibility', 'visible') }, 500 + i * 30)
      setTimeout(function () { e.setAttribute('visibility', 'hidden') }, 500 + i * 60)
    });
    element.querySelectorAll('.show').forEach(e => {
      setTimeout(function () { e.setAttribute('visibility', 'hidden') }, 500 + i * 30)
      setTimeout(function () { e.setAttribute('visibility', 'visible') }, 500 + i * 60)
    });
    i++;
  });
}

function whyanimation(event) {

  const why = svg.querySelector('.whyexplore');
  why.querySelectorAll('.w1').forEach(e => {
    mx = Math.random() < 0.5 ? Math.random() * 20 : Math.random() * -20;
    my = Math.random() < 0.5 ? Math.random() * 20 : Math.random() * -20;
    gsap.to(e, { x: mx, y: my, duration: 0.5 })
  })

}

function whyanimationreset() {
  const why = svg.querySelector('.whyexplore');
  why.querySelectorAll('.w1').forEach(e => {
    gsap.to(e, { x: 0, y: 0, ease: 'elastic.out(1.2, 0.4)', duration: 0.7 })
  })
}


function addanimation() {

  //hover flip
  addHover();
  addHoverMo();

  //xs click autoflip
  svg.querySelectorAll('.xs').forEach(e => {
    e.addEventListener('click', autoflip)
    });

  //add cloud mousemove  
  svg.addEventListener('mousemove', mouseMove);

  //why explore
  const why = svg.querySelector('.whyexplore');
  if (why != null) {
    
    why.addEventListener('mousemove', whyanimation);
    why.addEventListener('mouseleave', whyanimationreset);

    // why.addEventListener('touchmove', whyanimation);
    // why.addEventListener('touchcancel', whyanimationreset);

  }
}

// onload animation ------------------------------------------

let startcount = 0

function starcount() {
  startcount++;
}

function starcolorchange(){
   
  layer1 = svg.querySelector('#layer1')
  layer2 = svg.querySelector('#layer2')
  layer3 = svg.querySelector('#layer3')
  layer4 = svg.querySelector('#layer4')
  layer9 = svg.querySelector('#layer9')

  if (layer1 != null) {
  gsap.to(layer1, {x:`${Math.sin(startcount/240*Math.PI)*20}`, ease: 'none'});
  }
  if (layer2 != null) {
  gsap.to(layer2, {x:`${Math.sin(startcount/240*Math.PI)*65}`, ease: 'none'});
  }
  if (layer3 != null) {
  gsap.to(layer3, {x:`${Math.sin(startcount/240*Math.PI)*100}`, ease: 'none'});
  }
  if (layer4 != null) {
  gsap.to(layer4, {x:`${Math.sin(startcount/240*Math.PI)*150}`, ease: 'none'});
  }
  if (layer9 != null) {
  gsap.to(layer9, {x:`${Math.sin(startcount/240*Math.PI)*-40}`, ease: 'none'});
  }
 

}

function runload(){
starcount();
starcolorchange();
// console.log(startcount)
requestAnimationFrame(runload);
}
// runloconsolead()



// ------------------------------------------



// svg.querySelectorAll('.fly').forEach(e => {
//   e.addEventListener('mouseenter', function(event){
//     console.log(event.currentTarget)
//      gsap.set(event.currentTarget, { x: 20 , y: 20  , ease: 'elastic.out(1.2, 0.4)', duration: 0.7 })
//   });
//   })
// ;


// el.addEventListener("touchstart", handleStart, false);
// el.addEventListener("touchend", handleEnd, false);
// el.addEventListener("touchcancel", handleCancel, false);
// el.addEventListener("touchmove", handleMove, false);


// function feelgoodanimation(r) {

//   const feelcircle = svg.querySelector('.feelcircle');
//   const circle1 = feelcircle.querySelector('.hFG1');

//   const rr = 50 + (r * r * 15);
//   for (let i = 0; i < 5; i++) {
//     let circle = circle1.cloneNode(true);

//     circle.setAttribute('class', `hFG${i + 1}`);
//     // console.log(circle)
//     gsap.to(circle, { attr: { 'r': rr + i * 4.5 }, duration: 1 });
//     feelcircle.appendChild(circle);
//     setTimeout(function () { circle.remove(); }, 500);
//   }

// }


// let mousecounter = 0
// let istouch = false
// function starttouch() {
//   istouch = true
// }
// function endtouch() {
//   istouch = false
//   mousecounter = 0

// }
// function rundtoudch() {

//   if (istouch) {
//     feelgoodanimation(mousecounter % 20);

//   }
//   mousecounter++;
//   requestAnimationFrame(rundtoudch);
// }

// rundtoudch();

// function getRandomColor() {
//   return 'rgb(' +
//       parseInt(Math.random()*255) + ', ' +
//       parseInt(Math.random()*255) + ',' +
//       parseInt(Math.random()*255)  + ')';
// }


// function starcolorchange(){
   
//   svg.querySelectorAll('.star').forEach(e =>{
//     gsap.to(e, {
//           attr: {
//             'fill': getRandomColor()
//         },
//         ease: 'none',
//         onComplete: starcolorchange
//     });
//   })

// }
