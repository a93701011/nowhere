let svg =  document.querySelector("#svgall");
let svgNS = "http://www.w3.org/2000/svg" //svgbox.namespaceURI;
let winowinnerwidth = window.innerWidth;
let winowinnerHeight = window.innerHeight;

console.log(JSON.stringify(trait_list));

window.onload = function () {
  
  addanimation();
}

const  mouseParallax = (id, mouseX, mouseY, speed) => {
  var obj = svg.querySelector(id);
  if (obj != null) {
    var movex = (0 - (mouseX - winowinnerwidth/2 ) / winowinnerwidth) * speed * 2
    // var movey =  ( 0 - (mouseY - window.innerHeight / 2) / window.innerHeight ) * speed / 3
    obj.setAttribute('transform', `translate(${movex} ${0})`);
  }
}

function mouseMove(event) {
  event = event || window.event;
  var x = event.clientX
  var y = event.clientY
  // mouseParallax ( '#layer1',x, y, 80 );
  mouseParallax('#layer9', x, y, -40);
  mouseParallax('#layer4', x, y, 150);
  mouseParallax('#layer3', x, y, 100);
  mouseParallax('#layer2', x, y, 65);
  mouseParallax('#layer1', x, y, 20);

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
      // e.setAttribute('visibility', 'visible');
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

function whyanimation() {

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