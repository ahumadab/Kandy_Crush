import React from "react";
import Candy from "./Candy";

class KandyCrush extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            width: 8,
            blank: "",
            candyColors: ["blue", "green", "orange", "purple", "red", "yellow"],
            currentColorArrangement: []
        }
    }

    createBoard = () =>
    {
        const randomColorArrangement = []
        for (let i = 0; i < this.state.width * this.state.width; i++)
        {
            const randomColor = this.state.candyColors[Math.floor(Math.random() * this.state.candyColors.length)]
            randomColorArrangement.push(randomColor)
        }
        this.setState({ currentColorArrangement: randomColorArrangement })
    }

    checkForColumnOfThree = (colorArrangement) =>
    {
        for (let i = 0; i < (this.state.currentColorArrangement.length - (this.state.width*2)); i++)
        {
            const columnOfThree = [i, i + this.state.width, i + this.state.width * 2]
            const decidedColor = colorArrangement[i]

            if ( columnOfThree.every(candy =>colorArrangement[candy] === decidedColor))
            {
                return columnOfThree
            }
        }
    }

    checkForColumnOfFour = (colorArrangement) =>
    {
        for (let i = 0; i < (colorArrangement.length - (this.state.width*3)); i++)
        {
            const columnOfFour = [i, i + this.state.width, i + this.state.width * 2, i + this.state.width * 3]
            const decidedColor = colorArrangement[i]

            if ( columnOfFour.every(candy =>colorArrangement[candy] === decidedColor))
            {
                return columnOfFour
            }
        }
    }

    checkForRowOfThree = (colorArrangement) =>
    {
        const max = Math.pow(this.state.width, 2)
        forI : for (let i = 0; i < max; i++)
        {
            forJ : for (let j = this.state.width; j < max+1; j+=this.state.width)
            {
                if (i > j-3 && i < j)
                {
                    break forJ
                }
                else if (i <= j-3 )
                {
                    const rowOfThree = [i, i + 1, i + 2]
                    const decidedColor = colorArrangement[i]
                    if (rowOfThree.every(candy => colorArrangement[candy] === decidedColor))
                    {
                        return rowOfThree
                    }
                    break forJ
                }
            }
            
        }
    }

    checkForRowOfFour = (colorArrangement) =>
    {
        const max = Math.pow(this.state.width, 2)
        forI : for (let i = 0; i < max; i++)
        {
            forJ : for (let j = this.state.width; j < max+1; j+=this.state.width)
            {
                if (i > j-3 && i < j)
                {
                    break forJ
                }
                else if (i <= j-3 )
                {
                    const rowOfFour = [i, i + 1, i + 2, i + 3]
                    const decidedColor = colorArrangement[i]
                    if (rowOfFour.every(candyIndex => colorArrangement[candyIndex] === decidedColor))
                    {
                        return rowOfFour
                    }
                    break forJ
                }
            }
            
        }
    }

    deleteCandies = (candiesToBeDeleted) =>
    {
        const currentColorArrangement = [...this.state.currentColorArrangement]
        candiesToBeDeleted.forEach(index => {
            currentColorArrangement[index] = this.state.blank
        })
        this.setState({ currentColorArrangement })
    }

    checkCandies = (colorArrangement) =>
    {
        if (!colorArrangement) colorArrangement = [...this.state.currentColorArrangement]

        const collumnOfThree = this.checkForColumnOfThree(colorArrangement)
        const collumnOfFour = this.checkForColumnOfFour(colorArrangement)
        const rowOfThree = this.checkForRowOfThree(colorArrangement)
        const rowOfFour = this.checkForRowOfFour(colorArrangement)
        if (collumnOfFour)
        {
            return collumnOfFour
        }
        else if (rowOfFour)
        {
            return rowOfFour
        }
        else if (collumnOfThree)
        {
            return collumnOfThree
        }
        else if (rowOfThree)
        {
            return rowOfThree
        }
    }

    moveIntoSquareBelow = () =>
    {
        const currentColorArrangement = [...this.state.currentColorArrangement]
        for (let i = 0; i < this.state.width*this.state.width; i++)
        {
            if (i < this.state.width && currentColorArrangement[i] === this.state.blank)
            {
                const randomNumber = Math.floor(Math.random() * this.state.candyColors.length)
                currentColorArrangement[i] = this.state.candyColors[randomNumber]
                this.setState({ currentColorArrangement })
            }
            if (currentColorArrangement[i + this.state.width] === this.state.blank)
            {
                currentColorArrangement[i+this.state.width] = currentColorArrangement[i]
                currentColorArrangement[i] = this.state.blank
                this.setState({ currentColorArrangement })
            }
        }
    }

    dragStart = (event) =>
    {
        this.setState({ candyBeingDragged: event.target})
    }

    dragDrop = (event) =>
    {
        this.setState({ candyBeingReplaced: event.target})
    }

    dragEnd = (event) =>
    {
        const currentColorArrangement = [...this.state.currentColorArrangement]
        const candyBeingReplacedId = parseInt(this.state.candyBeingReplaced.getAttribute('data-id'))
        const candyBeingDraggedId = parseInt(this.state.candyBeingDragged.getAttribute('data-id'))


        currentColorArrangement[candyBeingReplacedId] = this.state.candyBeingDragged.style.backgroundColor
        currentColorArrangement[candyBeingDraggedId] = this.state.candyBeingReplaced.style.backgroundColor

        const validMoves = [
            candyBeingDraggedId - 1,
            candyBeingDraggedId - this.state.width,
            candyBeingDraggedId + 1,
            candyBeingDraggedId + this.state.width
        ]
        const validMove = validMoves.includes(candyBeingReplacedId)

        const checkCandies = this.checkCandies(currentColorArrangement)
        
        if (validMove && checkCandies) 
        {
            this.deleteCandies(checkCandies)
        }      
    }

    

    componentDidMount = () =>
    {
        this.createBoard()
    }

    componentDidUpdate = (prevProps, prevState) =>
    {
        if (prevState.currentColorArrangement !== this.state.currentColorArrangement)
        {
            const timer = setInterval(()=>{
                const candiesToBeDeleted = this.checkCandies(this.state.currentColorArrangement)
                if (candiesToBeDeleted) this.deleteCandies(candiesToBeDeleted)
                this.moveIntoSquareBelow()
            }, 100)
            console.log('currentColorArrangement has changed');
            return () => clearInterval(timer)
        }
    }


    render = () =>
    {
        return (
            <div className="game" style={{ gridTemplateColumns: repeat(this.state.width, '1fr') }}>
                {this.state.currentColorArrangement.map((candyColor, index) => (
                    <img 
                        key={index}
                        style={{ backgroundColor: candyColor }} 
                        alt={index}
                        draggable={true}
                        data-id={index}
                        onDragStart={this.dragStart}
                        onDragOver={ (e) => e.preventDefault() }
                        onDragEnter={ (e) => e.preventDefault() }
                        onDragLeave={ (e) => e.preventDefault() }
                        onDrop={this.dragDrop}
                        onDragEnd={this.dragEnd}
                />
                ))}
            </div>
        )
    }

}

export default KandyCrush

const repeat = (value, param) =>
{
    let string =""
    for (let i = 0; i < value; i++)
    {
        string+=`${param} `
    }
    return string
}