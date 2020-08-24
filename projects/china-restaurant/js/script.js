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
    // category snippet url
    const categoryHtml = 'snippets/category-snippet.html';

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

    showLoading('#main-content');
    // feching the home page snippet via ajax
    fetch(homeHtml).then(function (response) {
        return response.text();
    }).then(function (text) {
        insertHtml('#main-content', text);
    });

    // Load the menu categories view
    dc.loadMenuCategories = function () {
        showLoading('#main-content');
        fetch(allCategoriesUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            buildAndShowCategoriesHTML(json);
        });
    }
    // Getting the h2 title of categories page to populate it
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

    // Exposing dc objecto to the global window
    global.$dc = dc;
})(window);