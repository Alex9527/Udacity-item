//生成随机速度
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


class Enemy {
    constructor(y,speed,exist=true,x= -10){
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    update(dt) {
        this.x += (this.speed * dt)
        if(this.x > 505) {
            this.x = -10;
            this.speed = (random(100,300))
        }
    };
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
    }

}


class Player {
    constructor(x=200,y=410) {
        this.player = 'images/char-boy.png'
        this.x = x;
        this.y = y;
    };
    update() {
        for(let i=0;i<allEnemies.length;i++) {
            let dx = this.x-allEnemies[i].x;
            let dy = this.y-allEnemies[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 60) {
                this.x = 200;
                this.y = 410;
            }   
            
        }

        if(this.y < 10) {
            alert('你成功了，点击确定，重新开始')
            this.x = 200;
            this.y = 410;
        }

    };
    render() {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);  
        
    }

    handleInput(allowedKeys) {
            switch(allowedKeys){
                case 'left':
                    if(this.x>=40) {this.x -= 100};
                break;
                case 'up':
                    this.y -= 84;
                break;
                case 'right':
                    if(this.x<=300) {this.x += 100};
                break;
                case 'down':
                   if(this.y<400) {this.y += 84};
                break;
            }
     }
}

let allEnemies =[new Enemy(60,random(100,300)),new Enemy(140,random(100,300)),new Enemy(220,random(100,300))];



let player = new Player();

 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    

});
