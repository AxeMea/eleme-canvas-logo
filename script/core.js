(function(){
  // get action name when click items in operation panel
  var action = window.location.href.substr(window.location.href.indexOf('action=') + 7);

  // two draw type
  var $DRAW_TYPE = {
    DRAW_LINE: 'DRAW_LINE',
    DRAW_FILL: 'DRAW_FILL'
  };

  var leftFromAngle = '',
      rightFromAngle = '';

  // switch fromAngle for left circle line and right circle line
  if (action === 'animation') {
    leftFromAngle = Math.PI * 0.5;
    rightFromAngle = -Math.PI * 0.5;
  } else {
    leftFromAngle = Math.PI;
    rightFromAngle = 0;
  }

  // offset
  var offsetX = 155,
      offsetY = 30;

  // all elements
  var elemeQuene = [];

  // canvas map object
  var elemeMap = {
    rect: [
      // component: center blue rect background
      {
        rect: new Rect(97, 50, 90, 40),
        drawType: $DRAW_TYPE.DRAW_FILL,
        presentOffset: new PresentOffset(-250, 150)
      }
    ],
    arc: [
      // component: two aside blue circle background
      {
        centerPoint: new Point(100, 70),
        drawType: $DRAW_TYPE.DRAW_FILL,
        presentOffset: new PresentOffset(-230, 270)
      },
      {
        centerPoint: new Point(190, 70),
        drawType: $DRAW_TYPE.DRAW_FILL,
        presentOffset: new PresentOffset(-200, 270)
      },
      // two line around the background
      // component: circle of left arc
      {
        centerPoint: new Point(100, 70),
        a: 24,
        b: 24,
        drawType: $DRAW_TYPE.DRAW_LINE,
        fromAngle: leftFromAngle,
        toAngle: Math.PI * 1.5,
        presentOffset: new PresentOffset(30, 275)
      },
      // component: circle of right arc
      {
        centerPoint: new Point(190, 70),
        a: 24,
        b: 24,
        drawType: $DRAW_TYPE.DRAW_LINE,
        fromAngle: rightFromAngle,
        toAngle: Math.PI * 0.5,
        presentOffset: new PresentOffset(50, 260)
      },
      // component: white circle background
      {
        centerPoint: new Point(100, 70),
        a: 14,
        b: 14,
        fillStyle: 'white',
        drawType: $DRAW_TYPE.DRAW_FILL,
        presentOffset: new PresentOffset(280, 265)
      },
      // component: blue circle of logo 'e'
      {
        centerPoint: new Point(100, 70),
        a: 9,
        b: 9,
        lineWidth: 3,
        fromAngle: Math.PI * 0.3,
        toAngle:  Math.PI * 1.9,
        drawType: $DRAW_TYPE.DRAW_LINE,
        presentOffset: new PresentOffset(-230, 380)
      },
      // component: blue point of logo 'e'
      {
        centerPoint: new Point(105, 72),
        a: 4,
        b: 4,
        fromAngle: 0,
        toAngle: Math.PI / 4,
        drawType: $DRAW_TYPE.DRAW_FILL,
        presentOffset: new PresentOffset(-120, 375)
      }
    ],
    vertical: [
      // block-1
      { o: new Radical(new Point(120, 55), 8), presentOffset: new PresentOffset(-250, 500)},
      { o: new Radical(new Point(126, 56), 6), presentOffset: new PresentOffset(-220, 500)},
      // block-2
      { o: new Radical(new Point(120, 65), 19), presentOffset: new PresentOffset(-170, 480)},
      // block-3
      { o: new Radical(new Point(134, 57), 27), presentOffset: new PresentOffset(-130, 480)},
      { o: new Radical(new Point(142, 55), 29), presentOffset: new PresentOffset(-90, 480)},
      { o: new Radical(new Point(148, 67), 10, null, 3), presentOffset: new PresentOffset(-30, 485)},
      // block-4
      { o: new Radical(new Point(163, 64), 20), presentOffset: new PresentOffset(10, 480)},
      // block-5
      { o: new Radical(new Point(193, 76), 6), presentOffset: new PresentOffset(20, 480)}
    ],
    horizontal: [
      // block-1
      { o: new Radical(new Point(120, 58), 6), presentOffset: new PresentOffset(-255, 550)},
      // block-2
      { o: new Radical(new Point(120, 82), 5), presentOffset: new PresentOffset(-220, 526)},
      // block-3
      { o: new Radical(new Point(130, 57), 8), presentOffset: new PresentOffset(-190, 550)},
      { o: new Radical(new Point(130, 63), 20), presentOffset: new PresentOffset(-150, 543)},
      { o: new Radical(new Point(130, 82), 4), presentOffset: new PresentOffset(-80, 523)},
      { o: new Radical(new Point(128, 72), 10, -Math.PI/30, 3), presentOffset: new PresentOffset(-20, 533)},
      { o: new Radical(new Point(140, 82.5), 10, null, 3) , presentOffset: new PresentOffset(20, 523)},
      { o: new Radical(new Point(138, 76), 10, null, 3) , presentOffset: new PresentOffset(75, 529)},
      // block-4
      { o: new Radical(new Point(146, 57), 25), presentOffset: new PresentOffset(110, 548)},
      { o: new Radical(new Point(152, 82.5), 10, null, 3) , presentOffset: new PresentOffset(170, 523)},
      // block-5
      { o: new Radical(new Point(171, 82), 24), presentOffset: new PresentOffset(190, 523)}
    ],
    virgule: [
      // block-4
      { o: new Radical(new Point(161, 67), 12), presentOffset: new PresentOffset(-300, 650)},
      // block-5
      { o: new Radical(new Point(170, 66), 12), presentOffset: new PresentOffset(-260, 650)},
      { o: new Radical(new Point(172, 84), 32), presentOffset: new PresentOffset(-220, 640)}
    ],
    line: [
      // component: line of left arc
      {
        fromPoint: new Point(100, 46),
        toPoint: new Point(190, 46),
        presentOffset: new PresentOffset(150, 510)
      },
      // component: line of right arc
      {
        fromPoint: new Point(100, 94),
        toPoint: new Point(190, 94),
        presentOffset: new PresentOffset(260, 465)
      },
      // component: blue line of logo 'e'
      {
        fromPoint: new Point(90, 72),
        toPoint: new Point(109, 65),
        lineWidth: 3,
        presentOffset: new PresentOffset(330, 533)
      }
    ],
  };

  // draw seperate line when click 'seperate' action
  if (action === 'seperate') {
    var lines = [
      {
        fromPoint: new Point(0 - offsetX, 200 - offsetY),
        toPoint: new Point(600 - offsetX, 200 - offsetY),
        staticEleme: true
      },
      {
        fromPoint: new Point(0 - offsetX, 300 - offsetY),
        toPoint: new Point(600 - offsetX, 300 - offsetY),
        staticEleme: true
      },
      {
        fromPoint: new Point(0 - offsetX, 530 - offsetY),
        toPoint: new Point(600 - offsetX, 530 - offsetY),
        staticEleme: true
      },
      {
        fromPoint: new Point(0 - offsetX, 690 - offsetY),
        toPoint: new Point(600 - offsetX, 690 - offsetY),
        staticEleme: true
      }
    ];

    for (var i = 0; i < lines.length ; i ++) {
      elemeMap.line.push(lines[i]);
    }
  }

  // calculate speed for every element
  var LIMIT_SECOND = 80;
  for (var k in elemeMap) {
    for (var i = 0 ; i < elemeMap[k].length; i++) {
      if (!elemeMap[k][i].staticEleme) {
        elemeMap[k][i].xSpeed = elemeMap[k][i].presentOffset.offsetX / LIMIT_SECOND;
        elemeMap[k][i].ySpeed = elemeMap[k][i].presentOffset.offsetY / LIMIT_SECOND;
        elemeMap[k][i].originPresentOffset = new PresentOffset(elemeMap[k][i].presentOffset.offsetX, elemeMap[k][i].presentOffset.offsetY);
        elemeQuene.push(elemeMap[k][i]);
      }
    }
  }

  /**
   * position object
   * @param {[type]} x
   * @param {[type]} y
   */
  function Point(x, y) {
    if (arguments.length == 2) {
      this.x = x;
      this.y = y;
      this.$originX = x;
      this.$originY = y;
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

  function PresentOffset(ofX, ofY) {
    if (arguments.length == 2) {
      this.offsetX = ofX;
      this.offsetY = ofY;
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

  /**
   * draw
   * @return {[type]} [description]
   */
  ElemeLogoDrawer.prototype.draw = function() {
    var self = this;

    // vertical processor
    function verticalProcessor(radical) {
      // if origin exist
      if (radical) {
        var opts = {
          fromPoint: radical.o.point,
          toPoint: radical.o.angle ?
                   new Point(radical.o.point.x + Math.cos(radical.o.angle) * radical.o.length, radical.o.point.y + Math.sin(radical.o.angle) * radical.o.length)
                   : new Point(radical.o.point.x, radical.o.point.y + radical.o.length),
          strokeStyle: 'white',
          lineWidth: radical.o.lineWidth || 4,
          presentOffset: radical.presentOffset || new PresentOffset(0, 0)
        };
        ElemeLogoDrawer.prototype._coreLineDraw.call(self, opts);
      }
    }

    // horizontal processor
    function horizontalProcessor(radical) {
      // if origin exist
      if (radical.o) {
        var opts = {
          fromPoint: radical.o.point,
          toPoint: radical.o.angle ?
                   new Point(radical.o.point.x + Math.cos(radical.o.angle) * radical.o.length, radical.o.point.y + Math.sin(radical.o.angle) * radical.o.length)
                   : new Point(radical.o.point.x + radical.o.length, radical.o.point.y),
          strokeStyle: 'white',
          lineWidth: radical.o.lineWidth || 4,
          presentOffset: radical.presentOffset || new PresentOffset(0, 0)
        };
        ElemeLogoDrawer.prototype._coreLineDraw.call(self, opts);
      }
    }

    // virgule processor
    function virguleProcessor(radical) {
      if (radical.o) {
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
        processor[k](elemeMap[k][i]);
      }
    }
  };

  /**
   * core function: draw arc-like object
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  ElemeLogoDrawer.prototype._coreArcDraw = function(obj) {
    var a = obj.a || 20,
        b = obj.b || 20,
        centerPoint = obj.centerPoint || new Point(0, 0)
        lineWidth = obj.lineWidth || 1,
        fromAngle = obj.fromAngle || 0,
        toAngle = obj.toAngle || 2 * Math.PI,
        drawType = obj.drawType || this.$DRAW_TYPE.DRAW_LINE,
        fillStyle = obj.fillStyle || this.$COLOR.MAIN_COLOR,
        strokeStyle = obj.strokeStyle || this.$COLOR.MAIN_COLOR,
        presentOffset = obj.presentOffset || new PresentOffset(0, 0),
        active = obj.active || false;

    presentOffset = active ? presentOffset : new PresentOffset(0, 0);

    centerPoint = new Point(centerPoint.x + offsetX + presentOffset.offsetX, centerPoint.y + offsetY + presentOffset.offsetY)

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

  /**
   * core function: draw rect-like object
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  ElemeLogoDrawer.prototype._coreRectDraw = function(obj) {
    var rect = obj.rect || new Rect(0, 0, 20, 20),
        presentOffset = obj.presentOffset || new PresentOffset(0, 0),
        drawType = obj.drawType || this.$DRAW_TYPE.DRAW_LINE,
        strokeStyle = obj.strokeStyle || this.$COLOR.MAIN_COLOR,
        fillStyle = obj.fillStyle || this.$COLOR.MAIN_COLOR,
        active = obj.active || false;

    presentOffset = active ? presentOffset : new PresentOffset(0, 0);

    rect = new Rect(rect.x + offsetX + presentOffset.offsetX, rect.y + offsetY + presentOffset.offsetY, rect.width, rect.height);

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

  /**
   * core function: draw line-like object
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  ElemeLogoDrawer.prototype._coreLineDraw = function(obj) {
    var fromPoint = obj.fromPoint || new Point(0, 0),
        toPoint = obj.toPoint || new Point(10, 10),
        lineWidth = obj.lineWidth || 1,
        strokeStyle = obj.strokeStyle || this.$COLOR.MAIN_COLOR,
        presentOffset = obj.presentOffset || new PresentOffset(0, 0),
        active = obj.active || false;

    presentOffset = active ? presentOffset : new PresentOffset(0, 0);

    fromPoint = new Point(fromPoint.x + offsetX + presentOffset.offsetX, fromPoint.y + offsetY + presentOffset.offsetY);
    toPoint = new Point(toPoint.x + offsetX + presentOffset.offsetX, toPoint.y + offsetY + presentOffset.offsetY);

    this.$ctx.beginPath();

    this.$ctx.moveTo(fromPoint.x, fromPoint.y);

    this.$ctx.lineTo(toPoint.x, toPoint.y);
    this.$ctx.strokeStyle = strokeStyle;
    this.$ctx.lineWidth = lineWidth;

    this.$ctx.stroke();

    this.$ctx.closePath();

  };

  /**
   * core function: draw parallelogram-like object
   * @param  {[type]} obj [description]
   * @return {[type]}     [description]
   */
  ElemeLogoDrawer.prototype._coreParallelogramDraw = function(obj) {
    var point = obj.o.point || new Point(0, 0),
        length = obj.o.length || 10,
        fillStyle = obj.o.fillStyle || 'white',
        width = 5,
        presentOffset = obj.presentOffset || new PresentOffset(0, 0),
        active = obj.active || false;

    presentOffset = active ? presentOffset : new PresentOffset(0, 0);

    var angle = Math.PI / 3;

    // 0,1,2,3: 从左上角开始计算
    var squareX = [
      point.x + Math.cos(angle) * length + offsetX + presentOffset.offsetX,
      point.x + width + Math.cos(angle) * length + offsetX + presentOffset.offsetX,
      point.x + width + offsetX + presentOffset.offsetX,
      point.x + offsetX + presentOffset.offsetX
    ];

    var squareY = [
      point.y - Math.sin(angle) * length + offsetY + presentOffset.offsetY,
      point.y - Math.sin(angle) * length + offsetY + presentOffset.offsetY,
      point.y + offsetY + presentOffset.offsetY,
      point.y + offsetY + presentOffset.offsetY
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

  /**
   * clear canvas
   * @return {[type]} [description]
   */
  ElemeLogoDrawer.prototype.clear = function() {
    this.$ctx.clearRect(0, 0, 600, 800);
  };

  // init ElemeLogoDrawer object
  var drawer = new ElemeLogoDrawer('eleme');

  // two circle's radius
  var R = 24;

  // increase angle per animation frame [circle speed]
  var angle = 2 / Math.PI / R;

  // some tmp from two mask line
  var rightAngle1 = rightAngle2 = defaultRightAngle = -Math.PI / 2,
      leftAngle1 = leftAngle2 = defaultLeftAngle = Math.PI / 2;

  // 1/4 circumference
  var LINE_LENGTH = 37.7;

  // color of two mask line
  var BLANK_COLOR = 'white';

  // line width of two mask line
  var LINE_WIDTH = 4;

  // increase 0.6px per animation frame [line speed]
  var LINE_SPEED = 0.6;

  // center point of left circle
  var LEFT_CENTER_POINT = new Point(100, 70);

  // center point of right circle
  var RIGHT_CENTER_POINT = new Point(190, 70);

  function flashEngine(blankPoint, index) {
    if (index == 1) {
      rightAngle = rightAngle1;
      leftAngle = leftAngle1;
    } else {
      rightAngle = rightAngle2;
      leftAngle = leftAngle2;
    }

    // top line
    if (blankPoint.rect.x >= LEFT_CENTER_POINT.x && blankPoint.rect.x <= RIGHT_CENTER_POINT.x && blankPoint.rect.y < LEFT_CENTER_POINT.y) {
      var extraLength = RIGHT_CENTER_POINT.x - blankPoint.rect.x - LINE_LENGTH;

      drawer._coreLineDraw({
        fromPoint: new Point(blankPoint.rect.x, blankPoint.rect.y),
        toPoint: new Point(extraLength > 0 ? blankPoint.rect.x + LINE_LENGTH : RIGHT_CENTER_POINT.x , LEFT_CENTER_POINT.y - R),
        strokeStyle: BLANK_COLOR,
        lineWidth: LINE_WIDTH
      });

      if (extraLength < 0) {
        drawer._coreArcDraw({
          centerPoint: RIGHT_CENTER_POINT,
          a: R,
          b: R,
          fromAngle: Math.PI * 1.5,
          toAngle: Math.PI * 1.5 + (-extraLength) / R,
          strokeStyle: BLANK_COLOR,
          lineWidth: LINE_WIDTH
        });
      }

      blankPoint.rect.x += LINE_SPEED;
      blankPoint.rect.y = LEFT_CENTER_POINT.y - R;
    }
    // right circle
    else if (blankPoint.rect.x >= RIGHT_CENTER_POINT.x) {

      drawer._coreArcDraw({
        centerPoint: RIGHT_CENTER_POINT,
        a: R,
        b: R,
        fromAngle: rightAngle,
        toAngle: rightAngle > 0 ? Math.PI * 0.5 : rightAngle + LINE_LENGTH / R,
        strokeStyle: BLANK_COLOR,
        lineWidth: LINE_WIDTH
      });

      if (rightAngle > 0) {
        var extraLength = rightAngle * R;
        drawer._coreLineDraw({
          fromPoint: new Point(RIGHT_CENTER_POINT.x, RIGHT_CENTER_POINT.y + R),
          toPoint: new Point(RIGHT_CENTER_POINT.x - extraLength, RIGHT_CENTER_POINT.y + R),
          strokeStyle: BLANK_COLOR,
          lineWidth: LINE_WIDTH
        });
      }

      leftAngle = defaultLeftAngle;
      rightAngle = rightAngle + angle;
      blankPoint.rect.x = RIGHT_CENTER_POINT.x + Math.cos(rightAngle) * R;
      blankPoint.rect.y = RIGHT_CENTER_POINT.y + Math.sin(rightAngle) * R;
    }
    // bottom line
    else if (blankPoint.rect.x >= LEFT_CENTER_POINT.x && blankPoint.rect.x < RIGHT_CENTER_POINT.x && blankPoint.rect.y > LEFT_CENTER_POINT.y) {
      var extraLength = blankPoint.rect.x - LEFT_CENTER_POINT.x - LINE_LENGTH;

      drawer._coreLineDraw({
        fromPoint: new Point(blankPoint.rect.x, blankPoint.rect.y),
        toPoint: new Point(extraLength > 0 ? blankPoint.rect.x - LINE_LENGTH : LEFT_CENTER_POINT.x , LEFT_CENTER_POINT.y + R),
        strokeStyle: BLANK_COLOR,
        lineWidth: LINE_WIDTH
      });

      if (extraLength < 0) {
        drawer._coreArcDraw({
          centerPoint: LEFT_CENTER_POINT,
          a: R,
          b: R,
          fromAngle: Math.PI * 0.5,
          toAngle: Math.PI * 0.5 + (-extraLength) / R,
          strokeStyle: BLANK_COLOR,
          lineWidth: LINE_WIDTH
        });
      }

      blankPoint.rect.x -= LINE_SPEED;
      blankPoint.rect.y = LEFT_CENTER_POINT.y + R;
    }
    // left circle
    else if (blankPoint.rect.x <= LEFT_CENTER_POINT.x) {
      drawer._coreArcDraw({
        centerPoint: LEFT_CENTER_POINT,
        a: R,
        b: R,
        fromAngle: leftAngle,
        toAngle: leftAngle > Math.PI ? Math.PI * 1.5 : leftAngle + LINE_LENGTH / R,
        strokeStyle: BLANK_COLOR,
        lineWidth: LINE_WIDTH
      });

      if (leftAngle > Math.PI) {
        var extraLength = (Math.PI - leftAngle) * R;
        drawer._coreLineDraw({
          fromPoint: new Point(LEFT_CENTER_POINT.x, LEFT_CENTER_POINT.y - R),
          toPoint: new Point(LEFT_CENTER_POINT.x - extraLength, LEFT_CENTER_POINT.y - R),
          strokeStyle: BLANK_COLOR,
          lineWidth: LINE_WIDTH
        });
      }

      rightAngle = defaultRightAngle;
      leftAngle = leftAngle + angle
      blankPoint.rect.x = LEFT_CENTER_POINT.x + Math.cos(leftAngle) * R;
      blankPoint.rect.y = LEFT_CENTER_POINT.y + Math.sin(leftAngle) * R;
    }

    if (index == 1) {
      rightAngle1 = rightAngle;
      leftAngle1 = leftAngle;
    } else {
      rightAngle2 = rightAngle;
      leftAngle2 = leftAngle;
    }
  }

  // left mask line object
  var blankPointLeft = {
    rect: new Rect(100, 94, 1, 1),
    fillStyle: 'red',
    drawType: $DRAW_TYPE.DRAW_FILL
  };

  // right mask line object
  var blankPointRight = {
    rect: new Rect(190, 46, 1, 1),
    fillStyle: 'red',
    drawType: $DRAW_TYPE.DRAW_FILL
  };

  var reqAnimFrame =  window.mozRequestAnimationFrame    ||
                  window.webkitRequestAnimationFrame ||
                  window.msRequestAnimationFrame     ||
                  window.oRequestAnimationFrame;

  var elemeIndex = 0;

  function animate() {
    reqAnimFrame(animate);

    drawer.clear();
    drawer.draw();

    // show different when switch action
    if (action === 'animation') {
      flashEngine(blankPointLeft, 1);
      flashEngine(blankPointRight, 2);
    } else if (action === 'seperate') {
      if (elemeIndex < elemeQuene.length) {

        if (elemeQuene[elemeIndex].active === undefined) {
          elemeQuene[elemeIndex].active = true;
          elemeQuene[elemeIndex].presentOffset = new PresentOffset(0, 0);
        } else if (elemeQuene[elemeIndex].active && elemeQuene[elemeIndex].presentOffset.offsetX != elemeQuene[elemeIndex].originPresentOffset.offsetX) {
          elemeQuene[elemeIndex].presentOffset.offsetX += elemeQuene[elemeIndex].xSpeed;
          elemeQuene[elemeIndex].presentOffset.offsetY += elemeQuene[elemeIndex].ySpeed;
        } else {
          elemeQuene[elemeIndex].active = false;

          if (elemeQuene[elemeIndex].rect) {
            elemeQuene[elemeIndex].rect.x += elemeQuene[elemeIndex].presentOffset.offsetX;
            elemeQuene[elemeIndex].rect.y += elemeQuene[elemeIndex].presentOffset.offsetY;
          } else if (elemeQuene[elemeIndex].centerPoint) {
            elemeQuene[elemeIndex].centerPoint.x += elemeQuene[elemeIndex].presentOffset.offsetX;
            elemeQuene[elemeIndex].centerPoint.y += elemeQuene[elemeIndex].presentOffset.offsetY;
          } else if (elemeQuene[elemeIndex].o) {
            elemeQuene[elemeIndex].o.point.x += elemeQuene[elemeIndex].presentOffset.offsetX;
            elemeQuene[elemeIndex].o.point.y += elemeQuene[elemeIndex].presentOffset.offsetY;
          } else if (elemeQuene[elemeIndex].fromPoint) {
            elemeQuene[elemeIndex].fromPoint.x += elemeQuene[elemeIndex].presentOffset.offsetX;
            elemeQuene[elemeIndex].fromPoint.y += elemeQuene[elemeIndex].presentOffset.offsetY;
            elemeQuene[elemeIndex].toPoint.x += elemeQuene[elemeIndex].presentOffset.offsetX;
            elemeQuene[elemeIndex].toPoint.y += elemeQuene[elemeIndex].presentOffset.offsetY;
          }

          elemeIndex++;
        }
      }

    }

}

animate();

// show different when refresh page
switch (action) {
  case 'animation':
    break;
  case 'seperate':
    $('body').addClass('black');
    break;
  case 'back':
    window.location.href = './index.html';
  default:
    drawer.draw();
    break;
}

})(window)
