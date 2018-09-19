function NavigationView() {
    var insertName = "views_container";
    var links = { "Авиатехника": "plane_view", "Рейсы": "voyage_view", "Персонал": "staff_view", "Пассажиры": "passanger_view", "График полетов": "flight_graph_view" };

    var render = function() {
        //вывод элементов навигационного меню системы
        renderObj = {
            padding: 10,
            cols: []
        };

        for (var element in links) {
            renderObj["cols"].push({
                view: "button",
                value: element,
                height: 53,
                width: 150
            });


            //nav_node.addEventListener("click", changeHeader);
        }

        webix.ui(renderObj, $$(insertName));

    };

    changeHeader = function() {
        header = $$("header").config.template;
        header.innerText = this.innerText;
        appNavigator.navigate(header.innerText);
    }

    constructor = function() {
        View.call(this);

        render();
    };

    constructor();

    //обращаться к переменной раньше, чем она была объявлена, можно (из-за облатси видимости функции)
    //вызов функций раньше, чем они были объявлены в коде, приведет к x is not a function
}