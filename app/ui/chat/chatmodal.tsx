import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    name: string;
    email: string;
}

const ChatModal: React.FC<ModalProps> = ({ isOpen, onClose, name, email }) => {
    const { data: session } = useSession();
    const [chatID, setChatID] = useState<number>(0);
    const [userEmail, setUserEmail] = useState("");
    const [psychologistEmail, setpsychologistEmail] = useState("");
    const user = session?.user?.email || ""
    const role = session?.user?.Role || ""
    useEffect(() => {
        if (role == "User") {
            setUserEmail(user);
            setpsychologistEmail(email);
        } else {
            setpsychologistEmail(user);
            setUserEmail(email);
        }
    }, [email]);

    useEffect(() => {
        async function fetchChatID() {
            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userEmail: userEmail,
                        psychologistEmail: psychologistEmail,
                    })
                })
                const data = await response.json();
                setChatID(data.chatID);
            } catch (error) {
                console.error("Error fetching chatID:", error);
            }
        }
        if (userEmail.trim() !== "" && psychologistEmail.trim() !== "") {
            fetchChatID();
        }
    }, [userEmail, psychologistEmail]);

    console.log(chatID)
    const messages = useQuery(api.chat.getMessages, { chatID });
    console.log(messages)
    const [message, setMessage] = useState("");
    const sendMessage = useMutation(api.chat.sendMessage);
    const handleSendMessage = async () => {
        if (!message) return;

        try {
            await sendMessage({
                messageID: 3,
                chatID: chatID,
                senderEmail: session?.user?.email || "",
                content: message,
                timestamp: new Date().toISOString(),
            });
            setMessage("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed top-40 right-20 z-10 w-96 max-h-[60vh] bg-[#BFDEFF] shadow-lg border-l border-gray-300 overflow-hidden rounded-lg">
            <div className="p-4 bg-white text-white flex justify-center items-center">
                <h2 className="text-lg font-bold text-center text-black">{name}</h2>
                <button onClick={onClose} className="absolute top-4 right-3 text-xl font-bold text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#2B6EB0" d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" /></svg>
                </button>
            </div>
            <div className="p-4 max-h-[calc(60vh-8rem)] overflow-y-auto">
                {messages?.map((msg) => (
                    <div
                        key={msg._id}
                        className={`mb-4 flex ${msg.senderEmail === session?.user?.email ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`p-2 rounded-lg ${msg.senderEmail === session?.user?.email ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                            <p>{msg.content}</p>
                            <span className="text-xs">{dayjs(msg.timestamp).format("YYYY-MM-DD HH:mm")}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-2 bg-white border-t border-gray-300 flex items-center font-akshar">
                <input
                    type="text"
                    value={message}
                    placeholder="Start typing..."
                    className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="ml-2 text-white px-2 py-2 rounded-lg" onClick={handleSendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="#8E8E93"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" /><path fill="#888888" d="M17.991 6.01L5.399 10.563l4.195 2.428l3.699-3.7a1 1 0 0 1 1.414 1.415l-3.7 3.7l2.43 4.194L17.99 6.01Zm.323-2.244c1.195-.433 2.353.725 1.92 1.92l-5.282 14.605c-.434 1.198-2.07 1.344-2.709.241l-3.217-5.558l-5.558-3.217c-1.103-.639-.957-2.275.241-2.709z" /></g></svg>
                </button>
            </div>
        </div>
    );
};

export default ChatModal;
