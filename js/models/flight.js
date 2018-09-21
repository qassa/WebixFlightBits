function Flight(context, concreteController) {
    this._id = {
        name: "id",
        type: "numeric",
        value: ""
    };
    this._number = {
        name: "№",
        type: "numeric",
        value: ""
    };
    this._type_vs = {
        name: "Тип воздушного судна",
        type: "text",
        value: ""
    };
    this._arrangement = {
        name: "Компоновка (предельная загрузка)",
        type: "numeric",
        value: ""
    };
    this._aircompany_vs = {
        name: "Принадлежность ВС",
        type: "text",
        value: ""
    }
    this._commander_surname = {
        name: "Фамилия командира ВС",
        type: "text",
        value: ""
    }
    this._route = {
        name: "Маршрут",
        type: "text",
        value: ""
    }
    this._plan_arrive_time = {
        name: "Плановое время прибытия",
        type: "text",
        value: ""
    }
    this._fact_arrive_time = {
        name: "Фактическое время прибытия",
        type: "text",
        value: ""
    }
    this._schedule_takeoff_time = {
        name: "Время отправления по расписанию",
        type: "text",
        value: ""
    }
    this._fact_takeoff_time = {
        name: "Фактическое время взлета",
        type: "text",
        value: ""
    }
    this._reason_of_delay = {
        name: "Причина задержки",
        type: "text",
        value: ""
    }

    this.display_fields = {
        _number: this._number,
        _type_vs: this._type_vs,
        _arrangement: this._arrangement,
        _aircompany_vs: this._aircompany_vs,
        _commander_surname: this._commander_surname,
        _route: this._route,
        _plan_arrive_time: this._plan_arrive_time,
        _fact_arrive_time: this._fact_arrive_time,
        _schedule_takeoff_time: this._schedule_takeoff_time,
        _fact_takeoff_time: this._fact_takeoff_time,
        _reason_of_delay: this._reason_of_delay
    }

    this.enum_fields = {
        _id: this._id,
        _number: this._number,
        _type_vs: this._type_vs,
        _arrangement: this._arrangement,
        _aircompany_vs: this._aircompany_vs,
        _commander_surname: this._commander_surname,
        _route: this._route,
        _plan_arrive_time: this._plan_arrive_time,
        _fact_arrive_time: this._fact_arrive_time,
        _schedule_takeoff_time: this._schedule_takeoff_time,
        _fact_takeoff_time: this._fact_takeoff_time,
        _reason_of_delay: this._reason_of_delay
    }

    this.validModel = function(record) {
        //проверка списка полей, сохранение только совпадающих полей
        //в вехрнем цикле перебор полей самого объекта (гарантирует правильный порядок полей)
        for (keyD in this.valid_fields) {
            for (key in record) {
                if (key == keyD.substring(1)) {
                    //валидация содержимого (мы не можем знать, какие данные придут от клиента)
                    if (this.valid(record[key]))
                        this.enum_fields["_" + key].value = record[key];
                }
            }
            //поле не было надено в переданной записи
        }
    }

    this.valid = function(field) {
        //проверить регулярное выражение

        return true;
    }

    this.create = function(record) {
        //присвоение ID
        this.enum_fields._id.value = global_id++;

        this.validModel(record);

        //создание новой записи в БД
        rec = {};
        rec["id"] = this.enum_fields._id.value;
        keys = Object.keys(this.display_fields);
        for (var key of keys) {
            rec[key.substring(1)] = {};
            rec[key.substring(1)] = record[key.substring(1)];
        }
        this.data.push(rec);

        //сообщить контроллеру об изменении в записях
        return rec;
    }

    this.readAll = function(dKeys) {
        //считать все записи
        exp = [];
        this.data.forEach(function(record) {
            //для каждого нового поля
            keys = Object.keys(record);
            rec = {};
            keys.forEach(function(key) {
                dKeys.forEach(function(dataKey) {
                    if (dataKey == key) {
                        rec[key] = new Object();
                        rec[key].type = this.enum_fields["_" + key].type;
                        rec[key].value = record[key];

                    }
                })
            })
            exp.push(rec);
        });

        return exp;
    }

    this.read = function(id) {
        rec = {};
        this.data.forEach(function(record) {
            if (record["id"] == id) {
                keys = Object.keys(record);
                keys.forEach(function(key) {
                    rec[key] = new Object();
                    rec[key].type = this.enum_fields["_" + key].type;
                    rec[key].value = record[key];
                });
            }
        });
        return rec;
    }

    this.update = function(record) {
        this.validModel(record);
        enum_fields = this.enum_fields;

        //заменить запись с указанным ID
        let i = 0;
        i = record.id;

        j = 0;
        this.data.forEach(function(piece) {
            if (piece["id"] == i) {
                keys = Object.keys(piece);
                keys.forEach(function(key) {
                    if (key == "id")
                        thiis.data[j][key] = i;
                    else if (key != "preview")
                        thiis.data[j][key] = record[key];
                });
            }
            j++;
        });

        //сообщить контроллеру об изменении в записях
        return this.read(i);
    }

    this.delete = function(id) {
        j = 0;
        data = this.data;
        flag = false;
        data.forEach(function(piece) {
            if (piece["id"] == id) {
                data.splice(data.indexOf(data[j]), 1);
                flag = true;
                //break;
            }
            j++;
        });
        return flag;
    }

    this.fly = function(departurePoint, destinationPoint) {

    }

    this.constructor = function(context, concreteController) {
        //загрузка из заглушки записей БД посредством eval()
        this.data = eval(context + "_data");
        thiis.data = this.data;
        this.controller = concreteController;
    }

    this.constructor(context, concreteController);
}