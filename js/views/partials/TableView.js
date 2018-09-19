function TableView(modal, detail) {
    marked = [];
    this.modal;
    that = {};
    //that означает, что функцияи вызываются с изменынным контекстом this 
    that.controller;
    that.detail;
    var that = {};
    that.table = undefined;
    this.tr1;

    function initTools() {
        $$("add").attachEvent("click", function() {
            this.modal.fillModal;
        })

        $$("edit").attachEvent("click", function() {
            this.modal.fillModal;
        })

        $$("remove").attachEvent("click", function() {
            deleteRecs;
        })
    }

    var tr = function(table) {
        trr = document.createElement("tr");
        that.table.appendChild(trr);
        return trr;
        //tag1.addEventListener("click", highlightRow);
    }

    trSelected = function() {
        id = this.getAttribute("id");
        if (lastSelect != -1) {
            table = byId("records_table", document);
            select = byId(lastSelect, table);
            if (select != undefined)
                select.style.background = 'none';
        }
        //обновление, highlight строки
        this.style.background = '#FFFFD5';
        lastSelect = id;

        //запись значений во временный объект
        keys = that.controller.getDataKeys();

        sel_obj = {};
        tr_h = byId("table_container")
        tr_h = byId("0");
        for (var child of tr_h.childNodes) {
            attrib = child.getAttribute("class");
            if (attrib != undefined) {
                begin = attrib.indexOf("_data");
                field = attrib.substring(0, attrib.length - (attrib.length - begin));
                //sel_obj[field] = this.childNodes[child].innerText;
            } else {
                sel_obj["id"] = this.getAttribute("id");
            }
        }

        //обновление детального просмотра (если имеется)
        if (that.detail != undefined) {
            that.detail.updateDetail(gattr(this, "id"));
        }
    }

    this.newHighlightTr = function() {
        //перенос указателя строки
        this.tr1 = tr(that.table);
        //обработчик нажатия на строку с данными
        this.tr1.addEventListener('click', trSelected);
    }

    function initHeader() {
        //запись новой строки в таблицу
        this.tr1 = tr(that.table);
        this.tr1.setAttribute("id", "0");
        //отличается запись для первой колонки (checkbox)
        th_td("th", this.tr1, undefined, "input", undefined, "checkbox", "select_all");
        keys = that.controller.getDataKeys();
        for (var key in keys) {
            name_ = that.controller.getFieldName(key);
            if (name_ != "id") {
                th = th_td("th", this.tr1, name_);
                th.setAttribute("class", key + "_data");
            }
        }
        //tr1 = tr(that.table);
    }

    this.initRecords = function() {
        //получаем массив записей
        records = that.controller.getDataRecords();

        //перебор всех записей
        for (var elem of records) {
            this.newHighlightTr();

            this.addRecord(elem, this.tr1);
        }
    }

    this.addRecord = function(elem, tr1) {
        //колонка с id всегда первая, найти id
        //без id выполнить вставку невозможно (далее будет невозможно обратиться к записи)
        elem_id = elem["id"];
        if (elem_id == undefined)
            throw new Error("id объекта не может отсутствовать");
        else {
            th_td("td", tr1, undefined, "input", undefined, "checkbox", "select_single", elem_id.value);
        }
        delete elem["id"];

        for (var key in elem) {
            if (elem[key].type == "text" || elem[key].type == "numeric")
                th_td("td", tr1, elem[key].value);
            else
            //отличается запись для preview
            if (elem[key].type == "image")
                th_td("td", tr1, undefined, "img", elem[key].value);
        }
    }

    this.updateRecord = function(record) {
        //найти запись с заданным id
        id = record.id.value.toString();
        //tr = document.querySelector('#records_table #' + id);
        tr = document.getElementById(id);

        //повторно вставить в то же место документа новую строку
        tr1 = that.table.insertBefore(document.createElement("tr"), tr);
        tr1.addEventListener('click', trSelected);
        this.addRecord(record, tr1);

        //удалить строку
        tr.remove();

        //обновить выделение строки (строка только что редактировалась)
        simulateClick(tr1);
    }

    var simulateClick = function(elem) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: false,
            cancelable: true,
            view: window
        });
        // If cancelled, don't dispatch our event
        var canceled = !elem.dispatchEvent(evt);
    };

    function th_td(table_tag, tr, html, tag, src, type, name, id) {
        var th = document.createElement(table_tag);

        if (id != undefined)
            tr.setAttribute("id", id);

        if (tag != undefined) {
            tag1 = create(tag, th);
            if (src != undefined)
                tag1.setAttribute("src", "resource/" + src + ".jpg");
            if (type != undefined)
                tag1.setAttribute("type", type);
            if (name != undefined)
                tag1.setAttribute("name", name);

            if (html != undefined)
                tag1.innerHTML = html;

            //обработчик нажатия на checkbox
            if (type == "checkbox") {
                if (name == "select_all")
                    tag1.addEventListener("change", markRecords);
                if (name == "select_single")
                    tag1.addEventListener("change", markRecord);
            }
        } else
        if (html != undefined)
            th.innerHTML = html;
        tr.appendChild(th);
        return th;
    }

    this.initTableContent = function() {
        if (that.table == undefined) {
            that.table = create("table", byId("table_container"), true).attr("id", "records_table");
        }
        //заполнение внутренней таблицы из БД / заглушки
        initHeader();
        this.initRecords();
    }

    //пользователь может отметить на удаление либо редактирование любую строку
    function markRecord() {
        id = this.parentNode.parentNode.getAttribute("id");
        if (this.checked)
            marked.push(id);
        else
            marked.splice(marked.indexOf(id), 1);
    }

    function markRecords() {
        checked = this.checked;

        nodes = getTableNodes();
        nodes.forEach(function(child) {
            if (child.nodeName == "INPUT" && child.getAttribute("name") == "select_single") {
                child.checked = checked;
                if (checked) {
                    marked.push(child.parentNode.parentNode.getAttribute("id"));
                } else {
                    marked = [];
                }
            }
        });
    }

    function getTableNodes() {
        nodes = [];
        for (var row of that.table.rows) {
            for (var cell of row.childNodes) {
                for (var child of cell.childNodes)
                    nodes.push(child);
            }
        }
        return nodes;
    }

    function deleteRecs() {
        for (var mark of marked) {
            that.controller.delete(mark);
        }
    }

    this.deletedEvent = function(id) {
        for (var row of byTg("tr")) {
            if (row.getAttribute("id") == id) {
                row.remove();
                marked.splice(marked.indexOf(id), 1);
                //повторный вызов
                deleteRecs();
                return;
            }
        }
    }

    function deleteTable() {
        that.table.remove();
        that.table = undefined;

        //зануление маркеров отмеченных записей
        marked = [];
    }

    this.render = function() {
        //элементы для редактирования записей расположены в таблице
        initTools();
        this.initTableContent();
    };

    this.constructor = function(modal, detail) {
        View.call(this);
        this.setController();
        that.controller = this.controller;
        this.modal = modal;
        that.detail = detail;

        modal.setTable(this);

        this.render();
    };

    this.constructor(modal, detail);
}