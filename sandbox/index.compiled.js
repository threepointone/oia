(function () {
    if (!global._oi_) {
        var core$1426 = require('../lib/core.js');
        core$1426.__extend__(global, core$1426);
        global._oi_ = true;
    }
    // initialized oi.
    return function () {
        return function (v$1434) {
            var prn$1435 = v$1434.prn;
            prn$1435(require('immutable').fromJS({
                x: 1,
                y: require('immutable').List.of(1, 5, 6)
            }).getIn(require('immutable').List.of('y', 1)));
            return [
                1,
                4,
                6
            ].forEach(prn$1435);
        }.call(this, require('../lib/core'));
    }.call(this);
}());