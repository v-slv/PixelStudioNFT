function PixelBoard(canvasId, config) {
    this.boardWidth = 32;
    this.boardHeight = 32;
    this.canvas = document.getElementById(canvasId);
    console.log('__PixeBoard init on', this.canvas, canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvasLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
    this.canvasTop = this.canvas.offsetTop + this.canvas.clientTop;
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.virtualWidth = this.canvasWidth / this.boardWidth;
    this.virtualHeight = this.canvasHeight / this.boardHeight;

    this.itemIndex = 0;
    this.items = [];

    this.tools = [new Tool('pen', {color: 'black'}, (pixel, context) => {
        pixel.c = context.color;
    })];
    this.currentTool = 0;

    this.getWorkingMatrix = () => {
        return this.items[this.currentItem].getWorkingMatrix();
    }

    this.addItem = () => {
        this.items.push(new Item(this.itemIndex++, this.boardWidth, this.boardHeight, this.virtualWidth, this.virtualHeight, this.ctx));
    }
    this.currentItem = 0;
    this.addItem();

    this.render = () => {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].varitations[this.items[i].selectedVariation].render();
        }
    }

    const RayCast = (x, y, virtualPixelMatrix) => {
        let VirtualPixel = null;
        for (let i = 0; i < virtualPixelMatrix.length; i++) {
            for (let j = 0; j < virtualPixelMatrix[i].length; j++) {
                if (y >= virtualPixelMatrix[i][j].y && y <= virtualPixelMatrix[i][j].y + virtualPixelMatrix[i][j].h
                    && x >= virtualPixelMatrix[i][j].x && x <= virtualPixelMatrix[i][j].x + virtualPixelMatrix[i][j].w) {
                    VirtualPixel = virtualPixelMatrix[i][j];
                }
            }
        }
        return VirtualPixel;
    }

    this.onToolUse = function (event) {
        let { x, y } = getTransformedPoint(event.x, event.y, this.ctx);
        let virtualPixelMatrix = this.getWorkingMatrix();
        let hitPixel = RayCast(x - this.canvasLeft, y - this.canvasTop, virtualPixelMatrix);
        if (hitPixel) {
            this.tools[this.currentTool].use(hitPixel);
        }
        this.render();
    }

    this.clear = () => {
        this.items = [];
        this.addItem();
        this.currentItem = 0;
        this.render();
    }

    // Add event
    this.canvas.addEventListener('click', this.onToolUse.bind(this), false);

}
PixelBoard.prototype.DEF = {
    defaultBG: 'blue'
}

function Item(name, w, h, vw, vh, ctx) {
    this.name = name;
    this.w = w;
    this.h = h;
    this.vw = vw;
    this.vh = vh;
    this.ctx = ctx;
    this.varitations = [new ItemVariation(w, h, vw, vh, ctx)];
    this.selectedVariation = 0;

    this.getWorkingMatrix = () => {
        return this.varitations[this.selectedVariation].virtualPixelMatrix;
    }
}

// pixel width, pixel height, virtual pixel width, virtual pixel height, canvas context
function ItemVariation(w, h, vw, vh, ctx) {
    this.name = Date.now();
    this.w = w;
    this.h = h;
    this.vw = vw;
    this.vh = vh;
    this.ctx = ctx;
    this.virtualPixelMatrix = Array(h).fill();
    for (let i = 0; i < h; i++) {
        this.virtualPixelMatrix[i] = Array(w).fill();
        for (let j = 0; j < w; j++) {
            this.virtualPixelMatrix[i][j] = new Pixel(j * vw, i * vh, vw, vh, 'white');
        }
    }

    this.render = () => {
        for (let i = 0; i < this.vh; i++) {
            for (let j = 0; j < this.vw; j++) {
                this.ctx.fillStyle = this.virtualPixelMatrix[i][j].c;
                this.ctx.fillRect(...this.virtualPixelMatrix[i][j].getRectangleProps());
            }
        }
    }
}

function Pixel(x, y, w, h, c, i, j) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.i = i;
    this.j = j;
    this.getRectangleProps = () => {
        return [this.x, this.y, this.w, this.h]
    }
}

function Tool(name, workingConfig, action) {
    this.name = name;
    this.context = workingConfig;
    this.action = action;
    this.use = (pixel) => {
        this.action(pixel, this.context)
    };
}

// Utils
function getTransformedPoint(x, y, context) {
    const transform = context.getTransform();
    const transformedX = x - transform.e;
    const transformedY = y - transform.f;
    return { x: transformedX, y: transformedY };
}