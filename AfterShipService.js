class AfterShipService {
  constructor() {
    const AfterShipToken = aftership_token;
    //default constructor
    this.AfterShip = require('aftership')(AfterShipToken);
  }

  __trackers() {
    const AfterShip = this.AfterShip;
    return new Promise(function (resolve, reject) {
      AfterShip.call('GET', '/couriers/all', function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.data.couriers);
        }
      });
    });
  }

  __createTracking(data) {
    const AfterShip = this.AfterShip;
    let {
      shipping_slug,
      tracking_number,
      order_id
    } = data;
    let body = {
      'tracking': {
        'slug': shipping_slug,
        'tracking_number': tracking_number,
        'order_id': order_id
      }
    };
    return new Promise(function (resolve, reject) {
      AfterShip.call('POST', '/trackings', {
        body: body
      }, function (err, result) {
        if (err) reject(err.response_body);
        else resolve(result);
      });
    });
  }

  __trackingInfo(data) {
    const AfterShip = this.AfterShip;
    let {
      shipping_slug,
      tracking_number
    } = data;
    console.log(tracking_number,'tracking_number');
    let endpoint = `/trackings/${shipping_slug}/${tracking_number}`;
    return new Promise(function (resolve, reject) {
      AfterShip.call('GET', endpoint, function (err, result) {
        if (err) reject(err);
        else {
          resolve(result.data.tracking);
        }
      });
    });
  }

  __deleteTracking(data) {
    const AfterShip = this.AfterShip;
    let {
      shipping_slug,
      tracking_number
    } = data;
    return new Promise(function (resolve, reject) {
      AfterShip.call('DELETE', '/trackings/' + shipping_slug + tracking_number, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}

module.exports = AfterShipService;

