class Point {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.leftPoint = null;
        this.rightPoint = null;

        this.held = false;
        this.endPoint = false;
    }

    //update method
    update() {
        if (this.held) {
            this.pos.x = mouseX;
            this.pos.y = mouseY;
        } else {
            this.vel.add(this.acc);
            this.vel.mult(dampeningConst);
            this.pos.add(this.vel);
        }
    }

    //draw method
    draw() {

        if (this.rightPoint != null) {
            let x1 = this.pos.x;
            let y1 = this.pos.y;
            let x2 = this.rightPoint.pos.x;
            let y2 = this.rightPoint.pos.y;

            stroke(lineColor);
            strokeWeight(8);
            line(x1, y1, x2, y2);
        }
        fill(50, 180);
        fill(50, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, 5);
    }

    //calculate forces method
    calculateForces() {
        let f1 = createVector(0, 0);
        let f2 = createVector(0, 0);

        if (this.leftPoint && this.rightPoint) {
            f1 = this.springForce(this.leftPoint);
            f2 = this.springForce(this.rightPoint);
        }

        this.acc = p5.Vector.add(f1, f2);
    }

    //calculates spring force between two points
    springForce(B) {
        return p5.Vector.sub(B.pos, this.pos).mult(springConst);
    }
}



