
// returns angle needed to intersept a moving object
function predictQuadratic( iPos, iVel, iAcc, bPos, bSpeed ){
  // requires p5.js Vectors
  //var initialDistanceVector = p5.Vector.sub(iPos, bPos);
  
  var Sb = bSpeed; //speed of bullet
  var Ux = iVel.x; //initial x velocity of player
  var Uy = iVel.y;
  var g = G;
  var xT = bPos.x; //x position of turret
  var yT = bPos.y; //y position of turret
  
  var ang;
  var m;
  var a,b,c;
  var xI1, xI2;
  var xI, yI;
  var timeB, timeP;
  
  var minTimeDiff = 1000000;
  var bestAng;
  
  //cycle through angles and find closest approach
  for (let i = 1; i < 180; i++){
    ang = i / 180 * PI;
    
    m = tan(ang);
    
    a = g / (2 * Ux*Ux);
    b = tan(ang) - (Uy / Ux);
    c = yT - tan(ang) * xT;
    
    xI1 = (-b + sqrt(b*b - 4*a*c) ) / (2*a);
    xI2 = (-b - sqrt(b*b - 4*a*c) ) / (2*a);
    
    if (ang > PI/2){
      xI = xI2;
    } else {
      xI = xI1;
    }
    yI = m * ( xI - xT ) + yT;
    
    timeB = (xI - xT) / (Sb*cos(ang)); //time for bullet to reach xI;
    timeP = xI / Ux; //time for player to reach xY;
    
    let timeDiff = abs(timeB - timeP);
    if (timeDiff < minTimeDiff){
      minTimeDiff = timeDiff;
      bestAng = ang;
    }
  }
  
  //console.log(a, b, c);
  //console.log("x solutions: " + xI1 + " " + xI2);
  //console.log("m: "+m);
  //console.log("xI, yI: " + xI + ". " + yI);
  
  //console.log("prediced timeB: " + timeB);
  //console.log("prediced timeP: " + timeP);
  
  
  return bestAng;
}
