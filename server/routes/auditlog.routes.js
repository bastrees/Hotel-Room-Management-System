// routes/auditlog.routes.js
const express = require('express');
const router = express.Router();
const AuditLogController = require('../controller/AuditLog.controller');

router.get('/', AuditLogController.listAuditLogs);

module.exports = router;
