function DetailedView() {
    this.preview;
    this.container;
    that = {};
    that.controller;
    let insertName = "detail_container";

    displayDetails = function() {

    }

    textResize = function() {
        var input = document.querySelectorAll('#stretch_text'),
            buffer = [];
        for (var i = 0; input.length > i; i++) {
            buffer[i] = document.createElement('div');
            buffer[i].className = "buffer";
            //вставляем скрытый div.buffer
            input[i].parentNode.insertBefore(buffer[i], input[i].nextSibling);

            input[i].oninput = function() {
                this.nextElementSibling.innerHTML = this.value;
                this.style.width = this.nextElementSibling.clientWidth + 'px';
            };
        }
    }

    this.updateDetail = function(id) {
        let rec = that.controller.read(id);

        let elems = detail_body["rows"];
        let keys = that.controller.getDisplayKeys();
        for (var key in keys) {
            for (var elem of elems) {
                if (elem["view"] == "text") {
                    detail_name = elem["id"].substring(0, elem["id"].indexOf("_detail"));
                    if (key == detail_name)
                        elem["value"] = rec[key].value;
                }
            }
        }

        //обновить partial view
        this.displayDetails();
        $$("detail_preview").config.template = "<img src='" + path + rec["preview"].value + ".jpg' style='width:225px; padding:10px'/>";
        //$$("detail_preview").refresh();

    }

    let detail_body = {
        rows: [{
            view: "label",
            template: "№",
        }, {
            view: "text",
            id: "number_detail",
            value: "",
        }, {
            view: "label",
            template: "Тип воздушного судна",
        }, {
            view: "text",
            id: "type_vs_detail",
            value: "",
        }, {
            view: "label",
            template: "Техническое состояние",
        }, {
            view: "text",
            id: "techstate_detail",
            value: "",
        }, {
            view: "label",
            template: "Крейсерская скорость",
        }, {
            view: "text",
            id: "cruiserSpeed_detail",
            value: "",
        }, {
            view: "label",
            template: "Грузоподъемность",
        }, {
            view: "text",
            id: "maxWeightCapacity_detail",
            value: "",
        }]
    };

    this.displayDetails = function() {
        webix.ui({
            view: "layout",
            id: "detail_layout",
            padding: 10,
            rows: [{
                id: "detail_preview",
                template: "<img src='resource/fly_boeing.jpg' style='width:225px; padding:10px'/>",
            }, {
                view: "scrollview",
                id: "detail",
                scroll: "y",
                body: detail_body
            }]
        }, $$("detail_container"));

        //заполнение содержимого
        //keys = that.controller.getDisplayKeys();
        //for (var key in keys) {
        //    if (key != "preview") {
        //        name_ = that.controller.getFieldName(key);
        //        this.text_a(byId("fields_container"), name_, key + "_data");
        //    }
        //}
    }

    this.text_a = function(container, text, name) {
        create("div", container, true).inner(text);
        input1 = create("input", container, true).attr("type", "text");
        input1.setAttribute("id", "stretch_text");
        input1.setAttribute("value", "");
        input1.setAttribute("name", name);
    }

    this.render = function() {
        //сначала рендеринг тегов и содержимого
        this.displayDetails();
        //затем навешивание обработчиков по изменению размеров полей
        textResize();
    }

    this.constructor = function() {
        View.call(this);
        this.setController();
        that.controller = this.controller;

        this.render();
    }

    this.constructor();
}