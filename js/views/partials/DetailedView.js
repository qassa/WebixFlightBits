function DetailedView(dskeleton) {
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
        if (rec["preview"] != undefined)
            $$("detail_preview").setValues({ image: "<img src='" + path + rec["preview"].value + ".jpg' style='width:225px; padding:10px'/>" });

        //изменение значения полей формы
        $$("detail_form").setValues(rec);
    }

    this.displayDetails = function() {
        this.dskeleton();

    }

    this.render = function() {
        //сначала рендеринг тегов и содержимого
        this.displayDetails();
    }

    this.constructor = function(dskeleton) {
        View.call(this);
        this.setController();
        that.controller = this.controller;
        this.dskeleton = dskeleton;

        this.render();
    }

    this.constructor(dskeleton);
}