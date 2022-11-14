export class NBString {
    // 整数format，适用 nft count此类场景
    static formatToReadableInt(target: number | string, digits: number = 3) {
      if (target == null) {
        return Number(0)
      }
      var num: number;
      if (typeof target === 'string') {
        num = +target     // convert string to number
      } else {
        num = target as number;
      }
      if (num < 1000) {
        return num
      }
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
          return num >= item.value;
        });
      return item
        ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        : "0";
    }
    static formatToReadable(target: number | string, digits: number = 3) {
      if (target == null) {
        return Number(0).toFixed(digits)
      }
      var num: number;
      if (typeof target === 'string') {
        num = +target     // convert string to number
      } else {
        num = target as number;
      }
      if (num < 1000) {
        return num.toFixed(digits)
      }
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var item = lookup
        .slice()
        .reverse()
        .find(function (item) {
          return num >= item.value;
        });
      return item
        ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        : "0";
    }
  
    static truncateAddress(addr: string, beforeLimit: number, afterLimit: number) {
      if (addr?.length < (beforeLimit * 2)) {
        return addr
      }
      if (addr?.length > beforeLimit) {
        return addr.substring(0, beforeLimit) + "..." + addr.substring(addr.length - afterLimit, addr.length);
      } else {
        return addr;
      }
    }
  
  
    static truncateString(string, limit) {
      if (string?.length > limit) {
        return string.substring(0, limit) + "...";
      } else {
        return string;
      }
    }
  
    static formatToTimeAgo(timestamp: number) {
      var periods = {
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
      };
  
      var diff = Date.now() - timestamp;
      if (diff > periods.month) {
        // it was at least a month ago
        return Math.floor(diff / periods.month) + "mon ago";
      } else if (diff > periods.week) {
        return Math.floor(diff / periods.week) + "w ago";
      } else if (diff > periods.day) {
        return Math.floor(diff / periods.day) + "d ago";
      } else if (diff > periods.hour) {
        return Math.floor(diff / periods.hour) + "h ago";
      } else if (diff > periods.minute) {
        return Math.floor(diff / periods.minute) + "min ago";
      }
      return "Just now";
    }
    static formatToTimeAfter(timestamp: number) {
      var periods = {
        year: 365 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
      };
  
      var diff = timestamp - Date.now();
      if (diff > periods.year) {
        return Math.floor(diff / periods.year) + " years";
      } else if (diff > periods.month) {
        // it was at least a month ago
        return Math.floor(diff / periods.month) + " months";
      } else if (diff > periods.week) {
        return Math.floor(diff / periods.week) + " weeks";
      } else if (diff > periods.day) {
        return Math.floor(diff / periods.day) + " days";
      } else if (diff > periods.hour) {
        return Math.floor(diff / periods.hour) + " hours";
      } else if (diff > periods.minute) {
        return Math.floor(diff / periods.minute) + " minutes";
      }
      return "Just now";
    }
    static formatUrl(target: string) {
      if (target.startsWith("https://") || target.startsWith("http://")) {
        return
      }
      return "https://" + target
    }
  
    static formatToThousands(num: any = 0) {
      return num.toString().replace(/\d+/, function (n) {
        return n.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      });
    }
  
    static formatDate(timeMills) {
      /* 将时间戳格式化为yyyy-MM-dd hh:mm:ss格式，其它格式可自行更改 */
      var date = new Date(timeMills);
      var timeStr = date.getFullYear() + ".";
      if (date.getMonth() < 9) { // 月份从0开始的
        timeStr += '0';
      }
      timeStr += date.getMonth() + 1 + ".";
      timeStr += date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
      timeStr += ' at ';
      timeStr += date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
      timeStr += ':';
      timeStr += date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
      timeStr += ':';
      timeStr += date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
      return timeStr;
    }
  
    static formatDateTime(timeMills) {
      /* 将时间戳格式化为yyyy-MM-dd hh:mm:ss格式，其它格式可自行更改 */
      var date = new Date(timeMills);
      var timeStr = date.getFullYear() + "-";
      if (date.getMonth() < 9) { // 月份从0开始的
        timeStr += '0';
      }
      timeStr += date.getMonth() + 1 + "-";
      timeStr += date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate();
      return timeStr;
    }
  
    static textIsNull(val: any) { //判断输入框是否为空(包括空格 回车)
      if (val.replace(/\s/g, '').length > 0) {
        return true;
      } else {
        return false;
      }
    };
  
    static hilighter(content, keyword, tagName) {
      if (content === "No results") {
        return content
      }
      const a = content.toLowerCase()
      const b = keyword.toLowerCase()
  
      const indexof = a.indexOf(b)
      const c = indexof > -1 ? content.substr(indexof, keyword.length) : ''
      const val = `<${tagName} style="background-color:#D7FAFA;">${c}</${tagName}>`
      const regS = new RegExp(keyword, 'gi')
      return content.replace(regS, val)
    }
  }