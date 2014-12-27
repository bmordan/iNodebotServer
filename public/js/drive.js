var port = process.env.PORT || 3000;
var socket = io.connect('http://inodebot.herokuapp.com:'+port)
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
  "touch"  : TouchSync
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
var rightControl = new Surface(control);
var rightYpos = new Transitionable(0);
var rightControlModifier = new Modifier({
  origin: [1, 0.5],
  align: [1, 0.5],
  transform: function(){
    return Transform.translate(-mainContextWidthFifth, rightYpos.get(), 0)
  }
});
leftControl.on('touchmove', function(data){
  var delta = data.targetTouches[0].clientY-mainContextWidthFifth
  leftYpos.set(delta)
  if(delta > 0){var fn = 'leftForward'}else{var fn = 'leftReverse'}
  socket.emit('movement', {fn: fn});
});
leftControl.on('touchend', function(data){
  leftYpos.set(0, {duration: 633, curve: Easing.outBounce})
  socket.emit('movement', {fn: 'leftStop'})
});
rightControl.on('touchmove', function(data){
  var delta = data.targetTouches[0].clientY-mainContextWidthFifth
  rightYpos.set(delta)
  if(delta > 0){var fn = 'rightForward'}else{var fn = 'rightReverse'}
  socket.emit('movement', {fn: fn});
});
rightControl.on('touchend', function(data){
  rightYpos.set(0, {duration: 633, curve: Easing.outBounce})
  socket.emit('movement', {fn: 'rightStop'})
});
mainContext.add(leftControlModifier).add(leftControl);
mainContext.add(rightControlModifier).add(rightControl);