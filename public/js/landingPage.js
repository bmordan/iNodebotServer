var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var View = famous.core.View;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var mainContext = Engine.createContext();
var Transitionable = famous.transitions.Transitionable;
var fifthHeight = new Transitionable(mainContext.getSize()[1]/5)
var logo = new ImageSurface({
    size: [300, 300],
    content: 'img/nodebots.png',
    properties: {
      backfaceVisibility: 'visible'
    }
});
var initialTime = Date.now();
var logoModifier = new Modifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform : function () {
        return Transform.rotateY(.0002 * (Date.now() - initialTime));
    }
});
var title = new Surface({
  size: [undefined, fifthHeight.get()],
  content: 'iNodebot',
  properties: {
    textAlign: 'center',
    fontSize: '3em'
  }
});
var titleModifier = new Modifier({
  origin: [0.5, 0],
  align: [0.5, 1],
  transform: function() {
    return Transform.translate(0,-fifthHeight.get(),0);
  }
});
title.on('click', function(){
  window.location = '/drive'
});
mainContext.add(logoModifier).add(logo);
mainContext.add(titleModifier).add(title);