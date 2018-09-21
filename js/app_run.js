function ready() {
    new Navigator();
    appNavigator.navigate("Авиатехника");

}
//ожидание полной прогрузки DOM
document.addEventListener("DOMContentLoaded", ready);