function TableView(modal, detail) {
    let marked = [];
    this.modal;
    let that = {};
    //that означает, что функцияи вызываются с изменынным контекстом this 
    that.controller;
    that.detail;
    that.table = undefined;
    let records = {};
    let insertTable = "table";
    let insertTools = "tools";

    tools = [{
        id: "add",
        label: "Добавить",
        image: path + "add.png",
        click: ("$$('my_win').show();"),
    }, {
        id: "edit",
        label: "Изменить",
        image: path + "edit.png",
    }, {
        id: "remove",
        label: "Удалить",
        image: path + "remove.png",
    }]

    function initTools() {
        //отображение элементов с webix

        renderObj = {
            cols: []
        };

        cols = renderObj["cols"];
        for (var elem in tools) {
            cols.push({});
            col = cols[elem];
            element = tools[elem];
            Object.keys(element).forEach(function(prop, idx, array) {
                col[prop] = element[prop]
            });
            col.view = "button";
            col.type = "image";
            col.height = 40;
            col.width = 150;
        }
        renderObj["cols"].push({});
        renderObj["cols"].push({
            view: "search"
        });
        webix.ui(renderObj, $$(insertTools));
    }

    trSelected = function() {
        let item = $$(insertTable).getSelectedItem();
        lastSelect = item["id_table"];

        //обновление детального просмотра (если имеется)
        that.detail.updateDetail(lastSelect);
    }

    this.initRecords = function() {
        //получаем массив записей
        records = that.controller.getDataRecords();

        //перебор всех записей
        for (var elem of records) {
            this.addRecord(elem);
        }
    }

    this.addRecord = function(elem) {
        //создать объект на основе ключей
        record_obj = {};
        for (var key in elem) {
            if (key == "id")
                record_obj[key + "_table"] = elem[key].value;
            else
                record_obj[key + "_data"] = elem[key].value;
        }
        //добавить строку в DataTable
        $$(insertTable).add(record_obj);
    }

    this.updateRecord = function(record) {
        //найти запись с заданным id
        id = record.id.value.toString();
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
        //var evt = new MouseEvent('click', {
        //    bubbles: false,
        //    cancelable: true,
        //    view: window
        //);
        // If cancelled, don't dispatch our event
        //var canceled = !elem.dispatchEvent(evt);
    };

    this.initTableContent = function() {
        //заполнить таблицу элементом tableview
        webix.ui({
                view: "datatable",
                id: "table",
                select: "row",
                resizeColumn: true,
                on: {
                    onSelectChange: trSelected
                },
                columns: [{
                    id: "id_table",
                    width: 50,
                }, {
                    //id: "id_table",
                    header: { content: "masterCheckbox", contentId: "id1" },
                    template: "{common.checkbox()}",
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
            },
            $$("table_scroll"));
        $$("table").hideColumn("id_table");
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