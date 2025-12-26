var t = function(t) {
  return (t = t.toString())[1] ? t : "0".concat(t)
};
module.exports = {
  formatTime: function(e) {
    var n = e.getFullYear(),
      r = e.getMonth() + 1,
      a = e.getDate(),
      o = e.getHours(),
      c = e.getMinutes(),
      i = e.getSeconds();
    return "".concat([n, r, a].map(t).join("/"), " ").concat([o, c, i].map(t).join(":"))
  },
  getDayRange: function(t) {
    var e = new Date(t);
    if (isNaN(e.getTime())) return console.error("Invalid Date"), null;
    var n = function(t) {
        return t.toString().padStart(2, "0")
      },
      r = function(t, e) {
        var r = t.getFullYear(),
          a = n(t.getMonth() + 1),
          o = n(t.getDate());
        return "".concat(r, "-").concat(a, "-").concat(o, " ").concat(e)
      };
    return {
      startTime: r(e, "00:00:00"),
      endTime: r(e, "23:59:59")
    }
  }
};