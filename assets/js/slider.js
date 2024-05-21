var htmlCollection = document.getElementsByClassName('item');
var itemsId = Array.from(htmlCollection);
var sectionDeg = 360 / itemsId.length;
var radianSectionDeg = sectionDeg * Math.PI * 2 / 360;
var radiusLength = 200;
var rotation = 0;
var center = document.getElementById('center');




var sliderClass = document.getElementById('slider-list');
var childrenArray = Array.from(sliderClass.children);
var currentIndex = 0;

function show() {
    childrenArray.forEach(child => {
        child.classList.remove('first-child');
        child.classList.remove('last-child');
        child.classList.remove('fade-in');
        child.style.display = 'none';
    });

    let startIndex = currentIndex;
    let endIndex = (currentIndex + 3) % childrenArray.length; // Calculate the end index correctly

    if (startIndex <= endIndex) {
        for (let i = startIndex; i <= endIndex; i++) {
            childrenArray[i].style.display = 'block';
            requestAnimationFrame(() => childrenArray[i].classList.add('fade-in'));
        }
    } else {
        for (let i = startIndex; i < childrenArray.length; i++) {
            childrenArray[i].style.display = 'block';
            requestAnimationFrame(() => childrenArray[i].classList.add('fade-in'));
        }
        for (let i = 0; i <= endIndex; i++) {
            childrenArray[i].style.display = 'block';
            requestAnimationFrame(() => childrenArray[i].classList.add('fade-in'));
        }
    }

    let visibleChildren = childrenArray.filter(child => child.style.display === 'block');
    if (visibleChildren.length > 0) {
        visibleChildren[0].classList.add('first-child');
        visibleChildren[visibleChildren.length - 1].classList.add('last-child');
    }
}

show();




function arrangeItems() {
    for (var i = 0; i < itemsId.length; i++) {
        itemsId[i].style.top = radiusLength * Math.sin(radianSectionDeg * i - 1.5708) - 50 + 'px';
        itemsId[i].style.left = radiusLength * Math.cos(radianSectionDeg * i - 1.5708) - 50 + 'px';
    }
}

function turnLeft() {
    
  
    if(currentIndex == childrenArray.length / 2 ) { 
        currentIndex = 0
        show()
    }
     else {
        currentIndex = (currentIndex + 1) % childrenArray.length;
        show();
    }
    

    if(currentIndex == childrenArray.length / 2 ) { 
        currentIndex = 0
    }
  
       
    

    rotation += radianSectionDeg;
    center.style.transform = 'rotate(' + rotation + 'rad)';
    for (var i = 0; i < itemsId.length; i++) {
        itemsId[i].style.transform = 'rotate(' + -rotation + 'rad)';
    }
  
    addClassBasedOnLeftPosition(800);
}

function turnRight() {

    currentIndex = (currentIndex - 1 + childrenArray.length) % childrenArray.length;
    // console.log(currentIndex)
    show();


    

    rotation -= radianSectionDeg;
    center.style.transform = 'rotate(' + rotation + 'rad)';
    for (var i = 0; i < itemsId.length; i++) {
        itemsId[i].style.transform = 'rotate(' + -rotation + 'rad)';
    }
    addClassBasedOnLeftPosition(800);

 

    
 
    
}


function addClassBasedOnLeftPosition(distance) {
    var parentDiv = document.getElementById('center');
    var parentRect = parentDiv.getBoundingClientRect();
    
    var elements = parentDiv.querySelectorAll('.item');
    elements.forEach(function(element) {
        element.classList.remove('highlight');
        var rect = element.getBoundingClientRect();
        // Calculate the left position relative to the parent div
        var relativeLeft = rect.left - parentRect.left;
        // Check if the relative left position is less than the negative distance
        if (relativeLeft >= -67 && relativeLeft <= -141) {
            element.classList.add('highlight');
        }
    });
}


arrangeItems();

addClassBasedOnLeftPosition(49);
