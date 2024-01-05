import React, { useState, useEffect } from "react";

function Tooltip() {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        // Set visible to true when the component mounts or receives new props
        setVisible(true);

        // Set a timer to hide the tooltip after 3 seconds
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        // Clear the timer when the component is unmounted or when new props are received
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures the effect runs only on mount

    return (
        <div className="tooltip-container">
            {isVisible && <div className="tooltip">Check to delete</div>}
        </div>
    );
}

export default Tooltip;
