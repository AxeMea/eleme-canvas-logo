(function(){
  var $DRAW_TYPE = {
    DRAW_LINE: 'DRAW_LINE',
    DRAW_FILL: 'DRAW_FILL'
  };

  // offset
  var offsetX = 155,
      offsetY = 30;

  // canvas地图
  var elemeMap = {
    rect: [
      // component: center blue rect background
      {
        rect: new Rect(97, 50, 90, 40),
        drawType: $DRAW_TYPE.DRAW_FILL
      }
    ],
    arc: [
      // component: two aside blue circle background
      {
        centerPoint: new Point(100, 70),
        drawType: $DRAW_TYPE.DRAW_FILL
      },
      {
        centerPoint: new Point(190, 70),
        drawType: $DRAW_TYPE.DRAW_FILL
      },
      // two line around the background
      // component: circle of left arc
      {
        centerPoint: new Point(98, 68),
        a: 21,
        b: 21,
        drawType: $DRAW_TYPE.DRAW_LINE,
        fromAngle: Math.PI,
        toAngle: Math.PI * 1.5
      },
      // component: circle of right arc
      {
        centerPoint: new Point(192, 72),
        a: 21,
        b: 21,
        drawType: $DRAW_TYPE.DRAW_LINE,
        fromAngle: 0,
        toAngle: Math.PI * 0.5
      },
      // component: white circle background
      {
        centerPoint: new Point(100, 70),
        a: 14,
        b: 14,
        fillStyle: 'white',
        drawType: $DRAW_TYPE.DRAW_FILL
      },
      // component: blue circle of logo 'e'
      {
        centerPoint: new Point(100, 70),
        a: 9,
        b: 9,
        lineWidth: 3,
        fromAngle: Math.PI * 0.3,
        toAngle:  Math.PI * 1.9,
        drawType: $DRAW_TYPE.DRAW_LINE
      },
      // component: blue point of logo 'e'
      {
        centerPoint: new Point(105, 72),
        a: 4,
        b: 4,
        fromAngle: 0,
        toAngle: Math.PI / 4,
        drawType: $DRAW_TYPE.DRAW_FILL
      }
    ],
    vertical: [
      // block-1
      new Radical(new Point(120, 55), 8),
      new Radical(new Point(126, 56), 6),
      // block-2
      new Radical(new Point(120, 65), 19),
      // block-3
      new Radical(new Point(134, 57), 27),
      new Radical(new Point(142, 55), 29),
      new Radical(new Point(148, 67), 10, null, 3),
      // block-4
      new Radical(new Point(163, 64), 20),
      // block-5
      new Radical(new Point(193, 76), 6)
    ],
    horizontal: [
      // block-1
      new Radical(new Point(120, 58), 6),
      // block-2
      new Radical(new Point(120, 82), 5),
      // block-3
      new Radical(new Point(130, 57), 8),
      new Radical(new Point(130, 63), 20),
      new Radical(new Point(130, 82), 4),
      new Radical(new Point(128, 72), 10, -Math.PI/30, 3),
      new Radical(new Point(140, 82.5), 10, null, 3),
      new Radical(new Point(138, 76), 10, null, 3),
      // block-4
      new Radical(new Point(146, 57), 25),
      new Radical(new Point(152, 82.5), 10, null, 3),
      // block-5
      new Radical(new Point(171, 82), 24)
    ],
    virgule: [
      // block-4
      new Radical(new Point(161, 67), 12),
      // block-5
      new Radical(new Point(170, 66), 12),
      new Radical(new Point(172, 84), 32)
    ],
    line: [
      // component: line of left arc
      {
        fromPoint: new Point(98, 47),
        toPoint: new Point(190, 47)
      },
      // component: line of right arc
      {
        fromPoint: new Point(100, 93),
        toPoint: new Point(192, 93)
      },
      // component: blue line of logo 'e'
      {
        fromPoint: new Point(97, 72),
        toPoint: new Point(109, 65),
        lineWidth: 3
      }
    ],
  };




  /**
   * position object
   * @param {[type]} x
   * @param {[type]} y
   */
  function Point(x, y) {
    if (arguments.length == 2) {
      this.x = x;
      this.y = y;
    } else {
      new Error('params is error');
    }
  }

  /**
   * rect object
   * @param {[type]} x      [description]
   * @param {[type]} y      [description]
   * @param {[type]} width  [description]
   * @param {[type]} height [description]
   */
  function Rect(x, y, width, height) {
    if (arguments.length == 4) {
      this.x = x;
      this.y = y;
      this.width = width,
      this.height = height;
    } else {
      new Error('params is error');
    }
  }

  /**
   * radical object
   * @param {[type]} point     [description]
   * @param {[type]} length    [description]
   * @param {[type]} angle     [description]
   * @param {[type]} lineWidth [description]
   */
  function Radical(point, length, angle, lineWidth) {
    if (arguments.length >= 2) {
      this.point = point || new Point(0, 0);
      this.length = length;
      this.angle = angle;
      this.lineWidth = lineWidth || 4;

      this.point.x = point.x;
      this.point.y = point.y;
    } else {
      new Error('params is error');
    }
  }

  /**
   * ElemeLogoDrawer object
   * @param {[type]} canvas [description]
   */
  function ElemeLogoDrawer(canvas) {
    this.$canvas = document.getElementById(canvas);
    this.$ctx = this.$canvas.getContext('2d');

    this.$DRAW_TYPE = {
      DRAW_LINE: 'DRAW_LINE',
      DRAW_FILL: 'DRAW_FILL'
    };

    this.$COLOR = {
      MAIN_COLOR: '#0087cf'
    };
  }

  ElemeLogoDrawer.prototype.draw = function() {
    var self = this;

    // vertical processor
    function verticalProcessor(radical) {
      // if origin exist
      if (radical) {
        var opts = {
          fromPoint: radical.point,
          toPoint: radical.angle ?
                   new Point(radical.point.x + Math.cos(radical.angle) * radical.length, radical.point.y + Math.sin(radical.angle) * radical.length)
                   : new Point(radical.point.x, radical.point.y + radical.length),
          strokeStyle: 'white',
          lineWidth: radical.lineWidth || 4
        };
        ElemeLogoDrawer.prototype._coreLineDraw.call(self, opts);
      }
    }

    // horizontal processor
    function horizontalProcessor(radical) {
      // if origin exist
      if (radical) {
        var opts = {
          fromPoint: radical.point,
          toPoint: radical.angle ?
                   new Point(radical.point.x + Math.cos(radical.angle) * radical.length, radical.point.y + Math.sin(radical.angle) * radical.length)
                   : new Point(radical.point.x + radical.length, radical.point.y),
          strokeStyle: 'white',
          lineWidth: radical.lineWidth || 4
        };
        ElemeLogoDrawer.prototype._coreLineDraw.call(self, opts);
      }
    }

    // virgule processor
    function virguleProcessor(radical) {
      if (radical) {
        ElemeLogoDrawer.prototype._coreParallelogramDraw.call(self, radical)
      }
    }

    // dispatch
    var processor = {
      line: function(args) { ElemeLogoDrawer.prototype._coreLineDraw.call(self, args); },
      rect: function(args) { ElemeLogoDrawer.prototype._coreRectDraw.call(self, args); },
      arc: function(args) { ElemeLogoDrawer.prototype._coreArcDraw.call(self, args); },
      vertical: verticalProcessor,
      horizontal: horizontalProcessor,
      virgule: virguleProcessor
    };

    for (var k in elemeMap) {
      for (var i = 0 ; i < elemeMap[k].length; i++) {
        processor[k](elemeMap[k][i])
      }
    }
  };

  ElemeLogoDrawer.prototype._coreArcDraw = function(obj) {
    var a = obj.a || 20,
        b = obj.b || 20,
        centerPoint = obj.centerPoint || new Point(0, 0)
        lineWidth = obj.lineWidth || 1,
        fromAngle = obj.fromAngle || 0,
        toAngle = obj.toAngle || 2 * Math.PI,
        drawType = obj.drawType || this.$DRAW_TYPE.DRAW_LINE,
        fillStyle = obj.fillStyle || this.$COLOR.MAIN_COLOR,
        strokeStyle = obj.strokeStyle || this.$COLOR.MAIN_COLOR;

    centerPoint = new Point(centerPoint.x + offsetX, centerPoint.y + offsetY)

    var r = a > b ? a : b;
    var ratioX = a / r;
    var ratioY = a / r;
    this.$ctx.scale(ratioX, ratioY);

    this.$ctx.moveTo((centerPoint.x + a) / ratioX , centerPoint.y / ratioY);

    this.$ctx.beginPath();
    this.$ctx.strokeStyle = strokeStyle;

    // draw line
    if (drawType === this.$DRAW_TYPE.DRAW_LINE) {
      this.$ctx.arc(centerPoint.x / ratioX, centerPoint.y / ratioY, r, fromAngle, toAngle);
      this.$ctx.lineWidth = lineWidth;
      this.$ctx.stroke();
    }
    // draw fill
    else if (drawType === this.$DRAW_TYPE.DRAW_FILL) {
      this.$ctx.lineTo(centerPoint.x + Math.cos(fromAngle), centerPoint.y + Math.sin(toAngle));
      this.$ctx.arc(centerPoint.x / ratioX, centerPoint.y / ratioY, r, fromAngle, toAngle);
      this.$ctx.fillStyle = fillStyle;
      this.$ctx.fill();
    }
    this.$ctx.closePath();
  };

  ElemeLogoDrawer.prototype._coreRectDraw = function(obj) {
    var rect = obj.rect || new Rect(0, 0, 20, 20),
        drawType = obj.drawType || this.$DRAW_TYPE.DRAW_LINE,
        strokeStyle = obj.strokeStyle || this.$COLOR.MAIN_COLOR,
        fillStyle = obj.fillStyle || this.$COLOR.MAIN_COLOR;

    rect = new Rect(rect.x + offsetX, rect.y + offsetY, rect.width, rect.height);

    this.$ctx.beginPath();

    if (drawType === this.$DRAW_TYPE.DRAW_LINE) {
      this.$ctx.rect(rect.x, rect.y, rect.width, rect.height);
      this.$ctx.strokeStyle = strokeStyle;
      this.$ctx.stroke();
    } else if (drawType === this.$DRAW_TYPE.DRAW_FILL) {
      this.$ctx.rect(rect.x, rect.y, rect.width, rect.height);
      this.$ctx.fillStyle = fillStyle;
      this.$ctx.fill();
    }

    this.$ctx.closePath();
  };

  ElemeLogoDrawer.prototype._coreLineDraw = function(obj) {
    var fromPoint = obj.fromPoint || new Point(0, 0),
        toPoint = obj.toPoint || new Point(10, 10),
        lineWidth = obj.lineWidth || 1,
        strokeStyle = obj.strokeStyle || this.$COLOR.MAIN_COLOR;

    fromPoint = new Point(fromPoint.x + offsetX, fromPoint.y + offsetY);
    toPoint = new Point(toPoint.x + offsetX, toPoint.y + offsetY);

    this.$ctx.beginPath();

    this.$ctx.moveTo(fromPoint.x, fromPoint.y);

    this.$ctx.lineTo(toPoint.x, toPoint.y);
    this.$ctx.strokeStyle = strokeStyle;
    this.$ctx.lineWidth = lineWidth;

    this.$ctx.stroke();

    this.$ctx.closePath();

  };

  ElemeLogoDrawer.prototype._coreParallelogramDraw = function(obj) {
    var point = obj.point || new Point(0, 0),
        length = obj.length || 10,
        fillStyle = obj.fillStyle || 'white',
        width = 5;

    var angle = Math.PI / 3;

    // 0,1,2,3: 从左上角开始计算
    var squareX = [
      point.x + Math.cos(angle) * length + offsetX,
      point.x + width + Math.cos(angle) * length + offsetX,
      point.x + width + offsetX,
      point.x + offsetX
    ];

    var squareY = [
      point.y - Math.sin(angle) * length + offsetY,
      point.y - Math.sin(angle) * length + offsetY,
      point.y + offsetY,
      point.y + offsetY
    ];

    var squarePoints = [
      new Point(squareX[0], squareY[0]),
      new Point(squareX[1], squareY[1]),
      new Point(squareX[2], squareY[2]),
      new Point(squareX[3], squareY[3])
    ];

    this.$ctx.beginPath();
    this.$ctx.moveTo(squarePoints[0].x, squarePoints[0].y);
    for(var i = 0 ; i < squarePoints.length; i++) {
      this.$ctx.lineTo(squarePoints[i].x, squarePoints[i].y);
    }

    this.$ctx.fillStyle = fillStyle;
    this.$ctx.fill();
    this.$ctx.closePath();

  };
  var drawer = new ElemeLogoDrawer('eleme');
  drawer.draw();

})(window)
