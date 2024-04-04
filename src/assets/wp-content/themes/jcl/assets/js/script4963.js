// --- Always-ons ------------------------------------------------------------------------------- //

jQuery(function() {

    jQuery(window).on("load scroll resize", function() {
        setPageHeight();
        setNavigation();
        setHamburger();
    });

    hideAll();

});

// --- Make page height at least 100% ----------------------------------------------------------- //

function setPageHeight() {
    try {
        var viewportHeight = jQuery(window).height();
        var minimumHeight = 0;
        minimumHeight += jQuery("#footer").outerHeight(true);
        jQuery("#content")
        jQuery("#content").css("min-height", viewportHeight - minimumHeight);
    }
    catch(e) {}
}

// --- Adjust navigation theme based on scrolling position -------------------------------------- //

function setNavigation() {
    if(jQuery(window).scrollTop() > jQuery("#header").innerHeight())
        jQuery("#header").removeClass("top red");
    else
        jQuery("#header").addClass("top red");
}

// --- Add identifiers to menu items ------------------------------------------------------------ //

jQuery(function(){
    jQuery('#menu-main-menu .menu-item').each(function(){
        var code = jQuery(this).find('a').eq(0).html().toLowerCase().replace(' ', '-');
        jQuery(this).addClass('menu-item-' + code);
    });
});

// --- Show or hide the hamburger menu ---------------------------------------------------------- //

function setHamburger() {
    // Select the last element that will have inline-block. Assuming BM and EN are the 2nd and 1st last
    var lastMenuItem = jQuery('#menu-main-menu > li:nth-last-child(3)');
    if (lastMenuItem.position().top > 1) {
        jQuery('#header').addClass('hamburger');
    }
    else {
        jQuery('#header').removeClass('hamburger');
    }
    if (jQuery('#header').hasClass('is-loading')) {
        jQuery('#header').removeClass('is-loading');
    }
}

function activateHamburger() {
    jQuery('#hamburger').addClass('is-active');
    jQuery('#hamburger .menu-hamburger-container > ul').css('top', jQuery('#header').height());
}

function deactivateHamburger() {
    jQuery('#hamburger').removeClass('is-active');
    jQuery('#hamburger .menu-hamburger-container > ul').css('top', calculateHamburgerHeight() * -1 - 10);
}

function calculateHamburgerHeight() {
    return jQuery('#hamburger .menu-hamburger-container > ul').outerHeight(true);
}

jQuery(function() {

    // Deactivates hamburger by clicking elsewhere on the page
    jQuery(document.body).click(function(e) {
        deactivateHamburger();
    });

    // Activates hamburger by clicking on the button
    jQuery('.hamburger__button').on('click',function(e){
        e.stopPropagation();
        deactivateSearch();
        if (jQuery('#hamburger').hasClass('is-active'))
            deactivateHamburger();
        else
            activateHamburger();
    });

    // Do not deactivate when clicking on the hamburger menu
    jQuery('#hamburger ul').on('click',function(e){
        e.stopPropagation();
    });

    // Detach and reattach language switch next to hamburger button
    var langswitch = jQuery("#hamburger .trp-language-switcher-container").detach()
    langswitch.insertBefore( ".hamburger__button" );


});

// --- Correct hash-sign links on the navigation bar -------------------------------------------- //
// Links on the menu that lead to a section of a page are keyed in with a '?' prefix to get
// around some framework limitation. This corrects it and makes it work.

jQuery(function(){
    var linksToSegments = jQuery('#navigation .menu-item-type-custom > a[href^="?"]');
    var rootURL = jQuery('#header .header__home').attr('href');
    linksToSegments.each(function(){
        var unprocessedURL = jQuery(this).attr('href');
        jQuery(this).attr('href', rootURL + '/' + unprocessedURL.substring(1, unprocessedURL.length));
    });
});

// --- Search ----------------------------------------------------------------------------------- //

function activateSearch() {
    jQuery('#search').addClass('is-active');
}

function deactivateSearch() {
    jQuery('#search').removeClass('is-active');
}

jQuery(function() {

    // Deactivates search by clicking elsewhere on the page
    jQuery(document.body).click(function(e) {
        deactivateSearch();
    });

    // Activates search by clicking on the button
    jQuery('.search__button').on('click',function(e){
        e.stopPropagation();
        deactivateHamburger();
        jQuery('#search').toggleClass('is-active');
    });

    // Do not deactivate when clicking on the bar
    jQuery('.search__bar').on('click',function(e){
        e.stopPropagation();
    });

});

// --- Jump-to scrolling feature ---------------------------------------------------------------- //

