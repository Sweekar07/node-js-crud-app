export function generateCodename() {
    const adjectives = ['The', 'Mysterious', 'Silent', 'Fierce', 'Swift'];
    const nouns = ['Nightingale', 'Kraken', 'Phoenix', 'Shadow', 'Whisper'];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
}

export function generateSuccessProbability() {
    return Math.floor(Math.random() * 100) + 1;
}
