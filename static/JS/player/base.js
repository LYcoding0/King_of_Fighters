import { AcGameObject } from "../ac_game_object/base.js";

export class Player extends AcGameObject {
    constructor(root, info) {
        super();
        this.root = root;

        this.id = info.id;
        this.x = info.x;   //初始xy的位置
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.vx = 0; //x,y轴速度
        this.vy = 0;

        this.gravity = 50;//重力

        this.direction = 1;//定义向右为正方向
        this.speedx = 400;//水平和竖直方向速度
        this.speedy = 1000;

        this.status = 3;//0:静止;1:向前;2:向后;3:跳跃;4:攻击;5:被打;6:死亡;
        this.animations = new Map();//存各种gif动作

        this.ctx = this.root.game_map.ctx;
        this.pressed_keys = this.root.game_map.controller.pressed_keys;

        this.frame_current_cnt = 0;

        this.hp = 100;//自定义血量
        this.$hp = this.root.$kof.find(`.kof-head-hp${this.id}>div`);
        this.$hp_inner = this.root.$kof.find(`.kof-head-hp${this.id}>div>div`);
    }

    start() {

    }

    update_move() {
        // if (this.status === 3) {//只有在空中才有重力
        //     this.vy += this.gravity;
        // }
        this.vy += this.gravity;

        this.x += this.vx * this.timedelta / 1000;
        this.y += this.vy * this.timedelta / 1000;

        if (this.y > 450) {
            this.y = 450;
            this.vy = 0;
            if (this.status === 3) {
                this.status = 0;
            }
        }

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.root.game_map.$canvas.width()) {
            this.x = this.root.game_map.$canvas.width() - this.width;
        }
    }

    update_control() {
        let w, a, d, space;
        if (this.id === 0) {
            w = this.pressed_keys.has('w');//has:是否存在某个值
            a = this.pressed_keys.has("a");
            d = this.pressed_keys.has("d");
            space = this.pressed_keys.has(" ");
        } else {
            w = this.pressed_keys.has("ArrowUp");
            a = this.pressed_keys.has("ArrowLeft");
            d = this.pressed_keys.has("ArrowRight");
            space = this.pressed_keys.has("Enter");
        }

        if (this.status === 0 || this.status === 1) {
            if (space) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (w) {//在静止或者向前过程中是否跳跃
                if (d) {//跳跃向前
                    this.vx = this.speedx;
                } else if (a) {//跳跃向后
                    this.vx = -this.speedx;
                } else {
                    this.vx = 0;
                }
                this.vy = -this.speedy;//跳跃得是y轴负半轴上的速度
                this.status = 3;
                this.frame_current_cnt = 0;
            } else if (d) {
                this.vx = this.speedx;
                this.status = 1;
            } else if (a) {
                this.vx = -this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_direction() {//角色对称
        if (this.status === 6) return;//倒地后无需再对称
        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) me.direction = 1;
            else me.direction = -1;
        }
    }

    update_attack() {//更新攻击状态
        if (this.status === 4 && this.frame_current_cnt === 18) {
            let me = this, you = this.root.players[1 - me.id];
            let r1, r2;
            if (this.direction === 1) {
                r1 = {//原点到挥拳的距离
                    x1: me.x + 120,
                    y1: me.y + 40,
                    x2: me.x + 120 + 100,
                    y2: me.y + 40 + 20,
                };
            } else {
                r1 = {
                    x1: me.x + me.width - 120 - 100,
                    y1: me.y + 40,
                    x2: me.x + me.width - 120 - 100 + 100,
                    y2: me.y + 40 + 20,
                };
            }
            r2 = {
                x1: you.x,
                y1: you.y,
                x2: you.x + you.width,
                y2: you.y + you.height,
            };

            if (this.is_collision(r1, r2)) {
                you.is_attack();
            }
        }
    }

    is_collision(r1, r2) {//判断两矩形是否有交集
        if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))
            return false;
        if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2, r2.y2))
            return false;
        return true;
    }

    is_attack() {//被攻击后更新状态
        if (this.status === 6) return;//倒地后无法在被攻击
        this.status = 5;
        this.frame_current_cnt = 0;

        this.hp = Math.max(this.hp - 10, 0);
        this.$hp.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 800)
        this.$hp_inner.animate({
            width: this.$hp.parent().width() * this.hp / 100
        }, 300)

        if (this.hp <= 0) {
            this.status = 6;
            this.frame_current_cnt = 0;
            this.vx = 0;
        }
    }

    update() {
        this.update_control();
        this.update_move();
        this.update_direction();
        this.update_attack();

        this.render();
    }

    render() {
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // if (this.direction === 1) {
        //     this.ctx.fillStyle = this.color;
        //     this.ctx.fillRect(this.x + 120, this.y + 40, 100, 20);
        // } else {
        //     this.ctx.fillStyle = this.color;
        //     this.ctx.fillRect(this.x + this.width - 120 - 100, this.y + 40, 100, 20);
        // }

        let status = this.status;
        if (this.status === 1 && this.direction * this.vx < 0) status = 2;

        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction === 1) {
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1);//x轴翻转y不变
                this.ctx.translate(-this.root.game_map.$canvas.width(), 0);//反转图象，使得玩家对称

                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.x - this.width, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

                this.ctx.restore();
            }
        }

        if (status === 4 || status === 5 || status === 6) {
            if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {
                if (status === 6) {
                    this.frame_current_cnt--;
                } else {
                    this.status = 0;
                }
            }
        }

        this.frame_current_cnt++;
    }
}