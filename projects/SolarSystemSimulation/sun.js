class Sun{
    constructor(x, y, mass, density){
        this.pos = createVector(x,y);
        this.mass = mass;
        this.density = density;
        this.r = sqrt( this.mass / (PI*this.density) );
        this.name = this.makeName();
    }
    
    //UPDATE METHOD
    update(){
        // 
    }

    //SHOW METHOD
    show(){
        noStroke();
        fill(180,50,50);
        ellipse(this.pos.x, this.pos.y, 2*this.r);
    }

    //COLLIDE METHOD
    collide(rock){
        this.mass += rock.mass;
        this.r = sqrt( this.mass / (PI*this.density) );
        rock.gone = true;
    }


    makeName(){
        var names = ["bob", "alice", "katy"];
        return (random(names));
    }
}