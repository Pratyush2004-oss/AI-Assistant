import expressAsyncHandler from "express-async-handler";
import geminiResponse from "../config/gemini.js";
import User from "../models/user.model.js";
import moment from "moment";

export const askToAssistant = expressAsyncHandler(async (req, res, next) => {
    try {
        const { question } = req.query;
        const user = req.user;

        const assistantImage = await User.findById(user._id).select("assistant");
        if (!assistantImage) return res.status(400).json({ error: "Assistant not found" });

        // getting response from gemini
        const response = await geminiResponse(question, user.assistant.name, user.name);

        const jsonMatch = response.match(/{[\s\S]*}/)
        if (!jsonMatch) return res.status(400).json({ error: "Invalid response from gemini" });

        const geminiResult = JSON.parse(jsonMatch[0]);

        const type = geminiResult.type;

        // switch cases
        switch (type) {
            case "get_time":
                return res.json({
                    type,
                    userInput: geminiResult.userInput,
                    response: `current time is ${moment().format("HH:mm A")}`
                })
            case "get_date":
                return res.json({
                    type,
                    userInput: geminiResult.userInput,
                    response: `current date is ${moment().format("YYYY-MM-DD")}`
                })
            case "get_day":
                return res.json({
                    type,
                    userInput: geminiResult.userInput,
                    response: `Today is ${moment().format("dddd")}`
                })
            case "get_month":
                return res.json({
                    type,
                    userInput: geminiResult.userInput,
                    response: `current month is ${moment().format("MMMM")}`
                })
            case "google_search":
            case "youtube_search":
            case "youtube_play":
            case "general":
            case "calculator_open":
            case "instagram_open":
            case "facebook_open":
            case "weather-show":
                res.json({
                    type,
                    userInput: geminiResult.userInput,
                    response: geminiResult.response
                })
            default: 
                return res.json({ response: "Sorry, I can't understand....." });

        }

        const userinput = geminiResult.userinput;
        const responseText = geminiResult.response;

        res.status(200).json({ response });

    } catch (error) {
        console.log("Error in askToAssistant controller : ", error);
        next(error);
    }
})