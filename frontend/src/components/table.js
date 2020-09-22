import React from 'react';

export default function Table({ id, children }) {
    return (
        <table id={id}>
            <tbody>
                {children}
            </tbody>
        </table>
    );
}