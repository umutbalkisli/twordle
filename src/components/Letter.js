import React, {useContext} from 'react'
import App, { AppContext } from '../App'

//letterPosition ve attemptValue props
function Letter({letterPosition, attemptValue}) {
    const { board } = useContext(AppContext);
    const letter = board[attemptValue][letterPosition];
    return (
        <div className='letter'>{letter}</div>
    )
}

export default Letter