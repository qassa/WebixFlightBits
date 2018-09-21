function ControllerFactory() {
    this.dataNameDictoinary;
    this.dataDictionary;
    this.textContext;

    constructor = function() {
        this.dataNameDictoinary = { "Авиатехника": "airplane", "Рейсы": "flight", "Пассажиры": "passanger" };
    }

    constructor();

    this.factory = function(context, concreteView) {
        for (var key in dataNameDictoinary) {
            if (key == context) {
                this.textContext = dataNameDictoinary[key];

                switch (this.textContext) {
                    case 'airplane':
                        return new AirplaneController(this.textContext, concreteView);
                    case 'flight':
                        return new FlightController(this.textContext, concreteView);
                    case 'passanger':
                        return new PassangerController(this.textContext, concreteView);
                }

            }
        }

    }
}