function AirplaneController(context, concreteView) {
    this.export_data;
    this.model;
    this.airplane = this;
    enum_fields = undefined;
    this.view;

    //данные модели, используемые при построении таблицы
    this.dataKeys = {};
    //данные модели, отображаемые на UI
    this.displayKeys = {};

    this.keysLoad = function(fields) {
        keys = {};
        for (var key in fields) {
            key = key.substring(1);
            keys[key] = new Object();
            keys[key].name = fields["_" + key].name;
            keys[key].type = fields["_" + key].type;
        }
        return keys;
    }


    this.getDataRecords = function() {
        //поиск совпадающих полей в объекте data и в Airplane
        export_data = [];
        dKeys = Object.keys(this.dataKeys);

        export_data = this.model.readAll(dKeys);
        return export_data;
    }

    this.read = function(id) {
        return this.model.read(id);
    }

    this.updateViewRecs = function(recs) {

    }

    this.getDisplayKeys = function() {
        return this.displayKeys;
    }

    this.getDataKeys = function() {
        return this.dataKeys;
    }

    this.getFieldName = function(field) {
        return this.dataKeys[field].name;
    }

    this.create = function(record) {
        record = this.model.create(record);

        //оповещение View о новой записи
        record = this.model.read(record.id);
        this.view.table.addRecord(record);
    }

    this.update = function(record) {
        return this.model.update(record);
    }

    this.delete = function(mark) {
        if (this.model.delete(mark))
            this.view.deletedEvent(mark);
    }

    this.constructor = function(context, concreteView) {
        this.model = new Airplane(context, this);
        this.view = concreteView;

        //короткая ссылка на перечислимые поля
        enum_fields = this.model.enum_fields;
        //сокращенная ссылка на редактируемые поля
        disp_fields = this.model.display_fields;

        //сохранение списка доступных для редактирования/добавления полей
        //предполагается, что в заглушке данных всегда есть хотя бы одна запись данных (хотя бы только структура)
        this.dataKeys = this.keysLoad(enum_fields);
        this.displayKeys = this.keysLoad(disp_fields);
        return this.airplane;
    }

    this.constructor(context, concreteView);
}