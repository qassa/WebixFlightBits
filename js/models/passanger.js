function Passnager() {
    this._id = {
        name: "id",
        type: "numeric",
        value: ""
    };
    this._name = {
        name: "Имя",
        type: "text",
        value: ""
    };
    this._surname = {
        name: "Фамилия",
        type: "text",
        value: ""
    };
    this._patronymic = {
        name: "Отчество",
        type: "text",
        value: ""
    };
    this._passportID = {
        name: "Номер документа",
        type: "text",
        value: ""
    };
    this._nationality = {
        name: "Национальность",
        type: "text",
        value: ""
    };
    this._reasonOfFlight = {
        name: "Причина полета",
        type: "text",
        value: ""
    };
    this._age = {
        name: "Возраст",
        type: "numeric",
        value: ""
    }

    this.display_fields = {
        _name: this._name,
        _surname: this._surname,
        _patronymic: this._patronymic,
        _passportID: this._passportID,
        _nationality: this._nationality,
        _reasonOfFlight: this._reasonOfFlight,
        _age: this._age
    };

    this.enum_fields = {
        _id: this._id,
        _name: this._name,
        _surname: this._surname,
        _patronymic: this._patronymic,
        _passportID: this._passportID,
        _nationality: this._nationality,
        _reasonOfFlight: this._reasonOfFlight,
        _age: this._age
    };
}