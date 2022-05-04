import React, { useState } from "react";
import { Buffer } from "buffer";

function Question() {
    const [wordInput, setWordInput] = useState('');

    const generateLink = () => {
        const encodedString = Buffer.from(wordInput).toString('base64');
        const urlToShare = window.location.href + '?q=' + encodedString;

        navigator.clipboard.writeText(urlToShare);
        alert('Link copied to clipboard. You can share with your friends!');
    };

    return(
        <div>
            <label>
                Ask a word to your friend:
                <input type="text" name="wordInput" value={wordInput} onInput={e => setWordInput(e.target.value)} />
            </label>
            <button onClick={generateLink}>Share link</button>
        </div>
    );
}

export default Question;