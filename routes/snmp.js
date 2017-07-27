var express = require('express');
var snmp = require("net-snmp");
var router = express.Router();
var snmpOptions = {
    port: 10080,
    /* retries: 1,
    timeout: 5000,
    transport: "udp4",
    trapPort: 162,
    version: snmp.Version1 */
};
var ipCentreon = process.env.SNMP_SERVER || "127.0.0.1"
var snmpMode = process.env.SNMP_MODE || "public"

router.post('/', function (req, res, next) {
    sendTrap(req.body.message);
    res.send(JSON.stringify(req.body, null, 2))
});

function sendTrap(alert) {

    var session = snmp.createSession(ipCentreon, snmpMode, snmpOptions);
    var trapOid = "1.3.6.1.4.1.2000.1";

    var varbinds = [
        {
            oid: "1.3.6.1.4.1.2000.2",
            type: snmp.ObjectType.OctetString,
            value: "Hardware health status changed"
        },
        {
            oid: "1.3.6.1.4.1.2000.3",
            type: snmp.ObjectType.OctetString,
            value: "status-error"
        }
    ];

    // version 2c should have been specified when creating the session
    session.trap(trapOid, varbinds, function (error) {
        if (error)
            console.error(error);
    });

    console.log(alert);
}

module.exports = router;
