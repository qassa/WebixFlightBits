function FlightView() {
    this.render = function() {

        //отобразить навигацию по системе
        nav = new NavigationView();

        //отобразить панель фильтрации

        //отобразить модальное окно
        modal = new ModalView();

        //отобразить детальное представление
        detail = new DetailedView(detail_skeleton);

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
                    id: "arrangement_data",
                    header: "Компоновка",
                    width: 170
                }, {
                    id: "aircompany_vs_data",
                    header: "Принадлежность ВС",
                    width: 220,
                }, {
                    id: "commander_surname_data",
                    header: "Фамилия командира ВС",
                    width: 220,
                }, {
                    id: "route_data",
                    header: "Маршрут",
                    width: 170,
                }, {
                    id: "plan_arrive_time_data",
                    header: "Плановое время прибытия",
                    width: 250,
                }, {
                    id: "fact_arrive_time_data",
                    header: "Фактическое время прибытия",
                    width: 170,
                }, {
                    id: "schedule_takeoff_time_data",
                    header: "Время отправления по расписанию",
                    width: 170,
                }, {
                    id: "fact_takeoff_time_data",
                    header: "Фактическое время взлета",
                    width: 170,
                }, {
                    id: "reason_of_delay_data",
                    header: "Причина задержки",
                    width: 170,
                }],
            },
            $$("table_scroll"));
    }

    function detail_skeleton() {
        webix.ui({
            view: "layout",
            id: "detail_layout",
            padding: 10,
            rows: [{
                    template: "Детальный просмотр",
                    type: "section"
                },
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
                        { view: "text", label: "Компоновка", name: "arrangement_detail" },
                        { view: "text", label: "Принадлежность ВС", name: "aircompany_vs_detail" },
                        { view: "text", label: "Фамилия командира ВС", name: "commander_surname_detail" },
                        { view: "text", label: "Маршрут", name: "route_detail" },
                        { view: "text", label: "Плановое время прибытия", name: "plan_arrive_time_detail" },
                        { view: "text", label: "Фактическое время прибытия", name: "fact_arrive_time_detail" },
                        { view: "text", label: "Время отправления по расписанию", name: "schedule_takeoff_time_detail" },
                        { view: "text", label: "Фактическое время взлета", name: "fact_takeoff_time_detail" },
                        { view: "text", label: "Причина задержки", name: "reason_of_delay_detail" },
                    ]
                }
            ]
        }, $$("detail_container"));
    }

}