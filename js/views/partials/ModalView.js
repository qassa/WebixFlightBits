function ModalView() {
    this.table;
    let that = {}
    that.controller;
    that.table;
    that.modalNode;
    let insertName = "my_win";

    //одновременно может быть отображено только 1 модальное окно
    //функция заполнения элементами редактирования
    this.fillModal = function() {
        let action = this.config.id;
        keys = that.controller.getDisplayKeys();

        if (action == "add") {
            displayElements(that.modalNode, keys);

            //вставка кнопки подтверждения
            create("div", that.modalNode, true).attr("id", "new_line");
            let save = create("input", that.modalNode, true).attr("type", "button", true).attr("class", "save_button", true).attr("value", "Сохранить");
            save.addEventListener("click", saveRec);
        }
        if (action == "edit") {
            displayElements(that.modalNode, keys);
            //заполнение модели данными из TablePartialView
            //dataToElements(modalNode);
            editRec(lastSelect);

            create("div", that.modalNode, true).attr("id", "new_line");
            let save = create("input", that.modalNode, true).attr("type", "button", true).attr("class", "save_button", true).attr("value", "Сохранить");
            save.addEventListener("click", editSubmit);
        }
        if (action == "remove") {
            //вывод окна подтверждения
            confirmRemove(that.modalNode);
        }

        //навесить обработчик нажатия на закрытие окна 1 раз
        modalClose = byId("close_modal");
        modalClose.addEventListener('click', function() {
            that.modalNode.style.display = "none";
            (byId("fon")).style.display = "none";
            //удалить содержимое
            while (that.modalNode.firstChild) {
                that.modalNode.removeChild(that.modalNode.firstChild);
            }
        });

        //отобразить окно
        that.modalNode.style.display = "block";
        byId("fon").style.display = "block";

        modalCoords();
    }

    editRec = function(id) {
        if (id != -1) {
            rec = that.controller.read(id);

            keys = that.controller.getDisplayKeys();
            for (var key in keys) {
                for (var field of that.modalNode.childNodes) {
                    if (field.childNodes.length > 0)
                        for (var input of field.childNodes)
                            if (input.tagName == "INPUT" && input.type == "text") {
                                name = gattr(input, "name");
                                name = name.substring(0, name.indexOf("_edit"));
                                if (name != "null")
                                    if (name == key)
                                        input.setAttribute("value", rec[key].value);
                            }
                }
            }
        }
    }

    extractData = function() {
        var elems = that.modalNode.getElementsByTagName("INPUT");
        max = elems.length;
        for (i = 0; i < max; i++) {
            elem = elems[i];
            if (elem.getAttribute("type") == "text")
            //убрать edit в имени элемента
                name = elem.getAttribute("name");
            begin = name.indexOf("_edit");
            name = name.substring(0, name.length - (name.length - begin));
            record[name] = elem.value;
        }
    }

    editSubmit = function() {
        record = {};

        extractData();
        record["id"] = lastSelect;

        record = that.controller.update(record);
        //обновить запись в таблице
        that.table.updateRecord(record);
    }

    this.setTable = function(obj) {
        this.table = obj;
        that.table = obj;
    }

    function saveRec() {
        record = {};

        extractData();
        that.controller.create(record);
    }

    function displayElements(modalNode, keys) {
        renderCloseButton(modalNode);

        //rendering элементов ввода данных
        var position = 0,
            i = 0;

        for (var elem in keys) {
            var edit_value = create("div", modalNode, true).attr("class", "edit_field", true).inH(keys[elem].name + "<br>", false);
            var input;
            if (keys[elem].type == "text" || keys[elem].type == "numeric")
                input = create("input", edit_value, true).attr("type", "text", true).attr("name", elem + "_edit", false);

            if (keys[elem].type == "image") {
                input = create("input", edit_value, true).attr("type", "button", true).attr("value", "Выбрать файл...", true).attr("name", elem + "_edit", false);
            }
            i++;

            //в каждой строке расположены по 3 элемента редактирования
            position++;
            if (position >= 3) {
                //перенос на строку
                position = 0;
                create("div", modalNode, true).attr("id", "new_line");
            }
        }
    }

    function renderCloseButton(modalNode) {
        //rendering кнопки закрытия Popup
        var div = document.createElement("div");
        div.setAttribute("id", "close_modal");
        modalNode.appendChild(div);
        var img = document.createElement("img");
        img.setAttribute("src", "resource/close_modal.png");
        div.appendChild(img);
    }

    //перерасчет координат левого верхнего угла для блока modal_text
    function modalCoords() {
        //найти блок с данными, определить его ширину
        modalWidth = that.modalNode.clientWidth;
        modalHeight = that.modalNode.clientHeight;
        //взять ширину доступную для отбражения в окне браузера
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        //определить координаты левой верхней точки
        that.modalNode.style.left = (windowWidth / 2) - (modalWidth / 2);
        that.modalNode.style.top = (windowHeight / 2) - (modalHeight / 2);

        modalWidth = that.modalNode.clientWidth;

        //установить положение для элемента close_modal
        modalClose = byId("close_modal");
        modalClose.style.left = modalWidth - 30;
    }

    function confirmRemove(modalNode) {
        renderCloseButton(modalNode);


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