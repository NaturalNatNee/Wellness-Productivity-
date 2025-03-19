import React, { useState } from 'react';
import TrackingPage from './TrackingTable/TrackingPage';

function TrackingPage () {
    const [TrackingStats, setTrackingStats] = useState(null);

    return (
        <div className= "tracking-page"  >
            <h1>Tracking Page</h1>
            <div className= "tracking-container">
                <TrackingPage setTrackingStats= {setTrackingStats} />
                {TrackingStats && < TrackingStats stats= {TrackingStats} />}
            </div>
        </div>
    )
};

export default Header;