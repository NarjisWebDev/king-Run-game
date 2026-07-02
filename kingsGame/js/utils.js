Array.prototype.parse2D = function() {
    const rows = []
    for(let i = 0; i < this.length; i +=16){

        rows.push(this.slice(i, i +16))
    }

    return rows
}

Array.prototype.ObjectsFrom2D  = function(){
    const objects = []
    
   this.forEach((row, y)=> {
    row.forEach((Symbol, x) => {
       if(Symbol === 292 || Symbol === 250){
        //push coll
        objects.push(new CollBlock({
            pos: {
                x: x * 64,
                y: y * 64
            }
        }))
       }
    } )
}) 
return objects
}  