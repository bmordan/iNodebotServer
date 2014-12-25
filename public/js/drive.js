var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var mainContext = Engine.createContext();
var mainContextWidthFifth = mainContext.getSize()[0]/5;
var mainContextHeightFifth = mainContext.getSize()[1]/5;
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
var rightControl = new Surface(control);
var leftControlModifier = new Modifier({
  origin: [0, 0.5],
  align: [0, 0.5],
  transform: Transform.translate(mainContextWidthFifth, 0, 0)
});
var rightControlModifier = new Modifier({
  origin: [1, 0.5],
  align: [1, 0.5],
  transform: Transform.translate(-mainContextWidthFifth, 0, 0)
});
mainContext.add(leftControlModifier).add(leftControl);
mainContext.add(rightControlModifier).add(rightControl);