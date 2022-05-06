import React, { useContext, useState } from "react";
import { Buffer } from "buffer";
import { AppContext } from "../App";
import { encodingKey } from "../Words";

function Question() {
    const [wordInput, setWordInput] = useState('');
    const { wordSet } = useContext(AppContext);

    const generateLink = async (e) => {
        e.preventDefault();

        if (!wordInput || wordInput.length != 5) {
            alert('Soracağınız kelime 5 harften oluşmalıdır.');
            return;
        }

        if (wordSet.has(wordInput.toLocaleLowerCase('tr'))) {
            const encodedString = Buffer.from(encodingKey + wordInput).toString('base64');
            const urlToShare = window.location.href + '?q=' + encodedString;

            await navigator.clipboard.writeText(urlToShare);
            
            alert('Oyun linki kopyalandı.\n\n' + urlToShare + '\n\nSorunuzu arkadaşlarınızla paylaşabilirsiniz.');
        }
        else {
            alert("Kelime bulunamadı!");
            return;
        }
    };

    return(
        <>
            <div>
                <label>Arkadaşlarına bir kelime sor</label>
            </div>
            <div>
                <input type="text" maxLength='5' name="wordInput" className="input-text" value={wordInput} onInput={e => setWordInput(e.target.value)} />
            </div>
            <div className="btn" id="button-7" onClick={generateLink}>
                <div id="dub-arrow"><img src={process.env.PUBLIC_URL + '/arrow-48-240.png'} alt="arrow" /></div>
                <a href='#'>Paylaş</a>
            </div>
        </>
    );
}

export default Question;