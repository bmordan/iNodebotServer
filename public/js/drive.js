var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Easing = famous.transitions.Easing;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var TouchSync = famous.inputs.TouchSync;
var MouseSync = famous.inputs.MouseSync;
var GenericSync = famous.inputs.GenericSync;
var Transitionable = famous.transitions.Transitionable;
GenericSync.register({
  "mouse" : MouseSync,
  "touch" : TouchSync
});
var mainContext = Engine.createContext();
var mainContextWidthFifth = mainContext.getSize()[0]/5;

var background = new ImageSurface({
  content: 'img/nodebot_head.svg',
  properties: {padding: '2em'}
});
mainContext.add(background)

var control = {
  size: [mainContextWidthFifth, mainContextWidthFifth],
  properties: {
    backgroundColor: 'white',
    borderRadius: '49%'
  } 
};

var leftControl = new Surface(control);
var leftYpos = new Transitionable(0);
var leftControlModifier = new Modifier({
  origin: [0, 0.5],
  align: [0, 0.5],
  transform: function(){
    return Transform.translate(mainContextWidthFifth, leftYpos.get(), 0)
  }
});
var leftControlSync = new GenericSync({
  "mouse" : {},
  "touch" : {}
});
leftControl.pipe(leftControlSync);
leftControlSync.on('update', function(data){
  leftYpos.set(data.position[1])
});
leftControlSync.on('end', function(data){
  leftYpos.set(0,{duration: 500, curve: Easing.outBounce })
});

var rightControl = new Surface(control);
var rightYpos = new Transitionable(0);
var rightControlModifier = new Modifier({
  origin: [1, 0.5],
  align: [1, 0.5],
  transform: function(){
    return Transform.translate(-mainContextWidthFifth, rightYpos.get(), 0)
  }
});
var rightControlSync = new GenericSync({
  "mouse" : {},
  "touch" : {}
});
rightControl.pipe(rightControlSync)
rightControlSync.on('update', function(data){
  rightYpos.set(data.position[1])
});
rightControlSync.on('end', function(data){
  rightYpos.set(0,{duration: 500, curve: Easing.outBounce })
});

mainContext.add(leftControlModifier).add(leftControl);
mainContext.add(rightControlModifier).add(rightControl);