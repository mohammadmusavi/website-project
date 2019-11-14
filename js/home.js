$(document).ready(init);

function init() {
    (function(H) {
        var app = {
            'cache': {
                '$contact_btn': $('#contact-us-btn'),
                '$main_tag': $('#main-content'),
                'contact_us': $('#contact-us').html(),
                '$bottom_header': $('#bottom-header'),
                'userTemplate': $('#user-template').html(),
                '$carousel_inner': $('#carousel-inner'),
                'carousel_template': $('#carousel-template').html(),
            },
            'start': function() {
                this.ajaxengine('GET', 'https://api.myjson.com/bins/1fkqdo', app.ajaxsuccess.header);
                this.ajaxengine('GET', 'https://api.myjson.com/bins/et5gt', app.ajaxsuccess.carousel);
                this.eventListner();
            },
            'eventListner': function() {
                this.cache.$contact_btn.click(function() {
                    app.cache.$main_tag.empty();
                    app.ajaxengine('GET', 'https://api.myjson.com/bins/1fkqdo', app.ajaxsuccess.contact_form);
                })
            },
            'ajaxengine': function(method, url, callback) {
                $.ajax({
                    'type': method,
                    'url': url,
                    'success': callback
                });
            },
            'ajaxsuccess': {
                'header': function(data) {
                    var template = H.compile(app.cache.userTemplate);
                    app.cache.$bottom_header.html(template(data));
                },
                'carousel': function(data) {
                    var template = H.compile(app.cache.carousel_template);
                    app.cache.$carousel_inner.html(template(data));
                },
                'contact_form': function(data) {
                    var template = H.compile(app.cache.contact_us);
                    app.cache.$main_tag.html(template(data));
                }
            }
        }
        app.start();
    })(Handlebars);

    $('#myTable').DataTable({
        "ajax": "https://api.myjson.com/bins/1fkqdo",
        "columns": [{
                "data": "img",
                "render": function(data) {
                    return '<img src="' + data + '" >';
                }
            },
            { "data": "company" },
            { "data": "loc" },
            { "data": "posted" },
            { "data": "title" },
            { "data": "type" },
            { "data": "salary" }
        ],
    });

}