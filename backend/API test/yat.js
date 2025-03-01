import { generateQuiz } from "./gem.js";

const getQuiz = async () => {
    try {
        const ans = await generateQuiz("quesion", "code", "language");
        console.log(ans);
    } catch (error) {
        console.error(error);
    }
}

getQuiz();