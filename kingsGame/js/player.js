class Player extends Sprite {
    constructor({CollBlocks = [] , imageSrc, frameRate, animations, loop  }) {

       super({imageSrc, frameRate, animations, loop })
        this.pos = {
            x: 200,
            y: 200,
        }

        this.velocity = {
            x: 0,
            y: 0
        }

       this.sides = {
            bottom: this.pos.y + this.height
        }
        this.gravity = 1

        this.CollBlocks = CollBlocks
     
    }


    update(){
        //c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        //c.fillRect(this.pos.x, this.pos.y, this.width, this.height)
 this.pos.x += this.velocity.x
this.updateHitbox()
this.checkX()


 this.applayGravity()


this.updateHitbox()

/*c.fillRect(this.hitbox.pos.x, this.hitbox.pos.y, this.hitbox.width, this.hitbox.height)*/

this.checkY()
} 

handeInput(){

      if(this.prevent) return
     this.velocity.x = 0
    if(key.e.pressed){
       this.switchSprite('runRight') 
        this.velocity.x = 5
        this.lastDD = 'right'
    }
    else if(key.r.pressed){
        this.switchSprite('runLeft')
        this.velocity.x = -5
        this.lastDD = 'left'
    }
    else {
        if(this.lastDD === 'left'){
            this.switchSprite('idleLeft')
        }
        else this.switchSprite('idleRight')
    }
}

switchSprite(name) {
    if(this.image === this.animations[name].image ) return
    this.currentFrame = 0
this.image = this.animations[name].image
this.frameRate = this.animations[name].frameRate
this.buffer = this.animations[name].buffer
this.loop = this.animations[name].loop
this.currentAnimate = this.animations[name]
}

updateHitbox(){
 this.hitbox = {
   pos: {
    x: this.pos.x + 58 ,
    y: this.pos.y + 34
   },
   width: 50,
   height: 54
}   
}

    
  checkX() {
    for(let i = 0; i < this.CollBlocks.length; i++ ){
    const CollBlock = this.CollBlocks[i]

    //if a coll exist
    if(this.hitbox.pos.x <= CollBlock.pos.x + CollBlock.width &&
        this.hitbox.pos.x + this.hitbox.width >= CollBlock.pos.x &&
        this.hitbox.pos.y + this.hitbox.height >= CollBlock.pos.y &&
        this.hitbox.pos.y <= CollBlock.pos.y + CollBlock.height
     ){
        //coll on x going to the left
       if(this.velocity.x < 0){
        const offset = this.hitbox.pos.x - this.pos.x
        this.pos.x = CollBlock.pos.x + CollBlock.width - offset + 0.01
        break
       } 
       if(this.velocity.x > 0){
        const offset = this.hitbox.pos.x - this.pos.x + this.hitbox.width
        this.pos.x = CollBlock.pos.x - offset - 0.01
        break
       }
    }
}
  }  
  applayGravity(){
     this.velocity.y += this.gravity 
     this.pos.y += this.velocity.y
  } 
  checkY(){
    for(let i = 0; i < this.CollBlocks.length; i++ ){
    const CollBlock = this.CollBlocks[i]

    //if a coll exist
    if(this.hitbox.pos.x <= CollBlock.pos.x + CollBlock.width &&
        this.hitbox.pos.x + this.hitbox.width >= CollBlock.pos.x &&
        this.hitbox.pos.y + this.hitbox.height >= CollBlock.pos.y &&
        this.hitbox.pos.y <= CollBlock.pos.y + CollBlock.height
     ){
        //coll on x going to the left
       if(this.velocity.y < 0){
        this.velocity.y = 0
        const offset = this.hitbox.pos.y - this.pos.y
        this.pos.y = CollBlock.pos.y + CollBlock.height - offset + 0.01
        break
       } 
       if(this.velocity.y > 0){
        this.velocity.y = 0

        const offset = 
           this.hitbox.pos.y - this.pos.y +this.hitbox.height

        this.pos.y = CollBlock.pos.y - offset - 0.01
        break
       }
    }
}
 

  }
 }