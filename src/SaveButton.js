import React from 'react';
import SaveIcon from './SaveIcon';

const SaveButton = props => {
    return (
        <button type={"submit"} style={{
            padding: 0,
            width: "80px",
            background: "#667EEA", color: "white",  
            alignItems: "center", justifyContent: "space-between",
            border: "none",
            padding: "8px 12px"
            }}>
                <div style={{display: "inline"}}>
                <SaveIcon/>
                </div>    
            Save
        </button>
    );
}

export default SaveButton;