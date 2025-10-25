import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendQuery = async () => {
        if (!query.trim()) return;  // Prevent empty queries

        setLoading(true);  // Show loading state

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/ask/`, {
                query: query,
                user_id: "12345",
            });

            // Update chat history - add new message at the beginning
            setChatHistory([{ query, response: res.data.response }, ...chatHistory]);
            setQuery("");  // Clear input field
        } catch (error) {
            console.error("API Request Failed:", error);
        } finally {
            setLoading(false);  // Remove loading state
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-900">
         
            
            <div className="flex mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me anything..."
                    className="p-2 flex-grow rounded-l-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                    onClick={sendQuery}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Send"}
                </button>
            </div>

            <div className="p-4 rounded-lg h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                {chatHistory.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">Ask me anything about our services.</p>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div key={index} className="mb-3">
                            <p className="font-bold text-gray-900 dark:text-white">You:</p>
                            <p className="text-gray-700 dark:text-gray-300">{chat.query}</p>
                            <p className="font-bold mt-1 text-gray-900 dark:text-white">AI:</p>
                            <p className="text-blue-600 dark:text-blue-400">{chat.response}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