function jumpTo(target) {
    var targetPosition = jQuery('#' + target).offset().top;
    var contentOffset = parseInt(jQuery('#content').css('padding-top'));
    jQuery('html, body').animate({scrollTop: (targetPosition - contentOffset)}, 750);
}

// --- Improve pagination ----------------------------------------------------------------------- //

jQuery(function(){
    
    // Check if pagination exists
    var pagination = jQuery('.loop__pagination');
    if (pagination.length > 0) {
        var html = '<li id="jump-to-page">' +
                        '<span class="jump-to-page__label">Jump to page</span>' +
                        '<input type=text class"jump-to-page__input" placeholder="#" />' +
                        '<a class="next page-numbers jump-to-page__go">Go »</a>' +
                    '</li>';
        pagination.find('ul').append(html);
    }

    jQuery('.jump-to-page__go').on('click', function(){
        jumpToPage();
    });

});

function jumpToPage() {
    try {

        var pageNum = jQuery('#jump-to-page input').val();
        var currentURL = location.href;

        if (currentURL.indexOf('/page') > -1) {
            currentURL = currentURL.substring(0, currentURL.indexOf('/page'));
        }

        var newURL = currentURL + '/page/' + pageNum;
        location.replace(newURL);

    }
    catch (e) {}
}

// --- Generate tabbed interfaces on posts and pages -------------------------------------------- //

jQuery(function() {
    
    // Check if page is tabbed
    if (jQuery('.post--tabbed').length > 0) {
        
        // Generate tab controls container
        jQuery('.post__content').prepend('<div class="tab-controls"></div>')
        var tabControls = jQuery('.tab-controls');
        
        // Assign tab number to every element
        var contentElements = jQuery('.post__content > *');
        if (contentElements.length > 0) {

            var currentBlock = 0;
            contentElements.each(function() {
                        
                // Generate tab control
                if (jQuery(this).hasClass('tab')) {
                    currentBlock++;
                    tabControls.append('<a class="tab-control" tab-number="' + currentBlock + '" tab-code="' + jQuery(this).html().toLowerCase().replace(/\s/g , "-") + '">' + jQuery(this).html() + '</a>');
                }
                
                // Assign grouping
                jQuery(this).addClass('tab-numbered', currentBlock);
                jQuery(this).attr('tab-number', currentBlock);


            });

            // Release excepted elements
            jQuery('.tab-controls, .addtoany_share, .post__footer').removeClass('tab-numbered');

        }

        // Display first tab
        var hash = window.location.hash;
        hash = hash.substring(1, hash.length);
        var url = window.location.href;

        setTimeout(function(){
            if (hash) {
                // console.log('hash: ' + hash);
                // console.log(jQuery('.tab-control[tab-code=' + hash +']'));
                // console.log(jQuery('.tab-control[tab-code=' + hash +']').attr('tab-number'));
               

                if (url.indexOf("/bm") > -1) {
                    if (hash === "contact-form" ) {
                        hashBM = "borang-maklumat-untuk-dihubungi";
                    }else if (hash === "contact-numbers") {
                        hashBM= "nombor-untuk-dihubungi";
                    }else if (hash === "our-location") {
                        hashBM = "lokasi-kami";
                    }
                    displayTabNo(jQuery('.tab-control[tab-code=' + hashBM +']').attr('tab-number'));
                }else {
                    displayTabNo(jQuery('.tab-control[tab-code=' + hash +']').attr('tab-number'));
                }
            }
            else {
                displayTabNo(1);
            }
        }, 10);
    }

    jQuery('.tab-control').click(function() {
        displayTabNo(jQuery(this).attr('tab-number'));
    });

});

function displayTabNo(index) {
    jQuery('.tab-control').removeClass('active');
    jQuery('.tab-control[tab-number=' + index + ']').addClass('active');
    jQuery('.tab-numbered').css('display', 'none');
    jQuery('.tab-numbered[tab-number=' + index + ']').attr('style', '');
}

// --- Hide 'All' tabs in FAQ plugin ------------------------------------------------------------ //

function hideAll() {
    var target = jQuery('.qe-faqs-filters-container .qe-faqs-filter:eq(1)');
    target.parent('li').addClass('active').siblings().removeClass('active');
    var allFAQs = jQuery( '.qe-faq-toggle'),
    filterSelector = target.attr( 'data-filter' );
    allFAQs.not( filterSelector ).hide().end().filter( filterSelector ).show();
}

// --- Remove colons at the end of job descriptions --------------------------------------------- //

