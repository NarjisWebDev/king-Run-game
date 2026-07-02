class Sprite {
    constructor({pos , imageSrc, frameRate = 1, animations, buffer = 2 , loop = 'true', autoplay = "true"}) {
        this.pos = pos
        this.image = new Image()
        this.image.onload = () => {
         this.loaded = true  
         this.width = this.image.width / this.frameRate
         this.height = this.image.height
        }
       this.image.src = imageSrc

        this.loaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.ellaps = 0
        this.buffer = buffer
        this.animations = animations
        this.loop = loop
        this.autoplay = autoplay
        this.currentAnimate

        if(this.animations) {
            for( let key in this.animations){
                const image = new Image()
                image.src = this.animations[key].imageSrc
                this.animations[key].image = image
            }
           
        }
    }

    draw() {
        if(!this.loaded) return
        const cropbox = {
            pos: {
                x: this.width * this.currentFrame ,
                y:0
            },
            width: this.width,
           height: this.height
        }
        c.drawImage(this.image
            , cropbox.pos.x
            , cropbox.pos.y
            , cropbox.width
            , cropbox.height
             ,this.pos.x
             , this.pos.y
             ,this.width
            ,this.height
        )
       this.updateFrame() 
    }


play(){
    this.autoplay = true
}

  updateFrame(){

    if(!this.autoplay) return

    this.ellaps ++

    if(this.ellaps % this.buffer === 0)
   { if(this.currentFrame < this.frameRate - 1) this.currentFrame++
   
    else if(this.loop) this.currentFrame =0
  }

  //if this.currentAni exisi and oncomplete as well then 
  //then inthe last frame (currentframe === framerate - 1) activate oncomolete 
 //**oncoleplete is in index  
   if(this.currentAnimate?.onComplate){
    if(this.currentFrame === this.frameRate - 1 && !this.currentAnimate.isActive){
         this.currentAnimate.onComplate() 
         //this so it happend only once 
         this.currentAnimate.isActive = true 
    }

   }
  }  

 

}
