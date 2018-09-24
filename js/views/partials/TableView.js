function TableView(modal, detail, tskeleton) {
    let marked = [];
    //this.modal;
    let that = {};
    //that означает, что функцияи вызываются с изменынным контекстом this 
    that.controller;
    that.detail;
    that.table = undefined;
    let records = {};
    let insertTable = "table";
    let insertTools = "tools";

    function initTools() {
        //отображение элементов с webix
        tools = [{
            id: "add",
            label: "Добавить",
            image: path + "add.png",
            click: this.modal.fillModal,
        }, {
            id: "edit",
            label: "Изменить",
            image: path + "edit.png",
            click: this.modal.fillModal,
        }, {
            id: "remove",
            label: "Удалить",
            image: path + "remove.png",
            click: deleteRecs,
        }];

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
        //только в случае, если элемент выбран
        if (item != undefined) {
            lastSelect = item["id_table"];

            //обновление детального просмотра (если имеется)
            that.detail.updateDetail(lastSelect);
        }
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
        let id = $$(insertTable).getSelectedId();
        let item = {};
        for (var key in record) {
            if (key == "id")
                item[key + "_table"] = record[key].value;
            else
                item[key + "_data"] = record[key].value;
        }

        $$(insertTable).updateItem(id.row, item);
    }

    this.initTableContent = function() {
        //заполнить таблицу элементом tableview
        //tableview контекстозависим
        this.tskeleton();

        //инициализация обработчиков (методы обработчиков находятся в TableView)
        $$("table").attachEvent("onCheck", function(id, column, state) {
            markRecord(id, column, state)
        });
        $$("table").attachEvent("onSelectChange", trSelected);

        //хайд колонки, содержащей id записей из БД
        $$("table").hideColumn("id_table");
        this.initRecords();
    }

    //пользователь может отметить на удаление либо редактирование любую строку
    function markRecord(id, foo, state) {
        id = $$(insertTable).getItem(id).id_table;
        //state == "checked"
        if (state == 1)
            marked.push(id);
        else
            marked.splice(marked.indexOf(id), 1);
    }

    deleteRec = function() {

    }

    function deleteRecs() {
        if (marked.length == 0)
            webix.message({
                type: "debug",
                text: "Не выбрана строка(ки) для удаления",
                expire: 2000
            });
        else
            for (; marked.length > 0;) {
                that.controller.delete(marked[0]);
            }
    }

    this.deletedEvent = function(id) {
        //получить отмеченные checkbox из datatable
        //уже выполнено в markRecord
        let rows = $$(insertTable).serialize();

        for (var dat of rows) {
            if (id == dat.id_table) {
                $$(insertTable).remove(dat.id);
                break;
            }
        }
        $$(insertTable).refresh();

        marked.splice(marked.indexOf(id), 1);
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

    this.constructor = function(modal, detail, tskeleton) {
        View.call(this);
        this.setController();
        that.controller = this.controller;
        this.modal = modal;
        that.detail = detail;
        this.tskeleton = tskeleton;

        modal.setTable(this);

        this.render();
    };

    this.constructor(modal, detail, tskeleton);
}