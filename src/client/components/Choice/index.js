import React, {useState} from 'react';
import axios from 'axios';
import Choice2 from '../Choice2'
import "./choice.css";


const Choice = (props) => {
    
    // left = name
    const [left, setLeft] = useState({
        value: props.left,
        className: "choice"
    })

    const [right, setRight] = useState({
        value: props.right,
        className: "choice"
    })

    const renderChoice = (val) => {
        const c = val === "left" ? left : right;
        const image = val === "left" ? props.names.left : props.names.right;
        return (
            <Choice2
                className={c.className}
                onClick={() => handleClick(c.value)}
                value={c.value}
                image={image}
            />
        );
    }
    
    const handleClick = (val) => {

        let winner, loser;
        if (left.value === val) {
            setLeft(prevLeft => ({
                ...prevLeft,
                className: "choice won"
            }));
            setRight(prevRight => ({
                ...prevRight,
                className: "choice lost"
            }));

            winner = left.value;
            loser = right.value;
        }
        else {
            setLeft(prevLeft => ({
                ...prevLeft,
                className: "choice lost"
            }));
            setRight(prevRight => ({
                ...prevRight,
                className: "choice won"
            }));

            winner = right.value;
            loser = left.value;
        }
        axios.post("/api/updScore", {
            winner: winner,
            loser: loser
        })
        .then((result) => {
            console.log(result);
            // console.log(winner);
        })
        .catch((error) => {
            console.error(error);
        });

        props.onSubmit();

    }

    return (
        <div className="choice-panel">
            {renderChoice("left")}
            <p className="choice-text">or</p>
            {renderChoice("right")}
        </div>
    )
}

export default Choice;