function FlightView() {
    this.render = function() {

        //отобразить навигацию по системе
        nav = new NavigationView();

        //отобразить панель фильтрации

        //отобразить модальное окно
        modal = new ModalView();

        //отобразить детальное представление
        detail = new DetailedView();

        //отобразить табличное представление
        table = new TableView(modal, detail);

        //отобразить количество записей
    }
}