function AirplaneView() {
    this.render = function() {

        //отобразить навигацию по системе
        nav = new NavigationView();

        //отобразить панель фильтрации

        //отобразить модальное окно
        modal = new ModalView();

        //отобразить детальное представление
        detail = new DetailedView();

        //отобразить табличное представление
        table = new TableView(modal, detail, table_skeleton);

        //отобразить количество записей

    }

    //объект таблицы
    function table_skeleton() {
        webix.ui({
                view: "datatable",
                id: "table",
                select: true,
                resizeColumn: true,
                columns: [{
                    id: "id_table",
                    width: 50,
                }, {
                    id: "ch1",
                    header: { content: "masterCheckbox", contentId: "ch1" },
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
    }

}