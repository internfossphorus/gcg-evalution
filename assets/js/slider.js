(function($) {
    $.fn.circle = function(options) {
        var settings = $.extend({
            speed: "5000"
        }, options);

        return this.each(function() {
            function updateActive() {
                var activeIndex = $this.find("li.block.active").index();
                $animateItems.removeClass("active");
                $animateItems.eq(activeIndex).addClass("active");
            }

            function rotate(direction, step) {
                var newActiveIndex;
                $this.addClass("disable-hover");
                $this.stop(true, true).animate({
                    rotatedeg: props.deg += step
                }, {
                    duration: 400,
                    step: function(now) {
                        if (now >= 360) now -= 360;
                        if (now <= -360) now += 360;
                        $(this).css("transform", "rotate(" + now + "deg)");
                        $(this).css("-webkit-transform", "rotate(" + now + "deg)");
                    },
                    complete: function() {
                        props.active = $this.find("li.active").removeClass("active");
                        if (direction === "right" && step === reverseStep) {
                            if (props.active.prev().length) {
                                newActiveIndex = props.active.prev().index();
                                props.active.prev().addClass("active");
                            } else {
                                $this.find("li:last-child").addClass("active");
                                newActiveIndex = 9;
                            }
                        } else if (direction === "left" && step === rotationStep) {
                            if (props.active.next().length) {
                                newActiveIndex = props.active.next().index();
                                props.active.next().addClass("active");
                            } else {
                                $this.find("li:first-child").addClass("active");
                                newActiveIndex = 0;
                            }
                        }
                        updateActive();
                        addFourthChildClass(); // Add fourth-child class after updating active slide
                        $this.removeClass("disable-hover");
                    }
                }, "ease");
            }
            

            function addFourthChildClass() {
                // Remove the class from all elements first
                $this.find("li.block").removeClass("fourth-child");
                // Add the class to every 4th element
                $this.find("li.block:nth-child(4n)").addClass("fourth-child");
            }
            

            var $this = $(this),
                itemLength = $this.find("li").length,
                itemIcons = $this.find("> li .icon"),
                className = "count" + itemLength,
                rotationStep = 0,
                $animateItems = $this.next().find(".animate"),
                props = {
                    duration: settings.speed,
                    deg: 0,
                    step: rotationStep,
                    active: $this.find("li.active"),
                    direction: "left"
                };

            switch (itemLength) {
                case 10: rotationStep = -36; break;
                case 9: rotationStep = -40; break;
                case 8: rotationStep = -45; break;
                case 7: rotationStep = -51.5; break;
                case 6: rotationStep = -60; break;
                case 5: rotationStep = -72; break;
                case 4: rotationStep = -90; break;
                case 3: rotationStep = -120; break;
                case 2: rotationStep = -180; break;
                case 1: rotationStep = -360; break;
            }

            var reverseStep = rotationStep - 2 * rotationStep;
            $this.addClass(className);
            $this.find("> li").first().addClass("active");
            $animateItems.eq(0).addClass("active");
            addFourthChildClass();

            itemIcons.on("click", function() {
                var indexDiff = $(this).parent().index() - $this.find("li.active").index();
                $this.children("li").removeClass("active");
                $(this).parent().addClass("active");
                props.step = -indexDiff * reverseStep;
                if (indexDiff * reverseStep >= 288) props.step = -indexDiff * reverseStep + 360;
                if (indexDiff * reverseStep <= -288) props.step = -indexDiff * reverseStep - 360;
                rotate("left", props.step);
                props.step = rotationStep;
                props.direction = "left";
                updateActive();
            });

            var nextButton = $this.parent().find("div.next"),
                prevButton = $this.parent().find("div.prev");

            nextButton.on("click", function() {
                if (!$this.is(":animated")) {
                    rotate("left", rotationStep);
                }
            });

            prevButton.on("click", function() {
                if (!$this.is(":animated")) {
                    rotate("right", reverseStep);
                }
            });
        });
    }
}(jQuery));

$(function() {
    // Background image
    $('div').each(function() {
        var url = $(this).attr('data-image');
        if (url) {
            $(this).css('background-image', 'url(' + url + ')');
        }
    });

    $('section').each(function() {
        var url = $(this).attr('data-image');
        if (url) {
            $(this).css('background-image', 'url(' + url + ')');
        }
    });

    // Service Auto height circle 
    function autoHeightCircle() {
        var circle = $('.circle--rotate'),
            circleInner = $('.animate-wrapper'),
            circleH = circle.width(),
            circleInnerH = circleInner.width();
        circle.height(circleH);
        circleInner.height(circleInnerH);
    }

    $("#circle--rotate").circle();
    autoHeightCircle();
    $(window).resize(function() {
        autoHeightCircle();
    });
});
