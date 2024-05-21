  
  var htmlCollection = document.getElementsByClassName('item');
  //getting elements by class name into an HTMLCollection
  
    var itemsId = Array.from(htmlCollection);
  //turning the HTMLcollection into an array for easier manipulation of the elements
  
    var sectionDeg = 360/itemsId.length;
  //sectioning the (imaginary) circle into a number of section equalling the number of items
  //it can be used on more elements
  
    var radianSectionDeg = sectionDeg*Math.PI*2/360;
  //transforming from degrees into radians
  
    var radiusLength = 200;
  //the distance between the center of the circle to the element
  //edit this number to increase/decrease that distance
  
    for(var i=0; i<itemsId.length; i++){
      itemsId[i].style.top = radiusLength*Math.sin(radianSectionDeg*i-1.5708)-50+'px';
      itemsId[i].style.left = radiusLength*Math.cos(radianSectionDeg*i-1.5708)-50+'px';
    }
  //setting the top and left positions of each elemenent based on the following formula:
  //(x, y) = (r * cos(θ), r * sin(θ)) like this:
  //x = (r * cos(θ) => left
  //y = r * sin(θ) => top
  //1.5708 is a radian used put the first element on top - basically 90deg
  
  var rotation = 0;
  var center = document.getElementById('center');
  //we are going to rotate the wrapper of the elements
  
  function turnLeft(){
    rotation = rotation + radianSectionDeg;
      center.style.transform = 'rotate('+ rotation +'rad)';
    for(var i=0; i<itemsId.length; i++){
      itemsId[i].style.transform = 'rotate('+ -rotation +'rad)';
    }
  }
  
  function turnRight(){
    rotation = rotation - radianSectionDeg;
      center.style.transform = 'rotate('+rotation+'rad)';
    for(var i=0; i<itemsId.length; i++){
      itemsId[i].style.transform = 'rotate('+ -rotation +'rad)';
    }
  }
  //both these functions rotate the wrapper
  //they rotate the inner elements too, to keep them straight