// Sample words (you can replace this with a larger list)
const words = [
    { word: "Aloha", translation: "Hello, Hi, Greetings", pronunciation: "ah-loh-ha", usage: "Aloha! How are you today?" },
    { word: "Mahalo", translation: "Thank you", pronunciation: "mah-hah-loh", usage: "Mahalo for your help!" },
    { word: "Ohana", translation: "Family", pronunciation: "oh-hah-nah", usage: "Our ohana gathers for dinner every Sunday." },
    { word: "Aina", translation: "Land", pronunciation: "eye-nah", usage: "Respecting and caring for the aina is a Hawaiian value." },
    { word: "Pau", translation: "Finished, Done", pronunciation: "pow", usage: "I'm pau with my work for today." },
    { word: "Ono", translation: "Delicious", pronunciation: "oh-no", usage: "This plate lunch is so ono!" },
    { word: "Kai", translation: "Sea", pronunciation: "kah-ee", usage: "Let's take a walk along the kai." },
    { word: "Lei", translation: "Garland, Wreath", pronunciation: "lay", usage: "She received a beautiful lei for her graduation." },
    { word: "Hale", translation: "House", pronunciation: "hah-leh", usage: "Our hale is surrounded by tropical flowers." },
    { word: "Lanai", translation: "Balcony, Veranda", pronunciation: "lah-nigh", usage: "We enjoy breakfast on the lanai with an ocean view." },
    { word: "Kapu", translation: "Forbidden", pronunciation: "kah-poo", usage: "Entering the sacred site is kapu." },
    { word: "Makai", translation: "Towards the Sea", pronunciation: "mah-kah-ee", usage: "The best beaches are makai." },
    { word: "Mauka", translation: "Towards the Mountain", pronunciation: "mow-kah", usage: "The hiking trail leads mauka." },
    { word: "Kamaaina", translation: "Local Resident", pronunciation: "kah-mah-eye-nah", usage: "As a kamaaina, I appreciate the local culture." },
    { word: "Honu", translation: "Sea Turtle", pronunciation: "hoh-noo", usage: "We were lucky to spot a honu while snorkeling." },
    { word: "Hula", translation: "Dance", pronunciation: "hoo-lah", usage: "She performed a beautiful hula at the luau." },
    { word: "Wikiwiki", translation: "Quick, Fast", pronunciation: "wee-kee-wee-kee", usage: "Let's finish this wikiwiki!" },
    { word: "Luau", translation: "Feast", pronunciation: "loo-ow", usage: "The luau featured traditional Hawaiian dishes." },
    { word: "Mana", translation: "Power, Spiritual Power", pronunciation: "mah-nah", usage: "The ancient Hawaiians believed in the power of mana." },
    { word: "Kokua", translation: "Help, Assistance", pronunciation: "koh-koo-ah", usage: "Neighbors often kokua each other in times of need." },
    { word: "Lani", translation: "Sky,Heavenly", pronunciation: "lah-nee", usage: "The sunset over the ocean looked truly lani." },
    { word: "Mahina", translation: "Moon", pronunciation: "mah-hee-nah", usage: "The mahina illuminated the night sky." },
    { word: "Nohea", translation: "Beautiful", pronunciation: "noh-heh-ah", usage: "The tropical flowers are nohea." },
    { word: "Pupu", translation: "Appetizer, Snack", pronunciation: "poo-poo", usage: "We enjoyed various pupus at the party." },
    { word: "Wahine", translation: "Woman", pronunciation: "wah-hee-nay", usage: "She is a respected wahine in the community." },
    { word: "Kane", translation: "Man", pronunciation: "kah-nay", usage: "The kane played traditional music at the festival." },
    { word: "Kupuna", translation: "Elder", pronunciation: "koo-poo-nah", usage: "Our kupuna share stories of old Hawaii." },
    { word: "Pali", translation: "Cliff", pronunciation: "pah-lee", usage: "The trail leads along a scenic pali." },
    { word: "Mele", translation: "Song", pronunciation: "may-leh", usage: "The hula dancer performed to the mele." },
    { word: "Puka", translation: "Hole", pronunciation: "poo-kah", usage: "Watch your step near that lava puka." },
    { word: "Kolohe", translation: "Rascal, Mischievous", pronunciation: "koh-loh-heh", usage: "That kolohe kid is always up to something." },
    // Add more words and usages as needed
];

let currentIndex = 0;

// Function to get a new random word
function getNewWord() {
    currentIndex = Math.floor(Math.random() * words.length);
    displayWord();
}

// Function to display the current word
function displayWord() {
    const wordElement = document.getElementById("word");
    const translationElement = document.getElementById("translation");
    const pronunciationElement = document.getElementById("pronunciation");
    const usageElement = document.getElementById("usage"); // Added for sentence usage

    const currentWord = words[currentIndex];

    wordElement.textContent = currentWord.word;
    translationElement.textContent = currentWord.translation;
    pronunciationElement.textContent = `Pronunciation: ${currentWord.pronunciation}`;
    usageElement.textContent = `${currentWord.usage || 'No example sentence available.'}`; // Use provided example or default

}

// Initial display
document.addEventListener("DOMContentLoaded", () => {
    getNewWord();

    const newWordBtn = document.getElementById("newWordButton");
    const container = document.querySelector(".container");

    newWordBtn.addEventListener("click", () => {
        getNewWord();
        newWordBtn.classList.add("clicked");
        container.classList.toggle("clicked");
        container.style.boxShadow = getRandomBoxShadow();
        container.style.backgroundColor = getRandomColor();
        setTimeout(() => {
            newWordBtn.classList.remove("clicked");
            container.classList.remove("clicked");
        }, 500);
    });

    const elementsToHover = [document.getElementById("translation"), document.getElementById("pronunciation"), document.getElementById("usage")];

    elementsToHover.forEach((element) => {
        element.addEventListener("mouseover", () => {
            newWordBtn.classList.add("btn-hovered");
        });

        element.addEventListener("mouseout", () => {
            newWordBtn.classList.remove("btn-hovered");
        });
    });

    container.addEventListener("mouseover", () => {
        container.classList.add("container-hovered");
    });

    container.addEventListener("mouseout", () => {
        container.classList.remove("container-hovered");
    });

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomBoxShadow() {
        return `0 0 20px rgba(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()}, 0.8), 0 0 40px rgba(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()}, 0.6), 0 0 60px rgba(${getRandomValue()}, ${getRandomValue()}, ${getRandomValue()}, 0.4)`;
    }

    function getRandomValue() {
        return Math.floor(Math.random() * 256);
    }
});
