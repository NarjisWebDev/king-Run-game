window.addEventListener('keydown', (event) => {
  if (player.prevernt) return
    switch (event.key){
        case 'w':
            for(let i = 0; i <= doors.length; i++ ){
                const door = doors[i]
                if(!door || !door.pos ) continue

      if(
        player.hitbox.pos.x + player.hitbox.width <= door.pos.x + door.width &&
        player.hitbox.pos.x  >= door.pos.x &&
        player.hitbox.pos.y + player.hitbox.height >= door.pos.y &&
        player.hitbox.pos.y <= door.pos.y + door.height
         )
                {
                player.velocity.x = 0
                player.velocity.y = 0
                player.prevent = true    
                player.switchSprite('enterDoor')
                door.play()
                    return
                }
            }
            if(player.velocity.y === 0) player.velocity.y = -20

            break
        case 'e':
        key.e.pressed = true  
        break
        case 'r':
            key.r.pressed = true   
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key){
      
        case 'e':
        key.e.pressed = false  
        break
        case 'r':
            key.r.pressed = false  
    }
})