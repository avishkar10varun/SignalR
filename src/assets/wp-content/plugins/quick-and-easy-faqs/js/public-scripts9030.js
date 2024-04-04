(function( $ ) {
	'use strict';

    /**
     * FAQ's setup
     * 
     * Remove .nojs from .qe-faq-toggle elements, and collapse all expanded
     * elements
     */
    $(function() {
    
    // var all_filters = $('.qe-faqs-filters-container li');
    // if ((all_filters.length > 1) && (all_filters.eq(0).hasClass('active')) && (all_filters.eq(0).find('a').attr('data-filter') == '*')) {
    //     all_filters.eq(1).addClass('active');
    //     all_filters.eq(1).find('.qe-faqs-filter').trigger('click');
    //     all_filters.eq(0).remove();
    // }
	
    var all_toggles = $('.qe-faq-toggle');
	all_toggles.addClass( 'no-animation' );
    all_toggles.removeClass( 'nojs active' );
	all_toggles.find('i.fa').remove();

    // Destroy uncategorised FAQs
    $('div[class="qe-faq-toggle  no-animation"]').remove();

    // Prepare filters and sort
    setTimeout(function() {
        var activeFilterCode = $('.qe-faqs-filters-container > li.active a').attr('parental-code');
        resetSubheadings(activeFilterCode);
        sortFAQs();
    }, 100);

    });

    /**
     * FAQs Toggles
     */
    $(function() {
        $('.qe-toggle-title').click(function () {
            var parent_toggle = $(this).closest('.qe-faq-toggle');
            parent_toggle.toggleClass( 'active' ).find( '.qe-toggle-content' ).slideToggle(250);
        });
    });

    /**
     * FAQs Filter
     */
    $(function() {
        $('.qe-faqs-filter').click( function ( event ) {
            
            event.preventDefault();
            $(this).parents('li').addClass('active').siblings().removeClass('active');
            var filterSelector = $(this).attr( 'data-filter' );
            var allFAQs = $( '.qe-faq-toggle' );
            if ( filterSelector == '*' ) {
                allFAQs.show();
            } else {
                allFAQs.not( filterSelector ).hide().end().filter( filterSelector ).show();
            }

            resetSubheadings($(this).attr('parental-code'));

        });
    });

    function compareFAQsOrder(faq1, faq2) {
        return ($(faq1).attr('slug')) > $(faq2).attr('slug') ? 1 : -1;
    }

    function sortFAQs() {
        var container = $('.qe-faqs-filterable');
        var items = $('.qe-faqs-filterable > *');
        items.sort(compareFAQsOrder).appendTo(container);
    }

    function resetSubheadings(parent) {
        var parentalCode = parent;
        $('.qe-faqs-subheading').css('display', 'none');
        $('.qe-faqs-subheading[parent=' + parentalCode + ']').css('display', 'block');
    }

})( jQuery );
