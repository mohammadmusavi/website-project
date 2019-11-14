$(document).ready(init);

function init() {
    (function(H) {
        var app = {
            'cache': {
                '$contact_btn': $('#contact-us-btn'),
                '$main_tag': $('#main-content'),
                'contact_us': $('#contact-us').html(),
                '$content_paginate': $('#content-paginate'),
                'paginate': $('#paginate').html()
            },
            'start': function() {
                this.ajaxengine('GET', 'https://api.myjson.com/bins/1f6qj1', app.ajaxsuccess.pagination);
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
                'pagination': function(data) {
                    var template = H.compile(app.cache.paginate);
                    app.cache.$content_paginate.html(template(data));
                    new $('.items-container').joldPaginator({
                        'perPage': 6,
                        'items': '.item',
                        'paginator': '.pagination-container',
                        'indicator': {
                            'selector': '.pagination-indicator',
                            'text': 'Showing item {start}-{end} of {total}',
                        }
                    });
                },
                'contact_form': function(data) {
                    var template = H.compile(app.cache.contact_us);
                    app.cache.$main_tag.html(template(data));
                }
            }
        }
        app.start();
    })(Handlebars);
}