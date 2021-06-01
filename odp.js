// Question no. 1

(function () {
    'use strict';

    var Subject = (function () {
        'use strict';

        var _observers = [],
            _state = null;

        function Subject() {
        }

        Subject.prototype.getPrice = function () {
            return _state;
        };

        Subject.prototype.setPrice = function (newState) {
            _state = newState;
            notify(_state);
        };

        Subject.prototype.register = function (observer) {
            _observers.push(observer);
        };

        Subject.prototype.deregister = function (observer) {
            var index = indexOf(observer);
            if (index > -1) {
                _observers.splice(index, 1);
            }
        };

        function indexOf(observer) {
            return _observers.indexOf(observer);
        }

        function notify(state) {
            _observers.forEach(function (observer) {
                observer.update(state);
            });
        }

        return Subject;

    })();

    var Observer = (function () {
        'use strict';

        function Observer(config) {
            this.name = config.name;
        }

        Observer.prototype.update = function (state) {
            console.log(`${this.name} receiving price update -  ${state}`);
        };

        return Observer;

    })();


    var wifiService = new Subject();

    var house1 = new Observer({ name: 'firstHouse' }),
        house2 = new Observer({ name: 'secondHouse' }),
        house3 = new Observer({ name: 'thirdHouse' });


    wifiService.register(house1);
    wifiService.register(house2);
    wifiService.register(house3);


    wifiService.setPrice(800);
    wifiService.setPrice(900);

    wifiService.deregister(house1);

    wifiService.setPrice(1000);

    wifiService.getPrice();


})();
