const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 //576

 let parseCol 
 let CollBlocks
 let background 
 let doors


 const player = new Player({

frameRate: 11,
imageSrc: 'idle.png',

    animations: {

        idleRight:{
            frameRate: 11,
            buffer : 2,
            loop: true,
            imageSrc: 'idle.png'
              
        },

        idleLeft:{
            frameRate: 11,
            buffer : 2,
            loop: true,
             imageSrc: 'idleLeft.png'
        },

           runRight :{
            frameRate: 8,
            buffer : 4,
            loop: true,
             imageSrc: 'runRight.png'
        },

        runLeft :{
            frameRate: 8,
            buffer : 4,
            loop: true,
            imageSrc: 'runLeft.png'
        },

          enterDoor :{
            frameRate: 8,
            buffer : 4,
            loop: false,
            imageSrc: 'enterDoor.png',

            onComplate: () => {
                console.log('complete ani')
               
              gsap.to(overlay, {
                opacity: 1,
                onComplete: ()=>{
                level++

                if(level === 4) level = 1
                levels[level].init()
                player.switchSprite('idleRight')
                player.prevent = false
                gsap.to(overlay, {
                    opacity: 0
                })
    }
              }) 
               
            }
        },
       
    }
 })


let level = 1
let levels = {

    
    1: {
        init: () => {
parseCol = colLevel1.parse2D()
CollBlocks =  parseCol.ObjectsFrom2D()
player.CollBlocks = CollBlocks

if (player.currentAnimate) player.currentAnimate.isActive = false

 background = new Sprite({
    pos: {
        x: 0,
        y:0
    },
    imageSrc: './back1.png'
})

 doors = [
    new Sprite({
        pos: {
            x:775,
            y: 270
        },  
         frameRate: 5,
        imageSrc: 'doorOpen.png',
        buffer:5,
        loop: false,
        autoplay: false
     
    })
 ]

        }
    },

     2: {
        init: () => {
parseCol = colLevel2.parse2D()
CollBlocks =  parseCol.ObjectsFrom2D()
player.CollBlocks = CollBlocks
player.pos.x = 95
player.pos.y = 140

if (player.currentAnimate) player.currentAnimate.isActive = false

 background = new Sprite({
    pos: {
        x: 0,
        y:0
    },
    imageSrc: './back2.png'
})

 doors = [
    new Sprite({
        pos: {
            x:770,
            y: 335
        },  
         frameRate: 5,
        imageSrc: 'doorOpen.png',
        buffer:5,
        loop: false,
        autoplay: false
     
    })
 ]

        }
    },

      3: {
        init: () => {
parseCol = colLevel3.parse2D()
CollBlocks =  parseCol.ObjectsFrom2D()
player.CollBlocks = CollBlocks
player.pos.x = 750
player.pos.y = 230 

if (player.currentAnimate) player.currentAnimate.isActive = false

 background = new Sprite({
    pos: {
        x: 0,
        y:0
    },
    imageSrc: './back3.png'
})

 doors = [
    new Sprite({
        pos: {
            x:177,
            y: 335
        },  
         frameRate: 5,
        imageSrc: 'doorOpen.png',
        buffer:5,
        loop: false,
        autoplay: false
     
    })
 ]

        }
    }
    
}





 

 const key = {
    w: {
       
        pressed: false 
    },
    e: {
        pressed: false
    },
    r: {
        pressed: false
    },
 }

 const overlay = {
    opacity : 0,
    
 }

 
 function animate(){
    window.requestAnimationFrame(animate)
   
    background.draw()

   /* CollBlocks.forEach((CollBlock)=> {
        CollBlock.draw()
    })*/

    doors.forEach((door) => {
        door.draw()
    })

    player.handeInput()
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width, canvas.height)
    c.restore()
 }

 levels[level].init()
 animate()



