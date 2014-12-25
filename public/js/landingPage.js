var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var View = famous.core.View;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var mainContext = Engine.createContext();
var SequentialLayout = famous.views.SequentialLayout;
var logo = new ImageSurface({
    size: [300, 300],
    content: 'img/nodebots.png',
    classes: ['double-sided']
});
var initialTime = Date.now();
var logoModifier = new Modifier({
    origin: [0.5, 1],
    align: [0.5, 0.5],
    transform : function () {
        return Transform.rotateY(.002 * (Date.now() - initialTime));
    }
});
var title = new Surface({
  size: [undefined, undefined],
  content: 'iNodebot',
  properties: {
    textAlign: 'center',
    paddingTop: '30px',
    fontSize: '3em'
  }
});
var titleModifier = new Modifier({
  origin: [0.5, 0],
  align: [0.5, 0.5]
});
title.on('click', function(){
  window.location = '/drive'
});
mainContext.add(logoModifier).add(logo);
mainContext.add(titleModifier).add(title);