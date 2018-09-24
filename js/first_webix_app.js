document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var path = "resource/";

    webix.ui({
        id: "my_layout",
        view: "layout",
        rows: [{
            view: "layout",
            id: "main_layout",
            rows: [{
                id: "views_container",
            }, {
                cols: [{
                    view: "richselect",
                    value: 1,
                    options: field_select,
                    width: 200
                }, {
                    view: "richselect",
                    value: 1,
                    options: condition_select,
                    width: 200
                }, {
                    view: "text",
                    value: "Значение фильтра",
                    width: 200
                }, {
                    view: "richselect",
                    value: 1,
                    options: records_select,
                    width: 200
                }, {
                    view: "button",
                    value: "Применить",
                    type: "form",
                    width: 100
                }, {
                    view: "button",
                    value: "Сбросить",
                    type: "form",
                    width: 100
                }]
            }, {
                view: "layout",
                rows: [{
                    cols: [{
                        view: "layout",
                        gravity: 2.2,
                        height: 500,
                        scrollY: true,
                        padding: 10,
                        rows: [{
                            type: "header",
                            id: "header",
                            template: "Авиатехника",
                            css: {
                                "font-family": "Tahoma",
                                "font-size": "22px",
                                "text-align": "center"
                            }
                        }, {
                            id: "tools",
                        }, {
                            view: "scrollview",
                            id: "table_scroll",
                            body: {}
                        }]
                    }, {
                        id: "detail_container",
                    }]
                }]
            }]
        }]
    });

    //$$("my_win").show();
}