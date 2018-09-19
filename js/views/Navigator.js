function Navigator() {
    window.appNavigator = this;
    routes = {
        "Airplane": new AirplaneView(),
        "Flight": new FlightView(),
        //"Passanger": new PassangerView(),
        //"Staff": new StaffView()
    };

    this.navigate = function(route) {
        switch (route) {
            case "Авиатехника":
                route = "Airplane";
                break;
            case "Рейсы":
                route = "Flight";
                break;
        }
        (new View()).destroyView();
        routes[route].render();
    }
}