var Engine = famous.core.Engine;
var Modifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var View = famous.core.View;
var SequentialLayout = famous.views.SequentialLayout;
var Surface = famous.core.Surface;
var ImageSurface = famous.surfaces.ImageSurface;
var mainContext = Engine.createContext();
var Transitionable = famous.transitions.Transitionable;
var responsiveWidth = function(){
  var windowWidth = mainContext.getSize()[0];
  if(windowWidth < 400){
    return mainContext.getSize()[0]-20;
  }else{
    return mainContext.getSize()[0]/5;
  }
}
var title = new Surface({
  content: 'iNodebot',
  properties: {
    textAlign: 'center',
    fontSize: '3em'
  }
});
var logo = new ImageSurface({
    size: [responsiveWidth(),responsiveWidth()],
    content: 'img/nodebots.png'
});
var menuItems = ['Drive','LineFollow','Program'];
var menuSurfaces = [logo];
var menuView = new SequentialLayout();
menuView.sequenceFrom(menuSurfaces);
for(var i=0;i<menuItems.length;i+=1){
  var route = menuItems[i]
  var surface = new Surface({
    size: [responsiveWidth(), mainContext.getSize()[1]/16],
    content: route,
    properties: {
      backgroundColor: 'hotpink',
      color: 'white',
      border: 'solid 1px white',
      fontSize: mainContext.getSize()[1]/24+'px',
      padding: '0em 0em 0em 0.2em',
      cursor: 'pointer'
    }
  });
  surface.on('click', function(e){window.location = '/'+e.target.innerHTML});
  menuSurfaces.push(surface);
}
var centerModifier = new Modifier({
  origin: [0.5, 0.5],
  align: [0.5, 0.5]
});
mainContext.add(title);
mainContext.add(centerModifier).add(menuView);
