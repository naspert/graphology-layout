/**
 * Graphology CirclePack layout
 * ===============================
 *
 * Helper class, ported from CirclePackLayout gephi plugin
 */

function CircleWrap(id, x, y, r, circleWrap) {
    this.wrappedCircle = circleWrap || null;//hacky d3 reference thing

    this.children = {};
    this.id = id || null;
    this.next = null;
    this.previous = null;

    this.x = x || null;
    this.y = y || null;
    if (circleWrap)
        this.r = 1010101; // XXX should not be used in this case
    else
        this.r = r || 999;

}

CircleWrap.prototype.hasChildren = function() {
    return Object.keys(this.children).length > 0;
};

CircleWrap.prototype.addChild = function(id, child) {
    this.children[id] = child;
};

CircleWrap.prototype.getChild = function(id) {
    if (!this.children.hasOwnProperty(id)) {
        var circleWrap = new CircleWrap();
        this.children[id] = circleWrap;
    }
    return this.children[id];
};

CircleWrap.prototype.applyPositionToChildren = function() {
    if (this.hasChildren()) {
        var root = this; // using 'this' in Object.keys.forEach seems a bad idea
        Object.keys(root.children).forEach(function(key) {
            var child = root.children[key];
            child.x += root.x;
            child.y += root.y;
            child.applyPositionToChildren();
        });
    }
};

module.exports = CircleWrap;