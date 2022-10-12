import React from 'react';
import Produce from './Produce';

export default function Main (props) {
    const {produce, onAdd} = props;
    return (
        <main className="block col-2">
            <h2>Produce</h2>
                <div className="row">
                    {produce.map((produce) => (
                        <Produce key={produce.id} produce={produce} onAdd={onAdd}></Produce>
                    ))}
                </div>
        </main>
    );
}