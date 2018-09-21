function View() {
    this.controller = undefined; //контроллер для передачи данных из View
    var cFactory = new ControllerFactory();
    this.lastSelect = -1;
    path = "resource/";

    this.byId = function(id) {
        return $$(id);
    }
    this.create = function(tag, parent, chain) {

    }
    this.attr = function(attr, value, chain) {

    }
    this.gattr = function(node, attr) {

    }
    this.templ = function(text) {
        return (context.config.template)();
    }
    this.inH = function(text, chain) {

    }
    this.insAft = function(newNode, referenceNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    this.destroyDOM = function(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    //не нужно, т.к. фреймворк автоматически перестраивает элементы
    //this.destroyView = function() { }

    this.setController = function() {
        if (this.controller == undefined) {
            //только если контроллер до этого не был установлен (Singleton)
            //определение контекста (сущности, для которой выводятся данные)
            context = byId("header");
            context = templ(context);

            //передача контекста (чтобы с помощью фабрики создать нужный экземпляр)
            //передача объекта-this, чтобы установить ссылку в двух направлениях (представление-контроллер)
            this.controller = cFactory.factory(context, this);
        }
    }
}