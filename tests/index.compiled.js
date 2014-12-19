var expect$1424 = require('chai').expect;
var _$1425 = require('../lib/core');
describe('sexpressions', function () {
    it('should allow to call js functions', function () {
        var f0$1426 = function () {
            return 1;
        };
        var f1$1427 = function (a$1432) {
            return a$1432;
        };
        var f2$1428 = function (a$1433, b$1434) {
            return [
                a$1433,
                b$1434
            ];
        };
        expect$1424(function () {
            if (!global._oi_) {
                var core$1439 = require('../lib/core.js');
                core$1439.__extend__(global, core$1439);
                global._oi_ = true;
            }
            // initialized oi.
            return f0$1426();
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1452 = require('../lib/core.js');
                core$1452.__extend__(global, core$1452);
                global._oi_ = true;
            }
            // initialized oi.
            return f1$1427(1);
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1462 = require('../lib/core.js');
                core$1462.__extend__(global, core$1462);
                global._oi_ = true;
            }
            // initialized oi.
            return f2$1428(1, 2);
        }()).to.eql([
            1,
            2
        ]);
    });
    it('should allow to use attribute access notation as function name', function () {
        var foo0$1463 = {
                bar: function () {
                    return 1;
                }
            };
        var foo1$1464 = {
                bar: function (a$1475) {
                    return a$1475;
                }
            };
        var foo2$1465 = {
                bar: function (a$1476, b$1477) {
                    return [
                        a$1476,
                        b$1477
                    ];
                }
            };
        var goo0$1466 = {
                bar: {
                    baz: function () {
                        return 1;
                    }
                }
            };
        var goo1$1467 = {
                bar: {
                    baz: function (a$1478) {
                        return a$1478;
                    }
                }
            };
        var goo2$1468 = {
                bar: {
                    baz: function (a$1479, b$1480) {
                        return [
                            a$1479,
                            b$1480
                        ];
                    }
                }
            };
        expect$1424(function () {
            if (!global._oi_) {
                var core$1484 = require('../lib/core.js');
                core$1484.__extend__(global, core$1484);
                global._oi_ = true;
            }
            // initialized oi.
            return foo0$1463.bar();
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1495 = require('../lib/core.js');
                core$1495.__extend__(global, core$1495);
                global._oi_ = true;
            }
            // initialized oi.
            return foo1$1464.bar(1);
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1504 = require('../lib/core.js');
                core$1504.__extend__(global, core$1504);
                global._oi_ = true;
            }
            // initialized oi.
            return foo2$1465.bar(1, 2);
        }()).to.eql([
            1,
            2
        ]);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1508 = require('../lib/core.js');
                core$1508.__extend__(global, core$1508);
                global._oi_ = true;
            }
            // initialized oi.
            return goo0$1466.bar.baz();
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1519 = require('../lib/core.js');
                core$1519.__extend__(global, core$1519);
                global._oi_ = true;
            }
            // initialized oi.
            return goo1$1467.bar.baz(1);
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1528 = require('../lib/core.js');
                core$1528.__extend__(global, core$1528);
                global._oi_ = true;
            }
            // initialized oi.
            return goo2$1468.bar.baz(1, 2);
        }()).to.eql([
            1,
            2
        ]);
    });
    it('should allow to use attribute access notation as function argument', function () {
        var goo1$1529 = {
                bar: {
                    baz: function (a$1536) {
                        return a$1536;
                    }
                }
            };
        var goo2$1530 = {
                bar: {
                    baz: function (a$1537, b$1538) {
                        return [
                            a$1537,
                            b$1538
                        ];
                    }
                }
            };
        var goo3$1531 = {
                bar: {
                    baz: function (a$1539, b$1540, c$1541) {
                        return [
                            a$1539,
                            b$1540,
                            c$1541
                        ];
                    }
                }
            };
        var data$1532 = { a: { b: 0 } };
        expect$1424(function () {
            if (!global._oi_) {
                var core$1546 = require('../lib/core.js');
                core$1546.__extend__(global, core$1546);
                global._oi_ = true;
            }
            // initialized oi.
            return goo1$1529.bar.baz(data$1532.a.b);
        }()).to.eql(0);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1554 = require('../lib/core.js');
                core$1554.__extend__(global, core$1554);
                global._oi_ = true;
            }
            // initialized oi.
            return goo2$1530.bar.baz(data$1532.a.b, 1);
        }()).to.eql([
            0,
            1
        ]);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1564 = require('../lib/core.js');
                core$1564.__extend__(global, core$1564);
                global._oi_ = true;
            }
            // initialized oi.
            return goo3$1531.bar.baz(data$1532.a.b, 1, data$1532.a.b);
        }()).to.eql([
            0,
            1,
            0
        ]);
    });
}    // it("should allow to call mori functions on mori data structures", function() {
     //   var foo = oi (vector 1 2 3)
     //   expect(oi (conj foo 4)).to.eql(oi (vector 1 2 3 4));
     // });
);
describe('lambdas', function () {
    it('should allow to define anonymous functions and call them from js', function () {
        var f$1566 = function () {
                if (!global._oi_) {
                    var core$1568 = require('../lib/core.js');
                    core$1568.__extend__(global, core$1568);
                    global._oi_ = true;
                }
                // initialized oi.
                return function (x$1569) {
                    return x$1569 + 1;
                };
            }();
        expect$1424(f$1566(1)).to.eql(2);
    });
    it('should allow to define anonymous functions and use them in oi', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$1590 = require('../lib/core.js');
                core$1590.__extend__(global, core$1590);
                global._oi_ = true;
            }
            // initialized oi.
            return require('immutable').List.of(1, 2, 3).map(function (x$1609) {
                return x$1609 + 1;
            }).toJS();
        }()).to.eql([
            2,
            3,
            4
        ]);
    });
    it('should allow to define named anonymous functions and call them recursively', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$1631 = require('../lib/core.js');
                core$1631.__extend__(global, core$1631);
                global._oi_ = true;
            }
            // initialized oi.
            return require('immutable').List.of(1, 2, 3).map(function foobar(x$1650) {
                return function () {
                    if (truthy(x$1650 === 1)) {
                        return x$1650;
                    }
                    return foobar(x$1650 - 1);
                }.call(this);
            }).toJS();
        }()).to.eql([
            1,
            1,
            1
        ]);
    });
});
describe('interoperability', function () {
    it('should allow to call js within oi', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$1684 = require('../lib/core.js');
                core$1684.__extend__(global, core$1684);
                global._oi_ = true;
            }
            // initialized oi.
            return require('immutable').List.of(1, 2, 3).map(function (x$1703) {
                return x$1703 + 1;
            }).toJS();
        }()).to.eql([
            2,
            3,
            4
        ]);
    });
    it('should allow to pass a oi fn as a js callback', function () {
        expect$1424([
            1,
            2,
            3,
            4
        ].map(function () {
            if (!global._oi_) {
                var core$1707 = require('../lib/core.js');
                core$1707.__extend__(global, core$1707);
                global._oi_ = true;
            }
            // initialized oi.
            return function (x$1708) {
                return x$1708 % 2 === 0;
            };
        }())).to.eql([
            false,
            true,
            false,
            true
        ]);
    });
});
describe('local bindings and lexical scope', function () {
    it('should allow to define local bindings in a let form and ensure proper lexical scope', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$1718 = require('../lib/core.js');
                core$1718.__extend__(global, core$1718);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                return function (v$1726) {
                    var a$1728 = v$1726;
                    return function (v$1732) {
                        var b$1734 = v$1732;
                        return require('immutable').List.of(a$1728, b$1734);
                    }.call(this, 2);
                }.call(this, 1);
            }.call(this).toJS();
        }()).to.eql([
            1,
            2
        ]);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1750 = require('../lib/core.js');
                core$1750.__extend__(global, core$1750);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                return function (v$1758) {
                    var a$1760 = v$1758;
                    return function () {
                        return function (v$1771) {
                            var a$1773 = v$1771;
                            return function (v$1781) {
                                var b$1783 = v$1781;
                                return require('immutable').List.of(a$1773, b$1783);
                            }.call(this, inc(a$1773));
                        }.call(this, inc(a$1760));
                    }.call(this);
                }.call(this, 0);
            }.call(this).toJS();
        }()).to.eql([
            1,
            2
        ]);
        var c$1713 = { d: 1 };
        expect$1424(function () {
            if (!global._oi_) {
                var core$1797 = require('../lib/core.js');
                core$1797.__extend__(global, core$1797);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                return function (v$1800) {
                    var a$1802 = v$1800;
                    return function (v$1810) {
                        var b$1812 = v$1810;
                        return function (v$1820) {
                            var e$1822 = v$1820;
                            (function () {
                                return function (v$1846) {
                                    var a$1848 = v$1846;
                                    return function (v$1856) {
                                        var b$1858 = v$1856;
                                        return a$1848;
                                    }.call(this, inc(b$1812));
                                }.call(this, inc(a$1802));
                            }.call(this));
                            return require('immutable').List.of(a$1802, b$1812, e$1822);
                        }.call(this, keyword('e'));
                    }.call(this, inc(a$1802));
                }.call(this, c$1713.d);
            }.call(this);
        }()).to.eql(list(1, 2, keyword('e')));
    });
});
// // describe("namespaces", function() {
// //   it("should allow to define multiple namespaces and an anonymous namespace", function() {
// //     oi (def a 0);
// //     oi (defn b [x] x);
// //     oi (ns foo (def a 1));
// //     oi (ns bar (def a 2));
// //     expect(oi (identity a)).to.eql(0);
// //     expect(oi (b 0)).to.eql(0);
// //     expect(oi (ns foo a)).to.eql(1);
// //     expect(oi (ns bar a)).to.eql(2);
// //   });
// //   it("should allow to use fully qualified identifiers", function() {
// //     oi (def a 0);
// //     oi (ns foo (def a 1));
// //     oi (ns bar (def a 2));
// //     expect(
// //       oi (clj_to_js (vector a foo/a bar/a))
// //       ).to.eql([0,1,2]);
// //   });
// //   it("should allow to intern modules", function() {
// //     _ki.modules['amodule'] = { bar: function() { return 1; }};
// //     _ki.modules['bmodule'] = { baz: function() { return 2; }};
// //     oi (ns foo 
// //         (use amodule bmodule));
// //     expect(
// //       oi (clj_to_js (ns foo (vector (bar) (baz))))
// //       ).to.eql([1,2]);
// //   });
// // });
describe('truthiness', function () {
    it('should have truthy return false only for boolean false, nil (and js null and undefined)', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$1879 = require('../lib/core.js');
                core$1879.__extend__(global, core$1879);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(false);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1886 = require('../lib/core.js');
                core$1886.__extend__(global, core$1886);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(null);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1892 = require('../lib/core.js');
                core$1892.__extend__(global, core$1892);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(null);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1898 = require('../lib/core.js');
                core$1898.__extend__(global, core$1898);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(undefined);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1905 = require('../lib/core.js');
                core$1905.__extend__(global, core$1905);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy('');
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1912 = require('../lib/core.js');
                core$1912.__extend__(global, core$1912);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(0);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1919 = require('../lib/core.js');
                core$1919.__extend__(global, core$1919);
                global._oi_ = true;
            }
            // initialized oi.
            return falsey(false);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1926 = require('../lib/core.js');
                core$1926.__extend__(global, core$1926);
                global._oi_ = true;
            }
            // initialized oi.
            return falsey(0);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1937 = require('../lib/core.js');
                core$1937.__extend__(global, core$1937);
                global._oi_ = true;
            }
            // initialized oi.
            return not(falsey(false));
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1948 = require('../lib/core.js');
                core$1948.__extend__(global, core$1948);
                global._oi_ = true;
            }
            // initialized oi.
            return not(falsey(0));
        }()).to.eql(true);
    });
});
describe('logical operators', function () {
    it('should be consistent with definition of truthiness', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$1968 = require('../lib/core.js');
                core$1968.__extend__(global, core$1968);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy('') && truthy(0);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$1990 = require('../lib/core.js');
                core$1990.__extend__(global, core$1990);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy('') && truthy(0) && truthy(null);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2005 = require('../lib/core.js');
                core$2005.__extend__(global, core$2005);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy('') || truthy(0);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2020 = require('../lib/core.js');
                core$2020.__extend__(global, core$2020);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(false) || truthy(null);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2058 = require('../lib/core.js');
                core$2058.__extend__(global, core$2058);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy('') && truthy(not(truthy(false) || truthy(null))) && truthy(0);
        }()).to.eql(true);
    });
    it('should short circuit', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$2082 = require('../lib/core.js');
                core$2082.__extend__(global, core$2082);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(true) && truthy(false) && truthy(undefined_symbol);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2104 = require('../lib/core.js');
                core$2104.__extend__(global, core$2104);
                global._oi_ = true;
            }
            // initialized oi.
            return truthy(false) || truthy(true) || truthy(undefined_symbol);
        }()).to.eql(true);
    });
});
describe('equality', function () {
    it('should operate on deep data structures', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$2123 = require('../lib/core.js');
                core$2123.__extend__(global, core$2123);
                global._oi_ = true;
            }
            // initialized oi.
            return eq(require('immutable').fromJS({
                'a': 1,
                'b': require('immutable').List.of(require('immutable').fromJS({ 'c': 1 }), 2)
            }), require('immutable').fromJS({
                'a': 1,
                'b': require('immutable').List.of(require('immutable').fromJS({ 'c': 1 }), 2)
            }));
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2189 = require('../lib/core.js');
                core$2189.__extend__(global, core$2189);
                global._oi_ = true;
            }
            // initialized oi.
            return eq(require('immutable').fromJS({
                'a': 1,
                'b': require('immutable').List.of(require('immutable').fromJS({ 'c': 3 }), 2)
            }), require('immutable').fromJS({
                'a': 1,
                'b': require('immutable').List.of(require('immutable').fromJS({ 'c': 1 }), 2)
            }));
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2255 = require('../lib/core.js');
                core$2255.__extend__(global, core$2255);
                global._oi_ = true;
            }
            // initialized oi.
            return neq(require('immutable').fromJS({
                'a': 1,
                'b': require('immutable').List.of(require('immutable').fromJS({ 'c': 3 }), 2)
            }), require('immutable').fromJS({
                'a': 1,
                'b': require('immutable').List.of(require('immutable').fromJS({ 'c': 1 }), 2)
            }));
        }()).to.eql(true);
    });
});
describe('flow control', function () {
    it('should allow branching consistently with definition of truthiness', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$2313 = require('../lib/core.js');
                core$2313.__extend__(global, core$2313);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(eq(1, 1))) {
                    return 'foo';
                }
                return;
            }.call(this);
        }()).to.eql('foo');
        expect$1424(function () {
            if (!global._oi_) {
                var core$2331 = require('../lib/core.js');
                core$2331.__extend__(global, core$2331);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(not(eq(1, 2)))) {
                    return 'foo';
                }
                return;
            }.call(this);
        }()).to.eql('foo');
        expect$1424(function () {
            if (!global._oi_) {
                var core$2352 = require('../lib/core.js');
                core$2352.__extend__(global, core$2352);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy('')) {
                    return 'foo';
                }
                return 'bar';
            }.call(this);
        }()).to.eql('foo');
        expect$1424(function () {
            if (!global._oi_) {
                var core$2364 = require('../lib/core.js');
                core$2364.__extend__(global, core$2364);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(0)) {
                    return 'foo';
                }
                return 'bar';
            }.call(this);
        }()).to.eql('foo');
        expect$1424(function () {
            if (!global._oi_) {
                var core$2376 = require('../lib/core.js');
                core$2376.__extend__(global, core$2376);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(null)) {
                    return 'foo';
                }
                return 'bar';
            }.call(this);
        }()).to.eql('bar');
        expect$1424(function () {
            if (!global._oi_) {
                var core$2389 = require('../lib/core.js');
                core$2389.__extend__(global, core$2389);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(not(''))) {
                    return 'foo';
                }
                return 'bar';
            }.call(this);
        }()).to.eql('bar');
    });
    it('should have cond be consistent with definition of truthiness', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$2407 = require('../lib/core.js');
                core$2407.__extend__(global, core$2407);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(eq(1, 2))) {
                    return 'foo';
                }
                return function () {
                    if (truthy(null)) {
                        return 'bar';
                    }
                    return function () {
                        if (truthy('')) {
                            return 'baz';
                        }
                        return undefined;
                    }.call(this);
                }.call(this);
            }.call(this);
        }()).to.eql('baz');
        expect$1424(function () {
            if (!global._oi_) {
                var core$2443 = require('../lib/core.js');
                core$2443.__extend__(global, core$2443);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(eq(1, 2))) {
                    return 'foo';
                }
                return function () {
                    if (truthy(null)) {
                        return 'bar';
                    }
                    return function () {
                        if (truthy(keyword('else'))) {
                            return 'baz';
                        }
                        return undefined;
                    }.call(this);
                }.call(this);
            }.call(this);
        }()).to.eql('baz');
    });
    it('should have cond short circuit', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$2484 = require('../lib/core.js');
                core$2484.__extend__(global, core$2484);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                if (truthy(eq(1, 2))) {
                    return 'foo';
                }
                return function () {
                    if (truthy(true)) {
                        return 'bar';
                    }
                    return function () {
                        if (truthy(undefined_symbol)) {
                            return 'baz';
                        }
                        return undefined;
                    }.call(this);
                }.call(this);
            }.call(this);
        }()).to.eql('bar');
    });
});
describe('data literals', function () {
}    // it("should allow to create lists", function() {    
     //   expect(oi (eq [1 2 3 4] (list 1 2 3 4)).to.eql(true);
     // });
     // it("should allow to create hash maps", function() {
     //   expect(oi (eq {"a" 2 "b" 4} (hash_map "a" 2 "b" 4))).to.eql(true);
     // });
     // it("should allow to create hash maps and evaluate forms", function() {
     //   expect(oi (eq {"a" (inc 1) (str "b") 4} (hash_map "a" 2 "b" 4))).to.eql(true);
     // });
     // it("should allow to create deeply nested data structures", function() {
     //   expect(oi (eq {"a" [2 [3 4]] "b" {"c" 5 [6 7] "d"}} 
     //               (hash_map "a" (list 2 (list 3 4)) 
     //                         "b" (hash_map "c" 5 (list 6 7) "d")))).to.eql(true);
     // });
     // it("should allow to create js arrays", function() {
     //   expect(oi (do [$ 1 2 3 4])).to.eql([1,2,3,4]);
     // });
     // it("should allow to create js objects", function() {
     //   expect(oi (do {$ "a" 1 "b" 2})).to.eql({a: 1, b: 2});
     // });
     // it("should allow to create nested js objects", function() {
     //   expect(oi (do {$ "a" {$ "c" [$ 3 4]} "b" 2})).to.eql({a: {c: [3, 4]}, b: 2});
     // });
);
// describe("recursion", function() {
//   it("should allow to express simple recursion", function() {
//     oi (defn fib [n]
//         (cond 
//          (eq n 0) 0
//          (eq n 1) 1
//          "else" (sum (fib (js n-1)) (fib (js n-2)))));
//     expect(oi (fib 20)).to.eql(6765);
//   });
//   it("should allow to recur using loop/recur without blowing the stack", function() {
//     oi (defn fib [n]
//         (loop [a 0 b (inc a) iter 0]
//          (if (js iter == n) a
//           (recur b (js a + b) (inc iter)))));
//     expect(oi (fib 20)).to.eql(6765);
//     expect(oi (fib 500)).to.eql(1.394232245616977e+104);
//   });
// });
// describe("keywords", function() {
//   it("should be usable in collections", function() {
//     var mori = _ki.modules.mori;
//     expect(oi (do [:a 1 :b {:c 2}])).to.eql(
//       mori.vector(mori.keyword('a'),1,
//         mori.keyword('b'),mori.hash_map(mori.keyword('c'),2)));
//   });
//   it("should evaluate to themselves", function() {   
//    expect(oi (do (:a))).to.eql(_.keyword('a'));
//   });
//   it("should evaluate as keys to get values from collections", function() {   
//    expect(oi (:a {:a 1 :b 2})).to.eql(1);
//   });
// });
// describe("arity", function() {
//   it("should allow calling functions without arity constraints, as in js", function() {
//     oi (defn foo [a] (str "Hello " a))
//     expect(
//       oi (foo 1 2)
//       ).to.eql("Hello 1");
//     expect(
//       oi (foo)
//       ).to.eql("Hello undefined");
//   });
//   it("should allow to define functions with multiple arities", function() {
//     oi (defn foo 
//          ([a] (str "Hello " a))
//          ([a b] (str "There " a " " b)))
//     expect(
//       oi (foo 1)
//       ).to.eql("Hello 1");
//     expect(
//       oi (foo 1 2)
//       ).to.eql("There 1 2");
//   });
//   it("should allow to define named anonymous functions with multiple arities and refer to the name within the body", function() {
//     var f = oi (fn self
//                  ([] (self "world"))
//                  ([who] (str "Hello " who "!")))
//     expect(f()).to.eql("Hello world!");
//     expect(f("yellow")).to.eql("Hello yellow!");
//   });
//   it("should fallback to max arity in case supplied arguments do not match the specified arities", function() {
//     oi (defn foo 
//          ([a] (str "Hello " a))
//          ([a b] (str "There " a " " b)))
//     expect(
//       oi (foo)
//       ).to.eql("There undefined undefined");
//     expect(
//       oi (foo 1 2 3)
//       ).to.eql("There 1 2");
//   });
//   //it("should allow to define functions with optional arguments", function() {
//   //  throw "Not implemented"
//   //});
// });
describe('dot notation', function () {
    it('should allow to use dot notation to invoke methods on JavaScript objects', function () {
        var a$2519 = {
                bar: function (x$2523) {
                    return x$2523 * 2;
                }
            };
        var b$2520 = {
                foo: function (x$2524) {
                    return a$2519;
                }
            };
        expect$1424(function () {
            if (!global._oi_) {
                var core$2531 = require('../lib/core.js');
                core$2531.__extend__(global, core$2531);
                global._oi_ = true;
            }
            // initialized oi.
            return a$2519.bar(2);
        }()).to.eql(4);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2539 = require('../lib/core.js');
                core$2539.__extend__(global, core$2539);
                global._oi_ = true;
            }
            // initialized oi.
            return b$2520.foo().bar(2);
        }()).to.eql(4);
    });
});
describe('chaining and doto', function () {
    it('should allow to use JavaScript chained APIs', function () {
        var A$2552 = function () {
            var self$2555 = this;
            this.v = 'init ';
            this.foo = function (x$2556) {
                self$2555.v += 'foo called with ' + x$2556 + ' ';
                return self$2555;
            };
            this.bar = function (x$2557) {
                self$2555.v += 'bar called with ' + x$2557 + ' ';
                return self$2555;
            };
        };
        var a$2553 = new A$2552();
        expect$1424(function () {
            if (!global._oi_) {
                var core$2576 = require('../lib/core.js');
                core$2576.__extend__(global, core$2576);
                global._oi_ = true;
            }
            // initialized oi.
            return a$2553.foo(1).bar(2).v;
        }()).to.eql('init foo called with 1 bar called with 2 ');
    });
    it('should allow to repeatedly call methods on a JavaScript object', function () {
        var A$2577 = function () {
            var self$2580 = this;
            this.foo = null;
            this.bar = null;
            this.setFoo = function (x$2581) {
                self$2580.foo = x$2581;
            };
            this.setBar = function (x$2582) {
                self$2580.bar = x$2582;
            };
            this.getFooBar = function () {
                return self$2580.foo + ' ' + self$2580.bar;
            };
        };
        var a$2578 = new A$2577();
        expect$1424(function () {
            if (!global._oi_) {
                var core$2584 = require('../lib/core.js');
                core$2584.__extend__(global, core$2584);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                a$2578.setFoo('a');
                a$2578.setBar('b');
                return a$2578;
            }.call(this);
        }().getFooBar()).to.eql('a b');
    });
});
describe('threading', function () {
    it('should allow to thread first a value through a sequence of computations', function () {
        var a$2593 = 1;
        expect$1424(function () {
            if (!global._oi_) {
                var core$2614 = require('../lib/core.js');
                core$2614.__extend__(global, core$2614);
                global._oi_ = true;
            }
            // initialized oi.
            return dec(inc(inc(a$2593)));
        }()).to.eql(2);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2633 = require('../lib/core.js');
                core$2633.__extend__(global, core$2633);
                global._oi_ = true;
            }
            // initialized oi.
            return sum(sum(a$2593, 2), 3);
        }()).to.eql(6);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2648 = require('../lib/core.js');
                core$2648.__extend__(global, core$2648);
                global._oi_ = true;
            }
            // initialized oi.
            return first(conj(require('immutable').List.of(), 1));
        }()).to.eql(1);
    });
    it('should allow to thread last a value through a sequence of computations', function () {
        var a$2696 = 1;
        expect$1424(function () {
            if (!global._oi_) {
                var core$2719 = require('../lib/core.js');
                core$2719.__extend__(global, core$2719);
                global._oi_ = true;
            }
            // initialized oi.
            return first(map(function (x$2798) {
                return inc(x$2798);
            }, conj(require('immutable').List.of(), a$2696)));
        }()).to.eql(2);
    });
});
describe('math operations', function () {
    it('should allow to add, subtract, multiply, divide a sequence of numbers and compute the modulo of two numbers', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$2833 = require('../lib/core.js');
                core$2833.__extend__(global, core$2833);
                global._oi_ = true;
            }
            // initialized oi.
            return add(1, 2, 3);
        }()).to.eql(6);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2846 = require('../lib/core.js');
                core$2846.__extend__(global, core$2846);
                global._oi_ = true;
            }
            // initialized oi.
            return sub(3, 2, 1);
        }()).to.eql(0);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2859 = require('../lib/core.js');
                core$2859.__extend__(global, core$2859);
                global._oi_ = true;
            }
            // initialized oi.
            return mul(1, 2, 3);
        }()).to.eql(6);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2872 = require('../lib/core.js');
                core$2872.__extend__(global, core$2872);
                global._oi_ = true;
            }
            // initialized oi.
            return div(3, 2, 1);
        }()).to.eql(1.5);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2882 = require('../lib/core.js');
                core$2882.__extend__(global, core$2882);
                global._oi_ = true;
            }
            // initialized oi.
            return mod(3, 2);
        }()).to.eql(1);
    });
    it('should allow to compare sequences of numbers', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$2907 = require('../lib/core.js');
                core$2907.__extend__(global, core$2907);
                global._oi_ = true;
            }
            // initialized oi.
            return lt(1, 2, 3);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2920 = require('../lib/core.js');
                core$2920.__extend__(global, core$2920);
                global._oi_ = true;
            }
            // initialized oi.
            return lt(3, 2, 1);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2933 = require('../lib/core.js');
                core$2933.__extend__(global, core$2933);
                global._oi_ = true;
            }
            // initialized oi.
            return lt(1, 2, 2);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2946 = require('../lib/core.js');
                core$2946.__extend__(global, core$2946);
                global._oi_ = true;
            }
            // initialized oi.
            return gt(1, 2, 3);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2959 = require('../lib/core.js');
                core$2959.__extend__(global, core$2959);
                global._oi_ = true;
            }
            // initialized oi.
            return gt(3, 2, 1);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2972 = require('../lib/core.js');
                core$2972.__extend__(global, core$2972);
                global._oi_ = true;
            }
            // initialized oi.
            return gt(3, 2, 2);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2985 = require('../lib/core.js');
                core$2985.__extend__(global, core$2985);
                global._oi_ = true;
            }
            // initialized oi.
            return leq(1, 2, 3);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$2998 = require('../lib/core.js');
                core$2998.__extend__(global, core$2998);
                global._oi_ = true;
            }
            // initialized oi.
            return leq(3, 2, 1);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$3011 = require('../lib/core.js');
                core$3011.__extend__(global, core$3011);
                global._oi_ = true;
            }
            // initialized oi.
            return leq(1, 2, 2);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$3024 = require('../lib/core.js');
                core$3024.__extend__(global, core$3024);
                global._oi_ = true;
            }
            // initialized oi.
            return geq(1, 2, 3);
        }()).to.eql(false);
        expect$1424(function () {
            if (!global._oi_) {
                var core$3037 = require('../lib/core.js');
                core$3037.__extend__(global, core$3037);
                global._oi_ = true;
            }
            // initialized oi.
            return geq(3, 2, 1);
        }()).to.eql(true);
        expect$1424(function () {
            if (!global._oi_) {
                var core$3050 = require('../lib/core.js');
                core$3050.__extend__(global, core$3050);
                global._oi_ = true;
            }
            // initialized oi.
            return geq(3, 2, 2);
        }()).to.eql(true);
    });
});
describe('continuations', function () {
    it('should allow to write asynchronous code in a synchronous fashion', function () {
        var foo$3051 = function (x$3057, cb$3058) {
            var y$3059 = x$3057 * 2;
            cb$3058(y$3059);
        };
        var bar$3052 = function (x$3060, cb$3061) {
            var y$3062 = x$3060 + 1;
            cb$3061(y$3062);
        };
        var baz$3053 = function (x$3063, cb$3064) {
            var y$3065 = x$3063 + 1;
            var z$3066 = x$3063 * 2;
            cb$3064(y$3065, z$3066);
        };
        (function () {
            if (!global._oi_) {
                var core$3077 = require('../lib/core.js');
                core$3077.__extend__(global, core$3077);
                global._oi_ = true;
            }
            // initialized oi.
            return foo$3051(2, function (a$3078) {
                bar$3052(a$3078, function (b$3093) {
                    baz$3053(b$3093, function (c$3108, d$3109) {
                        expect$1424(b$3093).to.eql(5);
                        expect$1424(c$3108).to.eql(6);
                        expect$1424(d$3109).to.eql(10);
                        return null;
                    });
                    return null;
                });
                return null;
            });
        }());
        var log$3055 = '';
        (function () {
            if (!global._oi_) {
                var core$3120 = require('../lib/core.js');
                core$3120.__extend__(global, core$3120);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                defn(fake_request, require('immutable').List.of(url, cb), setTimeout(function () {
                    return cb(1234);
                }, 1000));
                fake_request('fakeurl', function (data$3167) {
                    log$3055 += 'Response received: ' + data$3167 + '.';
                    expect$1424(log$3055).to.eql('Request sent. Response received: 1234.');
                    return null;
                });
                return log$3055 += 'Request sent. ';
            }.call(this);
        }());
        expect$1424(log$3055).to.eql('Request sent. ');
    });
});
describe('apply', function () {
    it('should call a function given a list of arguments supplied as a collection', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$3198 = require('../lib/core.js');
                core$3198.__extend__(global, core$3198);
                global._oi_ = true;
            }
            // initialized oi.
            return list.apply(this, clj_to_js(require('immutable').List.of(1, 2, 3, 4)));
        }()).to.eql(_$1425.list(1, 2, 3, 4));
    });
});
describe('bind', function () {
    it('should return a function with this set to the provided object', function () {
        (function () {
            if (!global._oi_) {
                var core$3203 = require('../lib/core.js');
                core$3203.__extend__(global, core$3203);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                def(a, require('immutable').fromJS({
                    'a': 1,
                    'b': 2
                }));
                return defn(f, require('immutable').List.of(), get(this, keyword('a')));
            }.call(this);
        }());
        expect$1424(function () {
            if (!global._oi_) {
                var core$3276 = require('../lib/core.js');
                core$3276.__extend__(global, core$3276);
                global._oi_ = true;
            }
            // initialized oi.
            return f.bind(a)();
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$3288 = require('../lib/core.js');
                core$3288.__extend__(global, core$3288);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                return get(this, keyword('a'));
            }.bind(a)();
        }()).to.eql(1);
    });
});
// describe("multimethods", function() {
//   it("should allow to define functions that dispatch according to the result of the evaluation of another function", function() {
//     oi (do
//         (defmulti boss (fn [x] (get x :type)))
//         (defmethod boss :employee [x] (get x :employer))
//         (defmethod boss :employer [x] (get x :name)));
//     expect(oi (boss {:type :employee :name "Barnie" :employer "Fred"})).to.eql("Fred");
//     expect(oi (boss {:type :employer :name "Fred"})).to.eql("Fred");
//   });
// });
// describe("atoms", function() {
//   it("should allow to define reference types with read and write callbacks", function() {
//     oi (do
//         (let [r (atom 1 (fn [n o] (js expect(n).to.eql(2); expect(o).to.eql(1)))
//                         (fn [x] (js expect(x).to.eql(2))))]
//          (reset r 2)
//          (deref r)));
//     oi (do
//         (let [r (atom 1 (fn [n o] (js expect(n).to.eql(2); expect(o).to.eql(1)))
//                         (fn [x] (js expect(x).to.eql(2))))]
//          (swap r inc)
//          (js expect(oi (deref r)).to.eql(2))));
//   });
// });
describe('exceptions', function () {
    it('should allow to try expressions and catch exceptions', function () {
        (function () {
            if (!global._oi_) {
                var core$3313 = require('../lib/core.js');
                core$3313.__extend__(global, core$3313);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                try {
                    foo.bar;
                } catch (e$3315) {
                    expect$1424(e$3315).to.be.a(ReferenceError);
                }
            }.call(this);
        }());
        var side_effect$3310 = false;
        (function () {
            if (!global._oi_) {
                var core$3318 = require('../lib/core.js');
                core$3318.__extend__(global, core$3318);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                var ret$3319;
                try {
                    ret$3319 = foo.bar;
                } catch (e$3321) {
                    ret$3319 = expect$1424(e$3321).to.be.a(ReferenceError);
                } finally {
                    side_effect$3310 = true;
                }
                return ret$3319;
            }.call(this);
        }());
        expect$1424(side_effect$3310).to.eql(true);
    });
    it('should allow to throw exceptions', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$3326 = require('../lib/core.js');
                core$3326.__extend__(global, core$3326);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                return function () {
                    throw Error('foo');
                }.call(this);
            };
        }()).to.throwError();
    });
});
describe('this and fnth', function () {
    it('should handle binding this fn-wise correctly from within IIFN', function () {
        (function () {
            if (!global._oi_) {
                var core$3352 = require('../lib/core.js');
                core$3352.__extend__(global, core$3352);
                global._oi_ = true;
            }
            // initialized oi.
            return defn(somefn, require('immutable').List.of(), function () {
                return function (v$3387) {
                    var a$3389 = v$3387;
                    return this.someprop;
                }.call(this, 1);
            }.call(this));
        }());
        var bar$3336 = { someprop: 1 };
        var baz$3337 = {};
        expect$1424(function () {
            if (!global._oi_) {
                var core$3398 = require('../lib/core.js');
                core$3398.__extend__(global, core$3398);
                global._oi_ = true;
            }
            // initialized oi.
            return somefn.bind(bar$3336)();
        }()).to.eql(1);
        expect$1424(function () {
            if (!global._oi_) {
                var core$3411 = require('../lib/core.js');
                core$3411.__extend__(global, core$3411);
                global._oi_ = true;
            }
            // initialized oi.
            return somefn.bind(baz$3337)();
        }()).to.eql(undefined);
        expect$1424(function () {
            if (!global._oi_) {
                var core$3423 = require('../lib/core.js');
                core$3423.__extend__(global, core$3423);
                global._oi_ = true;
            }
            // initialized oi.
            return somefn();
        }()).to.eql(undefined);
    });
    it('should allow a shorthand notation for defining a fn bound to the enclosing this, both named and unnamed', function () {
        var fn1$3430, fn2$3431;
        (function () {
            if (!global._oi_) {
                var core$3434 = require('../lib/core.js');
                core$3434.__extend__(global, core$3434);
                global._oi_ = true;
            }
            // initialized oi.
            return function () {
                this.jee = 1;
                return function () {
                    return function (v$3441) {
                        var a$3443 = v$3441;
                        return function (v$3446) {
                            var b$3448 = v$3446;
                            return function (v$3451) {
                                var c$3453 = v$3451;
                                fn1$3430 = a$3443;
                                fn2$3431 = b$3448;
                                return fn3 = c$3453;
                            }.call(this, function cfn() {
                                return this.jee;
                            }.bind(this));
                        }.call(this, function () {
                            return this.jee;
                        }.bind(this));
                    }.call(this, function () {
                        return this.jee;
                    });
                }.call(this);
            }.call(this);
        }());
        expect$1424(fn1$3430.bind({ jee: 2 })()).to.eql(2);
        expect$1424(fn2$3431.bind({ jee: 2 })()).to.eql(1);
        expect$1424(fn3.bind({ jee: 2 })()).to.eql(1);
    });
});
describe('str', function () {
    it('should allow to concatenate strings and literals', function () {
        expect$1424(function () {
            if (!global._oi_) {
                var core$3486 = require('../lib/core.js');
                core$3486.__extend__(global, core$3486);
                global._oi_ = true;
            }
            // initialized oi.
            return str('a', 2, 'b', 3, 'c');
        }()).to.eql('a2b3c');
    });
});
describe('destructuring', function () {
    it('should destructure nested immutable data structures in let forms', function () {
        var r$3488 = function () {
                if (!global._oi_) {
                    var core$3490 = require('../lib/core.js');
                    core$3490.__extend__(global, core$3490);
                    global._oi_ = true;
                }
                // initialized oi.
                return function () {
                    return function (v$3507) {
                        var f$3515 = first(v$3507);
                        var a$3517 = f$3515;
                        var r$3525 = rest(v$3507);
                        var f$3532 = first(r$3525);
                        var b$3534 = f$3532;
                        var r$3542 = rest(r$3525);
                        var f$3549 = first(r$3542);
                        var f$3564 = get(f$3549, keyword('c'));
                        var c$3566 = f$3564;
                        var f$3581 = get(f$3549, keyword('d'));
                        var f$3589 = first(f$3581);
                        var d$3591 = f$3589;
                        var r$3599 = rest(f$3581);
                        var f$3606 = first(r$3599);
                        var e$3608 = f$3606;
                        return function (v$3612) {
                            var f$3614 = v$3612;
                            return eq(require('immutable').List.of(a$3517, b$3534, c$3566, d$3591, e$3608), require('immutable').List.of(1, 2, 3, 4, 5));
                        }.call(this, 6);
                    }.call(this, require('immutable').List.of(1, 2, require('immutable').fromJS({
                        'c': 3,
                        'd': require('immutable').List.of(4, 5)
                    })));
                }.call(this);
            }();
        expect$1424(r$3488).to.eql(true);
    });
    it('should destructure nested JS data structures in let forms', function () {
        var r$3676 = function () {
                if (!global._oi_) {
                    var core$3678 = require('../lib/core.js');
                    core$3678.__extend__(global, core$3678);
                    global._oi_ = true;
                }
                // initialized oi.
                return function () {
                    return function (v$3681) {
                        var f$3683 = v$3681[0];
                        var a$3685 = f$3683;
                        var r$3686 = v$3681.slice(1);
                        var f$3688 = r$3686[0];
                        var b$3690 = f$3688;
                        var r$3691 = r$3686.slice(1);
                        var f$3693 = r$3691[0];
                        var f$3695 = f$3693['c'];
                        var c$3697 = f$3695;
                        var f$3699 = f$3693['d'];
                        var f$3701 = f$3699[0];
                        var d$3703 = f$3701;
                        var r$3704 = f$3699.slice(1);
                        var f$3706 = r$3704[0];
                        var e$3708 = f$3706;
                        return eq(require('immutable').List.of(a$3685, b$3690, c$3697, d$3703, e$3708), require('immutable').List.of(1, 2, 3, 4, 5));
                    }.call(this, [
                        1,
                        2,
                        {
                            c: 3,
                            d: [
                                4,
                                5
                            ]
                        }
                    ]);
                }.call(this);
            }();
        expect$1424(r$3676).to.eql(true);
    });
    it('should destructure nested immutable data structures in loop forms', function () {
        var r$3776 = function () {
                if (!global._oi_) {
                    var core$3778 = require('../lib/core.js');
                    core$3778.__extend__(global, core$3778);
                    global._oi_ = true;
                }
                // initialized oi.
                return function () {
                    var res$3779 = {};
                    do {
                        res$3779 = function () {
                            return function (v$3793) {
                                var f$3801 = first(v$3793);
                                var a$3803 = f$3801;
                                var r$3811 = rest(v$3793);
                                var f$3818 = first(r$3811);
                                var b$3820 = f$3818;
                                var r$3828 = rest(r$3811);
                                var f$3835 = first(r$3828);
                                var _$3837 = f$3835;
                                return function () {
                                    if (truthy(gt(a$3803, 3))) {
                                        return eq(require('immutable').List.of(a$3803, b$3820), require('immutable').List.of(4, 5));
                                    }
                                    return {
                                        _oi_recur: true,
                                        _oi_vals: [map(inc, require('immutable').List.of(a$3803, b$3820, 3))]
                                    };
                                }.call(this);
                            }(res$3779._oi_vals === undefined ? require('immutable').List.of(1, 2, 3) : res$3779._oi_vals[0]);
                            ;
                        }();
                    } while ((res$3779 || 0)._oi_recur);
                    return res$3779;
                }.call(this);
            }();
        expect$1424(r$3776).to.eql(true);
    });
    it('should destructure nested JS data structures in loop forms', function () {
        var r$3899 = function () {
                if (!global._oi_) {
                    var core$3901 = require('../lib/core.js');
                    core$3901.__extend__(global, core$3901);
                    global._oi_ = true;
                }
                // initialized oi.
                return function () {
                    var res$3902 = {};
                    do {
                        res$3902 = function () {
                            return function (v$3905) {
                                var f$3907 = v$3905[0];
                                var a$3909 = f$3907;
                                var r$3910 = v$3905.slice(1);
                                var f$3912 = r$3910[0];
                                var b$3914 = f$3912;
                                var r$3915 = r$3910.slice(1);
                                var f$3917 = r$3915[0];
                                var _$3919 = f$3917;
                                return function () {
                                    if (truthy(gt(a$3909, 3))) {
                                        return eq(require('immutable').List.of(a$3909, b$3914), require('immutable').List.of(4, 5));
                                    }
                                    return {
                                        _oi_recur: true,
                                        _oi_vals: [clj_to_js(map(inc, require('immutable').List.of(a$3909, b$3914, 3)))]
                                    };
                                }.call(this);
                            }(res$3902._oi_vals === undefined ? [
                                1,
                                2,
                                3
                            ] : res$3902._oi_vals[0]);
                            ;
                        }();
                    } while ((res$3902 || 0)._oi_recur);
                    return res$3902;
                }.call(this);
            }();
        expect$1424(r$3899).to.eql(true);
    });
});