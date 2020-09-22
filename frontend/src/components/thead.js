import React from 'react';

export default function Thead({ children }) {
    return (
        <thead>
            <tr>
                {children}
            </tr>
        </thead>
    );
}