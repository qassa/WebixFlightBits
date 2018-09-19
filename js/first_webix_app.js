document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var path = "resource/";

    webix.ui({
        view: "layout",
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
                        cols: [{
                            id: "add",
                            view: "button",
                            type: "image",
                            label: "Добавить",
                            image: path + "add.png",
                            click: ("$$('my_win').show();"),
                            height: 40,
                            width: 150,
                        }, {
                            id: "edit",
                            view: "button",
                            type: "image",
                            label: "Изменить",
                            image: path + "edit.png",
                            height: 40,
                            width: 150
                        }, {
                            id: "remove",
                            view: "button",
                            type: "image",
                            label: "Удалить",
                            image: path + "remove.png",
                            height: 40,
                            width: 150
                        }, {

                        }, {
                            view: "search",
                        }]
                    }, {
                        view: "scrollview",
                        id: "table",
                        body: {}
                    }]
                }, {
                    view: "layout",
                    padding: 10,
                    rows: [{
                        template: "<img src='resource/fly_boeing.jpg' style='width:225px; padding:10px'/>",
                    }, {
                        view: "scrollview",
                        id: "detail",
                        scroll: "y",
                        body: {
                            rows: [{
                                view: "label",
                                template: "№",
                            }, {
                                view: "text",
                                value: "32",
                            }, {
                                view: "label",
                                template: "Тип воздушного судна",
                            }, {
                                view: "text",
                                value: "BlindJet 543",
                            }, {
                                view: "label",
                                template: "Техническое состояние",
                            }, {
                                view: "text",
                                value: "A-check 23.08.18",
                            }, {
                                view: "label",
                                template: "Крейсерская скорость",
                            }, {
                                view: "text",
                                value: "850",
                            }, {
                                view: "label",
                                template: "Грузоподъемность",
                            }, {
                                view: "text",
                                value: 47000,
                            }]
                        }
                    }]
                }]
            }]
        }]
    });

    webix.ui({

        view: "window",
        modal: true,
        position: "center",
        width: 751,
        id: "my_win",
        head: {
            view: "button",
            label: "Закрыть",
            align: "right",
            width: 70,
            click: ("$$('my_win').hide();")
        },
        body: {
            view: "layout",
            padding: 5,
            rows: [{
                cols: [{
                    view: "label",
                    template: "№"
                }, {
                    view: "label",
                    template: "Тип воздушного судна",
                }, {
                    view: "label",
                    template: "Превью"
                }],
            }, {
                cols: [{
                    view: "text",
                    width: 200,
                }, {
                    view: "text",
                    width: 200
                }, {
                    view: "button",
                    label: "Выбрать файл...",
                    width: 200
                }]
            }, {
                cols: [{
                    view: "label",
                    template: "Техническое состояние"
                }, {
                    view: "label",
                    template: "Крейсерская скорость",
                }, {
                    view: "label",
                    template: "Грузоподъемность"
                }],
            }, {
                cols: [{
                    view: "text",
                    width: 200
                }, {
                    view: "text",
                    width: 200
                }, {
                    view: "text",
                    width: 200
                }],
            }, {
                cols: [{
                    view: "label",
                    template: "Максимальная высота полета"
                }, {
                    view: "label",
                    template: "Дальность полета",
                }, {
                    view: "label",
                    template: "Уровень топлива"
                }],
            }, {
                cols: [{
                    view: "text",
                    width: 200
                }, {
                    view: "text",
                    width: 200
                }, {
                    view: "text",
                    width: 200
                }],
            }, {
                cols: [{
                    view: "label",
                    template: "Авиакомпания"
                }]
            }, {
                cols: [{
                    view: "text",
                    width: 200
                }]
            }, {
                view: "button",
                label: "Сохранить",
                width: 95,
                align: "center"
            }]
        }

    });

    webix.ui({
            padding: 10,
            cols: [{
                view: "button",
                value: "Авиатехника",
                height: 53,
                width: 150
            }, {
                view: "button",
                value: "Рейсы",
                height: 53,
                width: 150
            }, {
                view: "button",
                value: "Персонал",
                height: 53,
                width: 150
            }, {
                view: "button",
                value: "Пассажиры",
                height: 53,
                width: 150
            }, {
                view: "button",
                value: "График рейсов",
                height: 53,
                width: 150
            }, ]
        },
        $$("views_container"))

    //заполнить таблицу элементом tableview
    webix.ui({
            view: "datatable",
            //обязательное свойство autoheight, без него таблица не будет загружена
            select: "row",
            resizeColumn: true,
            columns: [{
                id: "id",
                template: "{common.checkbox()}",
                header: "",
                width: 50
            }, {
                id: "number_data",
                header: "№",
                //width: 150
            }, {
                id: "type_vs_data",
                header: "Тип воздушного судна",
                width: 170
            }, {
                id: "preview_data",
                template: "<img src='resource/#preview_data#.jpg' style='width:35px'/>",
                header: "Превью",
                width: 170
            }, {
                id: "techstate_data",
                header: "Техническое состояние",
                width: 220,
            }, {
                id: "cruiserSpeed_data",
                header: "Крейсерская скорость",
                width: 220,
            }, {
                id: "maxWeightCapacity_data",
                header: "Грузоподъемность",
                width: 170,
            }, {
                id: "maxFlightHeight_data",
                header: "Максимальная высота полета",
                width: 250,
            }, {
                id: "distance_data",
                header: "Дальность полета",
                width: 170,
            }, {
                id: "fuelState_data",
                header: "Уровень топлива",
                width: 170,
            }, {
                id: "airCompanyOwner_data",
                header: "Авиакомпания",
                width: 170,
            }],
            data: datatable
        },
        $$("table"));

    //$$("my_win").show();
}