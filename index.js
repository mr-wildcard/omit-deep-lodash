'use strict';

const _ = require("lodash");

module.exports = function omitDeepLodash(input, props) {
  function omitDeepOnOwnProps(obj) {
    if (!_.isArray(obj) && !_.isObject(obj)) {
      return obj;
    }

    if (_.isArray(obj)) {
      return omitDeepLodash(obj, props);
    }

    const o = {};
    _.forOwn(obj, (value, key) => {
      o[key] = omitDeepLodash(value, props);
    });

    return _.omitBy(o, props);
  }

  if (typeof input === "undefined") {
    return {};
  }

  if (_.isArray(input)) {
    return input.map(omitDeepOnOwnProps);
  }

  return omitDeepOnOwnProps(input);
};
