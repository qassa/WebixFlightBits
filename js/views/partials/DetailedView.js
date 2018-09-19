function DetailedView() {
    this.preview;
    this.container;
    that = {};
    that.controller;

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
        //эта View знает, что из всех полей display_fields нужно все отображать одинаково кроме preview
        rec = that.controller.read(id);

        keys = that.controller.getDisplayKeys();
        for (var key in keys) {
            for (var field of this.container.childNodes) {
                name = gattr(field, "name");
                name = name.substring(0, name.indexOf("_data"));
                if (name != "null")
                    if (name == key)
                        field.setAttribute("value", rec[key].value);

            }
        }
        this.preview.setAttribute("src", "resource/" + rec["preview"].value + ".jpg");
    }

    this.displayDetails = function() {
        inserted = byId("detail_container");

        create("div", inserted, true).attr("class", "toolbox");
        this.preview = create("div", inserted, true).attr("class", "preview");
        this.preview = create("img", this.preview, true).attr("src", "");

        this.container = create("div", inserted, true).attr("id", "fields_container");

        //заполнение содержимого детального просмотра
        keys = that.controller.getDisplayKeys();
        for (var key in keys) {
            if (key != "preview") {
                name_ = that.controller.getFieldName(key);
                this.text_a(byId("fields_container"), name_, key + "_data");
            }
        }
    }

    this.text_a = function(container, text, name) {
        create("div", container, true).inner(text);
        input1 = create("input", container, true).attr("type", "text");
        input1.setAttribute("id", "stretch_text");
        input1.setAttribute("value", "");
        input1.setAttribute("name", name);
    }

    this.render = function() {
        displayDetails();

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