function View() {
    this.controller = undefined; //контроллер для передачи данных из View
    var cFactory = new ControllerFactory();
    this.lastSelect = -1;

    this.byId = function(id) {
        return document.getElementById(id);
    }
    this.byTg = function(tag) {
        return document.getElementsByTagName(tag);
    }
    this.byCl = function(classs) {
        return document.getElementsByClassName(classs)[0];
    }
    this.create = function(tag, parent, chain) {
        node = document.createElement(tag);
        parent.appendChild(node);

        if (chain == undefined) return node;
        else
            return this;
    }
    this.attr = function(attr, value, chain) {
        if (chain == true) {
            node.setAttribute(attr, value);
            return this;
        } else {
            node.setAttribute(attr, value);
            return node;
        }
    }
    this.gattr = function(node, attr) {
        return node.getAttribute(attr);
    }
    this.inner = function(text, chain) {
        if (chain == true) {
            node.innerText = text;
            return this;
        } else {
            node.innerText = text;
            return node;
        }
    }
    this.inH = function(text, chain) {
        if (chain == true) {
            node.innerHTML = text;
            return this;
        } else {
            node.innerHTML = text;
            return node;
        }
    }
    this.insAft = function(newNode, referenceNode) {
        return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    this.destroyDOM = function(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    this.destroyView = function() {
        //очистить содержимое контейнеров
        this.destroyDOM(this.byId("modal_text"));
        this.destroyDOM(this.byId("views_container"));
        this.destroyDOM(this.byId("table_container"));
        this.destroyDOM(this.byId("detail_container"));
    }

    this.setController = function() {
        if (this.controller == undefined) {
            //только если контроллер до этого не был установлен (Singleton)
            //определение контекста (сущности, для которой выводятся данные)
            context = byId("screen_header");
            context = context.innerHTML;

            //передача контекста (чтобы с помощью фабрики создать нужный экземпляр)
            //передача объекта-this, чтобы установить ссылку в двух направлениях (представление-контроллер)
            this.controller = cFactory.factory(context, this);
        }
    }
}