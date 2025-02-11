class Slider{
    //constructor( pos, limits, len, startValue, increments, orientation )
    constructor([x, y], [min, max], len, startValue, inc, orient){
        this.x = x;
        this.y = y;
        this.lowerValue = min;
        this.upperValue = max;
        this.len = len;
        this.sliderValue = startValue;
        if (inc == undefined){
            inc = null;
        }
        this.increment = inc;
        if (orient == undefined){
            orient = 0;
        }
        this.orientation = orient; //0 means flat, 1 means upright

        this.headX = this.x + (this.sliderValue-this.lowerValue) / (this.upperValue-this.lowerValue) * this.len;
        this.headY = this.y;
        this.held = false;
        this.headW = 10;
        this.headH = 18;
        this.color = 200;

    }

    //UPDATE METHOD
    update(x,y){
        if (this.held){ //held
            this.color = 120;
            this.headX = mouseX;
            if (this.headX < this.x){
                this.headX = this.x;
            } else if (this.headX > this.x+this.len){
                this.headX = this.x + this.len;
            }

        } else if (this.checkForHover(x,y)){ //mouse hovering
            this.color = 160;

        } else {
            this.color = 200;
        }
        this.sliderValue = (this.headX-this.x) * (this.upperValue-this.lowerValue) / this.len + this.lowerValue;
        if (this.increment){
            this.sliderValue = round(this.sliderValue/this.increment)*this.increment;
            this.headX = this.x + (this.sliderValue-this.lowerValue) / (this.upperValue-this.lowerValue) * this.len;
        }
    }

    //SHOW METHOD
    show(){
        //show line
        stroke(180);
        strokeWeight(3);
        line(this.x, this.y, this.x+this.len, this.y);

        //show head
        fill(this.color);
        stroke(60);
        strokeWeight(1);
        rect(this.headX-this.headW/2, this.headY-this.headH/2, this.headW, this.headH);
        
    }

    //CHECK FOR CLICK METHOD
    checkForClick(x,y){
        if (this.checkForHover(x,y)){
            this.held = true;
        }
    }

    //CHECK FOR HOVER METHOD
    checkForHover(x,y){
        if ( (x > this.headX-this.headW/2) && (x < this.headX+this.headW/2) &&
        (y > this.headY-this.headH/2) && (y < this.headY+this.headH/2) ){
            return true;
        }
        return false;
    }

    //VALUE METHOD
    value(){
        return this.sliderValue;
    }
}