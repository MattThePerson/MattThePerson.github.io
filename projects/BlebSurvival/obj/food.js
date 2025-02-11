class Food{
    constructor(x, y){
        if (x == undefined){
            x = random(foodSideLen, arenaWidth-foodSideLen);
            y = random(foodSideLen, arenaHeight-foodSideLen);
        }
        this.pos = createVector(x,y);
        this.mana = foodManaAmount;
        this.eaten = false;
        this.color = color(50, 150, 50, 230);

        this.ang = 0;// random(HALF_PI);
        this.sideLn = foodSideLen;
        var sideVect = p5.Vector.fromAngle(this.ang, this.sideLn);

        //make corners
        var c1 = createVector(this.pos.x, this.pos.y);
        var c2 = p5.Vector.add(c1, sideVect);
        sideVect.rotate(HALF_PI);
        var c3 = p5.Vector.add(c2, sideVect);
        sideVect.rotate(HALF_PI);
        var c4 = p5.Vector.add(c3, sideVect);
        this.corners = [c1, c2, c3, c4];

        //make vertices
        var v1 = new Vertex(c1, c2);
        var v2 = new Vertex(c2, c3);
        var v3 = new Vertex(c3, c4);
        var v4 = new Vertex(c4, c1);
        this.vertices = [v1, v2, v3, v4];
    }

    //SHOW METHOD
    show(){        
        strokeWeight(1);
        var col = this.color;
        stroke(col);
        fill(col);
        quad(this.corners[0].x, this.corners[0].y, this.corners[1].x, this.corners[1].y,
        this.corners[2].x, this.corners[2].y, this.corners[3].x, this.corners[3].y);
    }

    //UPDATE METHOD
    update(){
        //
    }
}