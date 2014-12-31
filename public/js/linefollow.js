var Engine = famous.core.Engine;
var SequentialLayout = famous.views.SequentialLayout;
var FlexibleLayout = famous.views.FlexibleLayout;
var View = famous.core.View;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var Modifier = famous.core.Modifier;
var Transitionable = famous.transitions.Transitionable;
var Transform = famous.core.Transform;
var RotateSync = famous.inputs.RotateSync;
var Easing = famous.transitions.Easing;
var mainContext = Engine.createContext();
var unit = mainContext.getSize()[1]/9;
var rotate = new Transitionable(0.5);
var labelsLayout = new SequentialLayout({
  direction: 0
});
var labels = ['On','Off'];
var labelSurfaces = [];
labelsLayout.sequenceFrom(labelSurfaces);
for(var i=0;i<labels.length;i+=1){
  if(i === 0){var align = 'right'}else{var align = 'left'}
  var surface = new Surface({
    size: [mainContext.getSize()[0]/2,unit],
    content: labels[i],
    properties: {
      padding: (unit/2)+'px 12% 0% 12%',
      textAlign: align,
      fontSize: unit+'px'
    }
  });
  labelSurfaces.push(surface)
}
var dial = new ImageSurface({
  size: [undefined, (mainContext.getSize()[1])-(unit*2)],
  content: 'img/dial.svg',
  properties: {
    padding: '1em'
  }
});
var dialModifier = new Modifier({
  origin: [0.5, 0.5],
  align: [0.5, 0.5],
  transform: function(){
    var r = rotate.get()
    return Transform.rotate(0, 0, r)
  }
});
var rotateSync = new RotateSync();
dial.pipe(rotateSync);
rotateSync.on('update', function(e){
  if(e.velocity > 0){var d = 0.9}else{var d = -0.9}
  rotate.set(d)
});
rotateSync.on('end', function(e){
  if(rotate.get() > 0){var d = 0.5}else{var d = -0.5}
  rotate.set(d,{duration: 600, curve: Easing.outElastic})
});
mainContext.add(labelsLayout);
mainContext.add(dialModifier).add(dial);
