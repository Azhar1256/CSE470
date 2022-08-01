import React, { useState, useEffect} from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import useStyles from './styles';
import { createProfile, updateProfile } from '../../actions/profileForm';

const ProfileForm = ( {currentId, setCurrentId}) => {
    const [profileData, setProfileData] = useState({ bio:'', status:'', selectedFile:''});
    const profile = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));


    useEffect(() => {
        if(profile) setProfileData(profile)
    }, [profile])

    const clear = () =>{
        setCurrentId(null);
        setProfileData({ bio:'', status:'', selectedFile:''});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createProfile({ ...profileData, name: user?.result?.name}));
        }else{
            
            dispatch(updateProfile( currentId, { ...profileData, name: user?.result?.name}));
            clear();
        }
    }

    // if(!user?.result?.name) {
    //     return(
    //         <Paper className={classes.paper}>
    //            <Typography variant="h6" align="center">Please Sign in to create blogs and like other's blogs.</Typography> 
    //         </Paper>
    //     )
    // }

    return(
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
            <Typography variant="h6"> { currentId ? 'Editing' : 'Creating' } a Profile</Typography>
            
            <TextField name="bio" variant="outlined" label="Bio" fullWidth value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value})}/>
            <TextField name="status" variant="outlined" label="Status" fullWidth value={profileData.status} onChange={(e) => setProfileData({ ...profileData, status: e.target.value})}/>
            <TextField name="owner" type='hidden' fullWidth value={user?.result.id} onChange={(e) => setProfileData({ ...profileData, status: e.target.value})}/>
            
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=> setProfileData({...profileData, selectedFile: base64})}
                />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
            <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    );
}

export default ProfileForm;