import React from 'react';

function Profile({ user }) {
    const { nickname, profile_image, email } = user || {};
    return (
        <>
            <h1>Profile</h1>
            <dd>{nickname}</dd>
            <dd><img src = {profile_image}></img></dd>
            <dd>{email}</dd>
        </>
    );
}

export default Profile;