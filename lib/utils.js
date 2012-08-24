
exports.defaults = function (obj) {
  Array.prototype.slice.apply(arguments).slice(1).forEach(function (source) {
    for (var p in source) {
      if (obj[p] == null) obj[p] = source[p]
    }
  })
  return obj
}
