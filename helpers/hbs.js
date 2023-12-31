const moment = require('moment')

module.exports = {
    formatDate: function (date, format) {
        return moment(date).utc().format(format)
      },
    truncate: function (str, len) {
      if (str.length > len && str.length > 0) {
        console.log("str", str)
        let new_str = str + ' '
        new_str = str.substr(0, len)
        new_str = str.substr(0, new_str.lastIndexOf(' '))
        new_str = new_str.length > 0 ? new_str : str.substr(0, len) 
        return new_str + '...'
      }
      return str
    },
    scriptTags: function (input) {
      return input.replace(/<(?:.|\n)*?>/gm,'')
    }
}