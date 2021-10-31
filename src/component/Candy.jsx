import React from 'react'

const Candy = ({color, index}) =>
{
    return <img 
        style={{
            backgroundColor: color,
        }} 
        alt={index}
    />
}

export default Candy