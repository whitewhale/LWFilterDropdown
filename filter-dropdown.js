/* FILTER DROPDOWN JQUERY PLUGIN
https://github.com/whitewhale/LWFilterDropdown
*/

;(function($) {

  $.fn.filterDropdown = function(itemType) {

    // Get the set of matched elements
    var $container = this;
    var $elements = this.children();

    // Load Isotope plugin and cache it
    $.ajax({
      url: 'https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js',
      dataType: 'script',
      cache: true
    }).done(function(){ // once the script has loaded
      $container.isotope(); // initialize Isotope before any filter option is selected (otherwise animation doesn't run on first selection)
      $container.css('min-height', '50px'); // prevents isotope setting 0 height when no-results message shows
    });

    // Search matched elements for data attributes starting with "data-filter-"
    var filters = [];
    $elements.each( function(){
      $.each(this.attributes, function() {
        if(this.name.indexOf('data-filter') === 0 ) {
          var key = this.name.replace( 'data-filter-', '' );
          filters.push(key);
        }
      });
    });

    // Add unique data-filter names to an array, only if they have an associated selector element
    filters = filters.filter(function(itm,i){
      if ( $('#filter-'+filters[i]).length ) {
        return i == filters.indexOf(itm);
      }
    });


    // For each filter
    for ( var i = 0; i < filters.length; i++ ) {

      // Check each element for filter values. Allow whitespace and commas within values
      var values = [];
      $elements.each(function() {
        var filterValue = $(this).attr('data-filter-'+filters[i]);
        if ( filterValue ) {
          $.merge( values, filterValue.split('|'));
        }
      });

      // Add unique data-filter values to array
      values = values.filter(function(itm,i){
        return i == values.indexOf(itm);
      });

      // Append each unique value to the selector element
      for ( var j = 0; j < values.length; j++) {
        var value = values[j];
        if (value.trim().length) {
          $('<option/>').val(value).html(value).appendTo('#filter-'+filters[i]);
        }
      }

      //  When a filter is selected, hide non-relevent elements from the set of matched elements
      $('#filter-'+filters[i]).on('change', function() {

        // Remove no results message
        $('.filter-no-results').remove();

        // Remove class that hides elements
        $elements.removeClass('filter-out');

        // Evaluate each filter
        $.each(filters, function(i, name) {

          // Get selected filter option
          var selected = $('#filter-'+name).val();

          // If selected option is not "all" or empty
          if ( selected != 'all' && selected !== '') {

            // For all elements with a matching data attribute
            $elements.filter('[data-filter-'+name+']').each(function() {

              // Find the data attribute value
              var str = $(this).attr('data-filter-'+name);

              // Check if selcted option matches the value, looking for pipes between multiple values
              var regex = '\(?:^|\\|)'+selected+'(?:$|\\|)';
              if( !(new RegExp(regex).test(str)) ){

                // Add class to non-matching elements
                $(this).addClass('filter-out');
              }

            });
          }
        });

        // Get all unselected elements
        var $unselected = $elements.filter('.filter-out');

        // Show no results message if no elements are selected
        if ( $unselected.length == $elements.length ) {
          var items = (itemType) ? itemType : 'items';
          $elements.first().before('<p class="filter-no-results">Sorry, there are no '+items+' matching your selection.</p>');
        }

        // IF JQUERY ISOTOPE HAS LOADED SUCCESSFULLY
        if ( jQuery().isotope ) {

          // Use Isotope's filter function to display the selected items
          $container.isotope({filter: '*:not(.filter-out)'});
        }

        // IF JQUERY ISOTOPE HAS NOT LOADED
        else {

          // Use jQuery functions to show and hide the selected items
          $elements.show();
          $unselected.hide();
        }
      });
    }
  };

}(livewhale.jQuery));
