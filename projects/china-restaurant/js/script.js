// Afrer the DOMContentLoaded
$(function () {
    // Toggle nav  menu on collaspe state when it losses focus
    $('.navbar-toggler').on('blur', function () {
        if (window.innerWidth < 768) {
            $('#navbarSupportedContent').collapse('hide');
        }
    });
});

//Dynamically load page content
(function (global) {
    const dc = {};
    // Home page url snippet
    const homeHtml = 'snippets/home-snippet.html';
    // json CDN
    const allCategoriesUrl = 'https://davids-restaurant.herokuapp.com/categories.json';
    // categories title snippet url
    const categoriesTitleHtml = 'snippets/categories-title-snippet.html';
    // category template snippet url
    const categoryHtml = 'snippets/category-snippet.html';
    //json for menu items CDN
    const menuItemsUrl = 'https://davids-restaurant.herokuapp.com/menu_items.json?category=';
    // menu items title snippet
    const menuItemsTitleHtml = 'snippets/menu-items-title.html';
    // menu items template snippet
    const menuItemsHtml = 'snippets/menu-items.html';

    //function for inserting data provided the selector and the html
    const insertHtml = function (selector, html) {
        const targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    //Show loading icon inside element identifier selector
    const showLoading = function (selector) {
        let html = '<div class="text-center">';
        html += '<img src="images/ajax-loader.gif"></div>';
        insertHtml(selector, html);
    }

    // return substitute id {{propName}} with propValue
    const insertProperty = function (string, propName, propValue) {
        let str = `{{${propName}}}`;
        return string.replace(new RegExp(str, 'g'), propValue);
    }

    // checks if there is a price value and appends it with $ sign
    const insertItemPrice = function (string, pricePropName, priceValue) {
        let price = (priceValue) ? `$${priceValue.toFixed(2)}` : '';
        return insertProperty(string, pricePropName, price);
    }

    // checks if there is a portion value and appends it in parenthesis
    const insertItemPortionName = function (string, portionPropName, portionValue) {
        let portion = (portionValue) ? `(${portionValue})` : '';
        return insertProperty(string, portionPropName, portion);
    }

    const toggleActiveNavigation = function (navItemId) {
        // Remove the active class from all the navigation items
        const navPages = document.querySelectorAll('#nav-list li');
        navPages.forEach(function (navItem) {
            navItem.classList.remove('active');
        });
        // Add active class to the item with the id provided
        document.querySelector(`#${navItemId}`).classList.add('active');
        
    }
    
    // Home page loading
    dc.loadHome = function () {
        showLoading('#main-content');
        toggleActiveNavigation('nav-home-item');
        // feching the home page snippet via ajax
        fetch(homeHtml).then(function (response) {
            return response.text();
        }).then(function (text) {
            insertHtml('#main-content', text);
        });
    }
    

    // Load the menu categories view
    dc.loadMenuCategories = function () {
        showLoading('#main-content');
        toggleActiveNavigation('nav-menu-item');
        fetch(allCategoriesUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            buildAndShowCategoriesHTML(json);
        });
    }

    // Load the menu items view
    // parameter of category short is getting the menu item needed json
    dc.loadMenuItems = function (categorySort) {
        showLoading('#main-content');
        fetch(menuItemsUrl + categorySort).then(function (response) {
            return response.json();
        }).then(function (json) {
            buildAndShowMenuItemsHTML(json);
        });
    }

    // Getting the title and the template of categories page to populate the html
    function buildAndShowCategoriesHTML(categories) {
        fetch(categoriesTitleHtml).then(function (response) {
            console.log(response);
            return response.text();
        }).then(function (CategoriesTitleHtml) {
            // Getting the category template in order to dynamically populate via the json
            fetch(categoryHtml).then(function (resp) {
                return resp.text();
            }).then(function (categoryHtml) {
                const categoriesViewHtml = buildCategoriesViewHtml(categories, CategoriesTitleHtml, categoryHtml);
                insertHtml('#main-content', categoriesViewHtml);
            });
        });
    }

    // Getting the title and the template of menu items page to populate the html
    function buildAndShowMenuItemsHTML(categoryMenuItems) {
        fetch(menuItemsTitleHtml).then(function (response) {
            console.log(response);
            return response.text();
        }).then(function (menuItemsTitleHtml) {
            // Getting the category template in order to dynamically populate via the json
            fetch(menuItemsHtml).then(function (resp) {
                return resp.text();
            }).then(function (menuItemHtml) {
                const menuItemsViewHtml = buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml);
                insertHtml('#main-content', menuItemsViewHtml);
            });
        });
    }

    // Inserting to the categories page, after the title, a new category based on the template, populated via json
    function buildCategoriesViewHtml(categories, CategoriesTitleHtml, categoryHtml) {
        let finalHtml = CategoriesTitleHtml;
        finalHtml += '<section class="row">';

        // Loop over categories
        for (let i = 0; i < categories.length; i++) {
            let html = categoryHtml;
            let name = '' + categories[i].name;
            let short_name = categories[i].short_name;
            html = insertProperty(html, 'name', name);
            html = insertProperty(html, 'short_name', short_name);
            finalHtml += html;
        }

        finalHtml += '</section>';
        return finalHtml;
    }

    // Inserting to the categories page, after the title, a new category based on the template, populated via json
    function buildMenuItemsViewHtml(categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
        // Populate the title first from the json data
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, 'name', categoryMenuItems.category.name);
        menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, 'special_instructions', categoryMenuItems.category.special_instructions);

        // Start to populate every item
        let finalHtml = menuItemsTitleHtml;
        finalHtml += '<section class="row">';

        // Loop over categories
        const menuItems = categoryMenuItems.menu_items;
        for (let i = 0; i < menuItems.length; i++) {
            let html = menuItemHtml;
            html = insertProperty(html, 'short_name', menuItems[i].short_name);
            html = insertProperty(html, 'catShortName', categoryMenuItems.category.short_name);
            html = insertItemPrice(html, 'price_small', menuItems[i].price_small);
            html = insertItemPortionName(html, 'small_portion_name', menuItems[i].small_portion_name);
            html = insertItemPrice(html, 'price_large', menuItems[i].price_large);
            html = insertItemPortionName(html, 'large_portion_name', menuItems[i].large_portion_name);
            html = insertProperty(html, 'name', menuItems[i].name);
            html = insertProperty(html, 'description', menuItems[i].description);
            finalHtml += html;
        }

        finalHtml += '</section>';
        return finalHtml;
    }

    // Exposing dc objecto to the global window
    global.$dc = dc;
})(window);

$dc.loadHome();