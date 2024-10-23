$(document).ready(function() {
    // Accordion functionality
    $(".accordion button").click(function() {
        $(".panel").slideUp(); // Close all panels
        if (!$(this).next().is(":visible")) { // Open the clicked panel if it is not already visible
            $(this).next().slideDown();
        }
    });

    // Tabbed Panels functionality
    $(".tablink").click(function() {
        var index = $(this).index();
        $(".tablink").removeClass("w3-white"); // Remove active class from all tabs
        $(this).addClass("w3-white"); // Add active class to clicked tab

        $(".content").addClass("w3-hide"); // Hide all content sections
        $(".content").eq(index).removeClass("w3-hide"); // Show the content corresponding to the clicked tab
    });

    // Slideshow functionality
    let currentIndex = 0;
    const images = $(".slideshow img");

    function showImage(index) {
        images.removeClass("active"); // Remove 'active' class from all images
        images.eq(index).addClass("active"); // Add 'active' class to the current image
    }

    $(".next").click(function() {
        currentIndex = (currentIndex + 1) % images.length; // Move to next image, loop back to start if at the end
        showImage(currentIndex);
    });

    $(".prev").click(function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to previous image, loop back to end if at the start
        showImage(currentIndex);
    });

    // Automatic slideshow: transition images every 3 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % images.length; // Move to next image automatically
        showImage(currentIndex);
    }, 3000);
});
