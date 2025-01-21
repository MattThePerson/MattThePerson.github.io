function Pillar() {
  this.x = width;
  this.width = 70;
  this.gapWidth = height / 5;
  this.buffer = height / 8;
  this.gapStart = random(this.buffer, height - this.buffer - this.gapWidth);
  this.offScreen = false;
  this.flared = false;
  this.next = null;


  //update pillar
  this.update = function() {
    this.x -= pillarSpeed;
    if (this.next != null) {
      this.next.update();
    }
  }


  //show pillar
  this.show = function() {
    if (this.flared) {
      fill(220, 50, 50);
    } else {
      fill(20);
    }
    rect(this.x, 0, this.width, height - this.gapWidth - this.gapStart);
    rect(this.x, height - this.gapStart, this.width, this.gapStart);

    if (this.next != null) {
      this.next.show();
    }
  }

  //make next pillar
  this.newPillar = function() {
    if (this.next == null) {
      this.next = new Pillar();
    } else {
      this.next.newPillar();
    }
  }

  // allow pillars to be removed from memory
  this.removePillars = function(){

    if (this.next == null) {
      return null;
    } else {
      this.next = this.next.removePillars();
      return this.next;
    }
  }
}