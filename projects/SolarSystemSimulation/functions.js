//GET GRAVITY FUNCTION - gravity of a
function getGravitationalAcceleration(a,b){
    var acc = p5.Vector.sub(a.pos, b.pos);
    var r = acc.mag();
    var g = G * a.mass / ( r*r );
    acc.normalize().mult(g);
    return acc;
}


//GET ORBITAL VELOCITY FUNCTION
function getOrbitalVelocity(object, pos){
    var vect = p5.Vector.sub(object.pos, pos);
    var r = vect.mag();
    var g = G * object.mass / ( r*r );
    var speed = sqrt( g * r );

    vect.normalize().mult(speed);
    vect.rotate(PI/2);
    return vect;
}