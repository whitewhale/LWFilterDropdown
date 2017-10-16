# LWFilterDropdown
Dynamically add options to a dropdown selector using the data-attributes from a set of elements.

The appropriate elements will be hidden and displayed when an option is selected.

This lets you do things in the LiveWhale widget format like `data-filter-tag="{tags}"` and the tags will automatically appear in the dropdown selector.

Note: 

- This plugin requries jQuery to be loaded prior to loading this plugin.

- It includes Isotope.js to animate the filtered itemshttp://isotope.metafizzy.co/


## Usage:

1. Place the filterable elements inside a container and call .filterDropdown() on the container.

2. Add a data attribute to each element, containing the filterable value
   
   `data-filter-[name]="value|value one|value two"`

   - **[name]** is the identifier, ex: data-filter-color, data-filter-orientation
   - Attribute values can contain spaces
   - Different values are separated by pipes

3. Then add a select element to the page with id #filter-[name]
    	
    ~~~~
    <div class="filter">
     <label for="filter-color">Sort by color:</label>
     <select id="filter-color" name="photo-color"></select>
    </div>
    ~~~~
    
   - **[name]** is the same identifier.
   - You can place it anywhere you like on the page.


4. To add mutiple filters to the page, use a different [name] for each filter and data-attribute pair.

5. If there are multiple filters on the page, selecting a choice from each filter can sometimes yield no results. You can customize message shown when there are no results by passing the item type when you call the plugin:

   `$('.photo-container').filterDropdown('photos')`

   will display message "There are no photos matching your selection"
