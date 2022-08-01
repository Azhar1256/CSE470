import express from 'express';
import mongoose from 'mongoose';

import ProfileSchema from '../models/profile.js';

const router = express.Router();



export const getProfile = async (req, res) => { 
   

    try {
        const profile = await ProfileSchema.find();
        // console.log(profile)
        return res.status(200).json(profile);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProfile = async (req, res) => {
    const profile = req.body;

    const newProfileMessage = new ProfileSchema({ ...profile, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newProfileMessage.save();

        res.status(201).json(newProfileMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { bio, status, selectedFile, owner} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No profile with id: ${id}`);

    const updatedProfile = { bio, status, selectedFile, owner, _id: id };

    await ProfileSchema.findByIdAndUpdate(id, updatedProfile, { new: true });

    res.json(updatedProfile);
}



export default router;