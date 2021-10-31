import React from 'react'

const Candy = (props) =>
{
    return <img 
        style={{ backgroundColor: props.color }} 
        alt={props.index}
        draggable={true}
        data-id={props.index}
        onDragStart={() => props.dragStart('test')}
        onDragOver={ (e) => e.preventDefault() }
        onDragEnter={ (e) => e.preventDefault() }
        onDragLeave={ (e) => e.preventDefault() }
        onDrop={() => props.dragDrop('test')}
        onDragEnd={() => props.dragEnd('test')}
    />
}

export default Candy