jQuery(function() {

    var jobDescLabels = jQuery('.awsm-job-specification-label');
    if ( jobDescLabels.length > 0 ) {
        jobDescLabels.each(function() {
            var actualLabel = jQuery(this).find('strong');
            var amendment = actualLabel.html();
            amendment = amendment.substring(0, amendment.indexOf(':'));
            actualLabel.html(amendment);
        });
    }

});

// --- Contact Form 7: Convert some text input fields to radio buttons -------------------------- //

jQuery(function() {
    
    // Generate radio-button fields
    var textToRadioFields = jQuery('.wdform-element-section.to-radio');
    if ( textToRadioFields.length > 0 ) {
        textToRadioFields.each(function() {
            
            var radioID = jQuery(this).closest('.wdform_row').attr('wdid');
            var options = jQuery(this).find('input').attr('placeholder').split('; ');
            var html = '';

            var i;
            for (i = 0; i < options.length; i++) {
                var output = '<div class="to-radio__option"><input type="radio" id="option-' + i + '" name="for-radio-id-' + radioID + '" value="option-' + i + '"><label for="option-' + i + '">' + options[i] + '</label></div>';
                html += output;
            }
            
            textToRadioFields.after('<div class="to-radio">' + html + '</div>');
            jQuery(this).addClass('converted-to-radio');

        });
    }

    // Change actual-field values from their radio-button dummies
    jQuery('.converted-to-radio + .to-radio input[type=radio]').change(function() {
        var value = jQuery(this).siblings('label').eq(0).html();
        var actualField = jQuery(this).closest('.to-radio').siblings('.converted-to-radio').find('input[type=text]').eq(0);
        console.log('Value: ' + value);
        console.log(actualField);
        actualField.val(value);
    });

});

// --- Contact Form 7: Convert some text input fields to dropdown ------------------------------- //

jQuery(function() {
    
    // Generate dropdown fields
    var textToDropdown = jQuery('.wdform-element-section.to-dropdown');
    if ( textToDropdown.length > 0 ) {
        textToDropdown.each(function() {
            
            var dropdownID = jQuery(this).closest('.wdform_row').attr('wdid');
            var options = jQuery(this).find('input').attr('placeholder').split('; ');
            var html = '<select id="to-dropdown__dropdown"><option hidden disabled selected value>  </option>';

            var i;
            for (i = 0; i < options.length; i++) {
                var output = '<div class="to-dropdown__option">'+
                                    '<option id="option-' + i + '" value=" '+ options[i] + '">'+ options[i] + 
                                    '</option>';
                                '</div>';

                html += output;
            }
            
            textToDropdown.after('<div class="to-dropdown">' + html + '</div>');
            jQuery(this).addClass('converted-to-dropdown');

        });
    }

    // Change actual-field values from their dropdown dummies
    jQuery('.converted-to-dropdown + .to-dropdown select').change(function() {
        var value = jQuery(this).find('option:selected').eq(0).html();
        var actualField = jQuery(this).closest('.to-dropdown').siblings('.converted-to-dropdown').find('input[type=text]').eq(0);
        console.log('Value: ' + value);
        console.log(actualField);
        actualField.val(value);
    });

});


// --- Contact Form 7: Delay access to interact with map on page load. -------------------------- //
// ------------------- This is to avoid unwanted scrolling. ------------------------------------- //

jQuery(function(){

    var googleMap = jQuery('iframe[src*="google.com/maps"]');
    var delay = 3000; // In miliseconds

    if (googleMap.length > 0) {
        setTimeout(function(){
            googleMap.css('pointer-events', 'initial');
        }, delay);
    }

});

// --- Range Input Slider with Tooltip ---------------------------------------------------------- //

jQuery(function() {
    jQuery('#loan-period').on('input', function () {
        jQuery('#loan-period--value').html(this.value);
    });
});


// --- e-Mandate Payment ------------------------------------------------------------------------ //

jQuery(function(){
    if (jQuery('body').hasClass('page-template-mandate-sign-up-template')) {
        try {
            
            // Get form
            var form = jQuery('#header ~ .form').eq(0);
            
            // Assign ID and render as container
            form.attr('id', 'mandate-form').addClass('container');

            // Style note
            form.find('input[type="hidden"] + span').addClass('is-faded');

            // Style asterisks
            form.find('label').each(function(){
                if (jQuery(this).html().indexOf('*') > 0) {
                    jQuery(this).html(jQuery(this).html().replace('*', '<span class="asterisk">*</span>'))
                }
            });
            
            // Identify radio wrapper
            form.find('label[for="idType"][class]').parent().addClass('radio-wrapper');
            
            // Identify submit button
            form.find('#submit').addClass('button button--l');

        }
        catch (e) {}
    }
});

jQuery(function(){
	jQuery('.emailForm input').attr('maxlength','64')
});
