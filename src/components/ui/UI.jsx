import React, { useCallback } from 'react';
import { AvatarPicker } from './AvatarPicker';
import { useViverseProfile, useViverseLogin } from '@react-three/viverse';
import userWorld from '../hooks/userWorld';

export const UI = () => {
    const user = useViverseProfile() || {
        name: 'anonymous',
        activeAvatar: { headIconUrl: 'https://picsum.photos/200' },
        anonymous: true
    };
    const login = useViverseLogin();

    const saveScreenshotAndUpload = userWorld((state) => state.saveScreenshotAndUpload);
    const savePicture = useCallback(() => {
        saveScreenshotAndUpload(user);
    }, [user, saveScreenshotAndUpload]); // added saveScreenshotAndUpload to deps

    const mode = userWorld((state) => state.mode);
    const hoveredFrame = userWorld((state) => state.hoveredFrame);
    const setMode = userWorld((state) => state.setMode);

    console.log('User Profile', user);

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                zIndex: 10,
            }}
        >
            {user.anonymous && (
                <button style={{ margin: 8 }} onClick={login}>
                    Login
                </button>
            )}
            <button style={{ margin: 8 }} onClick={savePicture}>
                Take Screenshot
            </button>
            {mode === 'explore' && hoveredFrame && (
                <button style={{ margin: 8 }} onClick={() => setMode('photos')}>
                    Enter Photos
                </button>
            )}
            {mode === 'photos' && (
                <button style={{ margin: 8 }} onClick={() => setMode('explore')}>
                    Exit Photos
                </button>
            )}
            <AvatarPicker />
        </div>
    );
};

export default UI;
