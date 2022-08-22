// import React, { useState } from 'react';

// const Profile = () => {

//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

//   console.log(user)
//   return (
//     <div>{user.result.name} {user?.result.imageUrl}</div>
//   )
// }

// export default Profile

import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import { getProfile } from '../../actions/profileForm';
import ProfileForm from '../ProfileForm/ProfileForm';
import Axios from 'axios';


const Profile = () => {
  const getProfiles = () =>{
    Axios.get('http://localhost:5000/profile')
    .then((response)=>{
      const data = response.data;
      setProfileId(data);
    }).catch(()=>{
      console.log('error');
    })
  } 
  getProfiles();

  //const user = JSON.parse(localStorage.getItem('profile'));
  //console.log(response.data)
  const classes = useStyles();
  const profiles = useSelector((state) => state);
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [profileId, setProfileId] = useState([]);


  useEffect(() => {
    dispatch(getProfile());
  }, [currentId, dispatch]);


  
  return (
    
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={4}>
            <ProfileForm currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <div>
            {getProfiles()}
          </div>
          <div>
            {profileId.map((val, key)=>{
              return (
                <div>
                <Card className={classes.card}>
                <img src = {val.selectedFile}/>
                <div className={classes.overlay}>
                  <Typography variant="h6">{val.bio}</Typography>
                </div>
                <div className={classes.details}>
                  <b><Typography variant="body2" color="textSecondary" component="h2">{val.status}</Typography></b>
                </div>
                </Card>
                </div>
              );
            })}
          </div>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Profile;

// import React from 'react';
// import { Card, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
// //import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// //import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// //import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
// import { useDispatch } from 'react-redux';
// import moment from 'moment';
// import ProfileForm from '../ProfileForm/ProfileForm';

// //import { likePost, deletePost } from '../../actions/profiles';
// import useStyles from './styles';

// const Profile = ({ profile, setCurrentId }) => {
//   const dispatch = useDispatch();
//   const classes = useStyles();
//   const user = JSON.parse(localStorage.getItem('profile'));

// //   const Likes = () => {
// //     if (profile.likes.length > 0) {
// //       return profile.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
// //         ? (
// //           <><ThumbUpAltIcon fontSize="small" />&nbsp;{profile.likes.length > 2 ? `You and ${profile.likes.length - 1} others` : `${profile.likes.length} like${profile.likes.length > 1 ? 's' : ''}` }</>
// //         ) : (
// //           <><ThumbUpAltOutlined fontSize="small" />&nbsp;{profile.likes.length} {profile.likes.length === 1 ? 'Like' : 'Likes'}</>
// //         );
// //     }

// //     return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
// //   };

// return (
//     <Card className={classes.card}>
//       <CardMedia className={classes.media} image={profile.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={profile.title} />
//       <div className={classes.overlay}>
//         <Typography variant="h6">{profile.name}</Typography>
//         <Typography variant="body2">{moment(profile.createdAt).fromNow()}</Typography>
//       </div>
//       {(user?.result?.googleId === profile?.creator || user?.result?._id === profile?.creator) && (
//       <div className={classes.overlay2}>
//         <Button onClick={() => setCurrentId(profile._id)} style={{ color: 'white' }} size="small">
//           <MoreHorizIcon fontSize="default" />
//         </Button>
//       </div>
//       )}
      
//       <Typography className={classes.status} gutterBottom variant="h5" component="h2">{profile.status}</Typography>
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">{profile.bio}</Typography>
//       </CardContent>
//       <ProfileForm />
//     </Card>
//   );
// };

// export default Profile;


