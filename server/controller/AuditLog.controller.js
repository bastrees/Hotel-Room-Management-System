const AuditLogModel = require('../models/AuditLog.model');

const AuditLogController = {
    listAuditLogs: async (req, res) => {
        try {
            const auditLogs = await AuditLogModel.find().sort({ timestamp: -1 }).populate('userId');
            res.json({ success: true, auditLogs });
        } catch (error) {
            res.json({ success: false, message: `Error fetching audit logs: ${error.message}` });
        }
    }
};

module.exports = AuditLogController;
