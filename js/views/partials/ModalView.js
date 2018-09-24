function ModalView() {
    this.table;
    let that = {}
    that.controller;
    that.table;
    that.modalNode;
    let insertName = "my_win";
    let modalEvent;

    //одновременно может быть отображено только 1 модальное окно
    //функция заполнения элементами редактирования
    this.fillModal = function() {
        let action = this.config.id;
        keys = that.controller.getDisplayKeys();

        if (action == "add") {
            displayElements();

            //обработчик события
            modalEvent = $$("modal_save").attachEvent("onItemClick", saveRec);
        }
        if (action == "edit") {
            //проверить, выделена ли строка
            if ($$("table").getSelectedItem() == undefined) {
                webix.message({
                    type: "debug",
                    text: "Не выбрана строка для редактирования",
                    expire: 2000
                })
            } else {
                displayElements();
                modalEvent = $$("modal_save").attachEvent("onItemClick", editSubmit);

                editRec();
            }
        }
        if (action == "remove") {
            //вывод окна подтверждения
            confirmRemove(that.modalNode);
        }
    }

    closeModal = function() {
        //отвязка обработчика события
        $$("modal_save").detachEvent(modalEvent);
        //сброс содержимого формы
        $$("modal_form").clear();
        $$("modal_button").define("label", "Выбрать файл...");
        $$("modal_button").refresh();
        //сокрытие формы
        $$('my_win').hide();
    }

    editRec = function() {
        let id = lastSelect;
        if (id != -1) {
            rec = that.controller.read(id);
            record = {};

            for (var key in rec) {
                record[key + "_edit"] = rec[key].value;
            }

            $$("modal_form").setValues(record);
        }
    }

    extractData = function() {
        let record = {};
        let fields = $$("modal_form").getValues();
        for (var field in fields) {
            //
            if (field != "id") {
                //
                begin = field.indexOf("_edit");
                name = field.substring(0, field.length - (field.length - begin));
                record[name] = fields[field];
            }
        }
        return record;
    }

    editSubmit = function() {
        let record = extractData();

        record = that.controller.update(record);
        //обновить запись в таблице
        that.table.updateRecord(record);

        closeModal();
    }

    this.setTable = function(obj) {
        this.table = obj;
        that.table = obj;
    }

    function saveRec() {
        let record = extractData();
        that.controller.create(record);

        closeModal();
    }

    function displayElements() {
        //rendering элементов ввода данных
        $$('my_win').show();
    }

    var render = function() {
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
                click: closeModal
            },
            body: {
                view: "form",
                padding: 5,
                id: "modal_form",
                elementsConfig: {
                    labelPosition: "top",
                },
                elements: [{
                    rows: [{
                        cols: [
                            { view: "text", label: "№", name: "number_edit" },
                            { view: "text", label: "Тип воздушного судна", name: "type_vs_edit" },
                            {
                                rows: [{
                                        view: "label",
                                        template: "Миниатюра судна",
                                    },
                                    {
                                        id: "modal_button",
                                        view: "button",
                                        label: "Выбрать файл...",
                                        height: 30,
                                        name: "preview_edit"
                                    }
                                ]
                            }
                        ],
                    }, {
                        cols: [
                            { view: "text", label: "Техническое состояние", name: "techstate_edit" },
                            { view: "text", label: "Крейсерская скорость", name: "cruiserSpeed_edit" },
                            { view: "text", label: "Грузоподъемность", name: "maxWeightCapacity_edit" },
                        ],
                    }, {
                        cols: [
                            { view: "text", label: "Максимальная высота полета", name: "maxFlightHeight_edit" },
                            { view: "text", label: "Дальность полета", name: "distance_edit" },
                            { view: "text", label: "Уровень топлива", name: "fuelState_edit" },
                        ],
                    }, {
                        cols: [
                            { view: "text", label: "Авиакомпания", name: "airCompanyOwner_edit" }, {}, {}
                        ],
                    }, {
                        cols: [{}, {
                            id: "modal_save",
                            view: "button",
                            label: "Сохранить",
                            width: 95,
                            align: "center"
                        }, {}],
                    }]
                }]
            }

        });
    }

    this.constructor = function() {
        View.call(this);
        this.setController();
        that.controller = this.controller;

        render();
        that.modalNode = $$("my_win");
    }

    this.constructor();
}