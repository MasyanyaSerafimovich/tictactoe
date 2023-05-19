import React from 'react'
import Square from './Square';
import './Board.css'

export const Board = () => {

    const [board, setBoard] = React.useState(Array(9).fill(''));
    const [turn, setTurn] = React.useState('X');
    const [winner, setWinner] = React.useState('')


    //Вызывается при изменении board
    React.useEffect(() => {
        const winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]

        ]
        let winningPositionIndex = 0
        let newWinner = null
        while (winningPositionIndex < winningPositions.length && !newWinner) {
            const boardPositionToCheck = winningPositions[winningPositionIndex]
            const boardValuesToCheck = boardPositionToCheck.map(index => board[index])
            const chekingValue = boardValuesToCheck[0]
            const isFinished = boardValuesToCheck.every((value) => value === chekingValue && chekingValue)
            newWinner = isFinished ? chekingValue : null
            winningPositionIndex++
        }
        if (newWinner) {
            setWinner(newWinner === 'X' ? 'X' : 'O')
        }
    }, [board])

    const handleClick = (index) => {
        if (9 < index < 0 || board[index] || winner) return
        const newBoard = [...board]
        newBoard.splice(index, 1, turn)
        setBoard(newBoard)
        const newTurn = turn === 'X' ? 'O' : 'X'
        setTurn(newTurn)
    };

    const handleRestart = () => {
        setTurn('X')
        setBoard(Array(9).fill(''))
        setWinner('')
    };

    return (
        <div className='container'>
            <h1 className='title'>Крестики-нолики.онлайн</h1>
            {winner && <h2 className='winner'>Победитель: {winner}</h2>}
            <div className='board'>
                {
                    board.map( (elem, index) => (
                        <Square key={index} value={elem} index={index} handleClick={handleClick}/>
                    ))
                }
            </div>
            <button className='repeater' onClick={handleRestart}>Начать заново</button>
        </div>
    )
}

export default Board