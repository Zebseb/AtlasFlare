﻿import React, { useEffect, useState } from 'react';
import '../styles/QuizCard.css';

function QuizCard({ flags, continent }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [random1, setRandom1] = useState(0);
    const [random2, setRandom2] = useState(0);
    const [random3, setRandom3] = useState(0);
    const currentFlag = flags[currentIndex];
    const altFlag1 = flags[random1];
    const altFlag2 = flags[random2];
    const altFlag3 = flags[random3];
    const currentContinent = continent.toUpperCase();
    const [isAltFlags, setIsAltFlags] = useState(false);
    const [altArray, setAltArray] = useState();
    const [allFlagsSet, setAllFlagsSet] = useState(false);
    const [flagOne, setFlagOne] = useState();
    const [flagTwo, setFlagTwo] = useState();
    const [flagThree, setFlagThree] = useState();
    const [flagFour, setFlagFour] = useState();

    useEffect(() => {
        setRandom1(getRandom(flags.length - 1));
        setRandom2(getRandom(flags.length - 1));
        setRandom3(getRandom(flags.length - 1));
    }, [flags, currentIndex])

    useEffect(() => {
        if (altFlag1 && altFlag2 && altFlag3 && currentFlag) {
            setIsAltFlags(true);
            setAltArray([altFlag1.countryName, altFlag2.countryName, altFlag3.countryName, currentFlag.countryName]);
        }
    }, [altFlag1, altFlag2, altFlag3, currentFlag])

    useEffect(() => {
        if (isAltFlags) {
            getAlts();
        }
        console.log(altArray);
    })

    function randomNumber(mn, mx) {
        return Math.random() * (mx - mn) + mn;
    }

    function getRandomFlag() {
/*        let altArray = [altFlag1.countryName, altFlag2.countryName, altFlag3.countryName, currentFlag.countryName];*/
/*        const flagIndex = (Math.floor(randomNumber(0, 4)));*/
        /*        const flagName = altArray[flagIndex];*/
        //const flagName = altArray[Math.floor(Math.random() * altArray.length)];

        //return flagName;
    }

    function getAlts() {
        let updatedArray;
        //Kan fixa getAltOne, getAltTwo osv och uppdatera arrayen efter varje hämtning samt "setAltOneSet" = true osv.
        //Kan displaya olika beroende på altOneSet, altTwoSet osv.
        const flagOne = altArray[Math.floor(Math.random() * altArray.length)];
        updatedArray = altArray.filter(f => f !== flagOne);

        const flagTwo = updatedArray[Math.floor(Math.random() * updatedArray.length)];
        updatedArray = updatedArray.filter(f => f !== flagTwo);

        const flagThree = updatedArray[Math.floor(Math.random() * updatedArray.length)];
        updatedArray = updatedArray.filter(f => f !== flagThree);

        const flagFour = updatedArray[Math.floor(Math.random() * updatedArray.length)];

        setFlagOne(flagOne);
        setFlagTwo(flagTwo);
        setFlagThree(flagThree);
        setFlagFour(flagFour);
        setAllFlagsSet(true);
    }

    function getRandom(max) {
        //Fixa så att man inte får samma siffra två gånger
        return Math.floor(Math.random() * max);
    }

    function handleNextClick() {
        // lägg till kontroll av svar
        if (currentIndex < flags.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }

    function handlePrevClick() {
        // kanske inte ska vara med?
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    if (!currentFlag || !altFlag1 || !altFlag2 || !altFlag3) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="quiz-content">
                <div className="info-card">
                    <p id="continet-name">{currentContinent}</p>
                    <p id="progress">{currentIndex + 1} / {flags.length}</p>
                </div>
                <div className="quiz-card">
                    <div className="country-container">
                        <div className="flag-container">
                            <img className="quiz-flag" src={currentFlag.imageUrl} alt={currentFlag.countryName} />
                        </div>
                        <div className="btn-container">
                            <button id="btn-prev" onClick={handlePrevClick} disabled={currentIndex === 0}>
                                PREVIOUS
                            </button>
                            <button id="btn-next" onClick={handleNextClick} disabled={currentIndex === flags.length - 1}>
                                NEXT
                            </button>
                        </div>
                    </div>
                    {allFlagsSet ?
                        (<div className="answer-container">
                            <button className="btn-answer">{flagOne}</button>
                            <button className="btn-answer">{flagTwo}</button>
                            <button className="btn-answer">{flagThree}</button>
                            <button className="btn-answer">{flagFour}</button>
                        </div>) :

                        (<div className="answer-container">
                        <button className="btn-answer">""</button>
                        <button className="btn-answer">""</button>
                        <button className="btn-answer">""</button>
                        <button className="btn-answer">""</button>
                    </div>)}

                </div>
            </div>
        </div>
    )
}

export default QuizCard;