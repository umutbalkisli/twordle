import dictionary from './dictionary.json';

export const boardDefault = [["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""],
                             ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]]

export const generateWordSet = async () => {
    const todaysWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    const wordSet = new Set(dictionary);

    return { wordSet, todaysWord };
}