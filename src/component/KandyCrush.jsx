import React from "react";
import Candy from "./Candy";

class KandyCrush extends React.Component
{
    constructor()
    {
        super()
        this.state = {
            width: 10,
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

    checkForColumnOfThree = () =>
    {
        for (let i = 0; i < (this.state.currentColorArrangement.length - (this.state.width*2)); i++)
        {
            const columnOfThree = [i, i + this.state.width, i + this.state.width * 2]
            const decidedColor = this.state.currentColorArrangement[i]

            if ( columnOfThree.every(candy =>this.state.currentColorArrangement[candy] === decidedColor))
            {
                console.log(`column of three detected @${i}`);
                const newColorArrangement = this.state.currentColorArrangement.map((color, index) => {
                    if (index === columnOfThree[0] || index === columnOfThree[1] || index === columnOfThree[2])
                    {
                        return `blank${index}`
                    }
                    return color
                })
                this.setState({ currentColorArrangement: newColorArrangement })
            }
        }
    }

    checkForColumnOfFour = () =>
    {
        for (let i = 0; i < (this.state.currentColorArrangement.length - (this.state.width*3)); i++)
        {
            const columnOfFour = [i, i + this.state.width, i + this.state.width * 2, i + this.state.width * 3]
            const decidedColor = this.state.currentColorArrangement[i]

            if ( columnOfFour.every(candy =>this.state.currentColorArrangement[candy] === decidedColor))
            {
                console.log(`column of four detected @${i}`);
                const newColorArrangement = this.state.currentColorArrangement.map((color, index) => {
                    if (index === columnOfFour[0] || index === columnOfFour[1] || index === columnOfFour[2] || index === columnOfFour[3])
                    {
                        return `blank${index}`
                    }
                    return color
                })
                this.setState({ currentColorArrangement: newColorArrangement })
            }
        }
    }

    checkForRowOfThree = () =>
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
                    const decidedColor = this.state.currentColorArrangement[i]
                    if (rowOfThree.every(candy => this.state.currentColorArrangement[candy] === decidedColor))
                    {
                        console.log(`row of three detected @${i}`);
                        const newColorArrangement = this.state.currentColorArrangement.map((color, index) => {
                            if (index === rowOfThree[0] || index === rowOfThree[1] || index === rowOfThree[2])
                            {
                                return `blank${index}`
                            }
                            return color
                        })
                        this.setState({ currentColorArrangement: newColorArrangement })
                    }
                    break forJ
                }
            }
            
        }
    }

    checkForRowOfFour = () =>
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
                    const decidedColor = this.state.currentColorArrangement[i]
                    if (rowOfFour.every(candy => this.state.currentColorArrangement[candy] === decidedColor))
                    {
                        console.log(`row of four detected @${i}`);
                        const newColorArrangement = this.state.currentColorArrangement.map((color, index) => {
                            if (index === rowOfFour[0] || index === rowOfFour[1] || index === rowOfFour[2] || index === rowOfFour[4])
                            {
                                return `blank${index}`
                            }
                            return color
                        })
                        this.setState({ currentColorArrangement: newColorArrangement })
                    }
                    break forJ
                }
            }
            
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
                this.checkForColumnOfFour()
                this.checkForColumnOfThree()
                this.checkForRowOfFour()
                this.checkForRowOfThree()
            }, 1000)
            console.log('currentColorArrangement has changed');
            return () => clearInterval(timer)
        }
    }


    render = () =>
    {
        return (
            <div className="game" style={{ gridTemplateColumns: repeat(this.state.width, '1fr') }}>
                {this.state.currentColorArrangement.map((candyColor, index) => (
                    <Candy 
                        color={candyColor}
                        index={index}
                        width={this.state.width}
                    />
                ))}
            </div>
        )
    }

}

export default KandyCrush

const repeat = (value, param) =>
{
    let string = ""
    for (let i = 0; i < value; i++)
    {
        string+=`${param} `
    }
    return string
}