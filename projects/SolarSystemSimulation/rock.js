class Rock{
    constructor(pos, vel, mass, density){
        this.pos = pos;
        this.vel = vel;
        this.mass = mass;
        this.density = density;
        this.r = sqrt( this.mass / (PI*this.density) );
        this.acc = createVector(0,0);
        this.gone = false;
    }

    //UPDATE METHOD
    update(index){

        this.acc.x = 0;
        this.acc.y = 0;

        //gravity of rocks
        if (rockGravityEnabled){
            for (let rock of rocks){
                if ( (rock != this) && (!rock.gone) ){
                    var gRock = getGravitationalAcceleration(rock, this);
                    this.acc = p5.Vector.add(gRock, this.acc);
                }
            }
        }

        //force mechanic
        if (sun){
            var gSun = getGravitationalAcceleration(sun, this);
            this.acc = p5.Vector.add(gSun, this.acc);
        }
        this.vel = p5.Vector.add(this.acc, this.vel);
        this.pos = p5.Vector.add(this.vel, this.pos);


        //collision detection with other rocks
        for (let rock of rocks){
            if ( (rock != this) && (!rock.gone) ){
                let d = getDistance(this, rock);
                if (d < (this.r+rock.r) ){
                    if (this.mass > rock.mass){
                        this.collide(rock);
                    } else {
                        rock.collide(this);
                    }
                }
            }
        }

        //collision detection with sun
        if ( (sun) && (!this.gone) ){
                var distance = getDistance(this, sun);
            if ( distance < (this.r+sun.r) ){
                sun.collide(this);
            }
        }

        //collision detection with boundary
        if (boundary){
            if ( (this.pos.x-this.r) < -boundaryWidth){
                this.pos.x = -boundaryWidth+this.r;
                this.vel.x = -this.vel.x;
            } else if ( (this.pos.x+this.r) > boundaryWidth ){
                this.pos.x = boundaryWidth - this.r;
                this.vel.x = -this.vel.x;
            }

            if ( (this.pos.y-this.r) < -boundaryWidth){
                this.pos.y = -boundaryWidth+this.r;
                this.vel.y = -this.vel.y;
            } else if ( (this.pos.y+this.r) > boundaryWidth ){
                this.pos.y = boundaryWidth - this.r;
                this.vel.y = -this.vel.y;
            }
        }
    }

    //SHOW METHOD
    show(){
        noStroke();
        fill(sunColor);
        ellipse(this.pos.x, this.pos.y, 2*this.r);
    }


    //COLLIDE METHOD
    collide(rock){
        if (elastic){
            //
        } else {
            this.mass += rock.mass;
            this.r = sqrt( this.mass / (PI*this.density) );
            
            var v1 = createVector(this.vel.x, this.vel.y);
            var v2 = createVector(rock.vel.x, rock.vel.y);

            v1.mult(this.mass);
            v2.mult(rock.mass);

            var v3 = p5.Vector.add(v1, v2);
            v3.mult( 1/(this.mass+rock.mass) );

            this.vel = createVector(v3.x, v3.y);

            rock.gone = true;
        }
    }


    //GET KE METHOD
    getKineticEnergy(){
        let v = this.vel.mag();
        return (0.5*this.mass*v*v);
    }

    //GET PE METHOD
    getPotentialEnergy(thing){
        let d = getDistance(thing, this);
        return (-G*thing.mass*this.mass/d);
    }
}