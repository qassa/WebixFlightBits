function DetailedView() {
    this.preview;
    this.container;
    that = {};
    that.controller;
    let insertName = "detail_container";

    displayDetails = function() {

    }

    this.updateDetail = function(id) {
        let rec = that.controller.read(id);
        for (var key in rec) {
            rec[key + "_detail"] = rec[key].value;
        }
        //загрузка превью
        $$("detail_preview").setValues({ image: "<img src='" + path + rec["preview"].value + ".jpg' style='width:225px; padding:10px'/>" });
        //$$("detail_preview").refresh();

        //изменение значения полей формы
        $$("detail_form").setValues(rec);
    }

    this.displayDetails = function() {
        webix.ui({
            view: "layout",
            id: "detail_layout",
            padding: 10,
            rows: [{
                    id: "detail_preview",
                    height: 225,
                    data: [{
                        image: "<img src='resource/fly_boeing.jpg' style='width:225px; padding:10px'/>",
                    }],
                    template: "#image#",
                },
                {
                    template: "Детальный просмотр",
                    type: "section"
                },
                //view: "scrollview",
                //id: "detail",
                //scroll: "y",
                //body: detail_body
                {
                    view: "form",
                    scroll: "y",
                    id: "detail_form",
                    elementsConfig: {
                        labelPosition: "top",
                    },
                    elements: [
                        { view: "text", label: "№", name: "number_detail" },
                        { view: "text", label: "Тип воздушного судна", name: "type_vs_detail" },
                        { view: "text", label: "Техническое состояние", name: "techstate_detail" },
                        { view: "text", label: "Крейсерская скорость", name: "cruiserSpeed_detail" },
                        { view: "text", label: "Грузоподъемность", name: "maxWeightCapacity_detail" },
                        { view: "text", label: "Максимальная высота полета", name: "maxFlightHeight_detail" },
                        { view: "text", label: "Дальность полета", name: "distance_detail" },
                        { view: "text", label: "Уровень топлива", name: "fuelState_detail" },
                        { view: "text", label: "Авиакомпания", name: "airCompanyOwner_detail" },
                    ]
                }
            ]
        }, $$("detail_container"));
    }

    this.render = function() {
        //сначала рендеринг тегов и содержимого
        this.displayDetails();
    }

    this.constructor = function() {
        View.call(this);
        this.setController();
        that.controller = this.controller;

        this.render();
    }

    this.constructor();
}