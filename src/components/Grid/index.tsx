import { useRef, useState } from "react"
import { duplicateRegenerateSortArray } from "../../utils/card-utils"
import { Card, ICardProps } from "../Card"
import "./styles.css"

export interface IGridProps {
    cards: ICardProps[]
}

export const Grid = ({cards}: IGridProps) => {
    const [stateCards, setStateCards] = useState(() => {
        return duplicateRegenerateSortArray(cards)
    })
    const first = useRef<null | ICardProps>(null)
    const second = useRef<null | ICardProps>(null)
    const unflip = useRef(false)
    const [matches, setMatches] = useState(0)
    const [moves, setMoves] = useState(0)

    const handleReset = () => {
        first.current = null
        second.current = null
        unflip.current = false
        setStateCards(duplicateRegenerateSortArray(cards))
        setMatches(0)
        setMoves(0)
    }

    const handleClick = (id: string) => {
        const newStateCards = stateCards.map(card => {
            if(card.id !== id) return card
            if(card.flipped) return card

            if(unflip.current && first.current && second.current) {
                first.current.flipped = false
                second.current.flipped = false
                first.current = null
                second.current = null
                unflip.current = false
            }

            card.flipped = true

            if(first.current === null){
                first.current = card
            } else if (second.current === null){
                second.current = card
            }

            if(first.current && second.current){
                if(first.current.back === second.current.back){
                    first.current = null
                    second.current = null
                    setMatches(matches => matches + 1)
                } else {
                    unflip.current = true
                }
                setMoves(move => move + 1)
            }

            return card
        })

        setStateCards(newStateCards)
    }

    return <div>
        <div className="text">
            <h1>Memory Game</h1>
            <p>Moves: {moves} | Matchs: {matches} | <button onClick={handleReset}>reset</button></p>
        </div>
        <div className="grid">
            {stateCards.map((card) => {
                return <Card {...card} key={card.id} handleClick={handleClick} />
            })}
        </div>
    </div>
}