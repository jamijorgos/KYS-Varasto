import mongoose from 'mongoose';
import LogModel from '../models/logModel.js'

// Get all Logs
export const getLogs = async (req, res) => {
    try {
        const allLogs = await LogModel.find();
        res.status(200).json(allLogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// Add new Log
export const addLog = async (req, res) => {
    const log = req.body;
    const newLog = new LogModel(log);
    try {
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}