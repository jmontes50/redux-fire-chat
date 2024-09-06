import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDocument, listenCollection } from "../app/db/dbSlice";

export default function ChatView() {

  const refTextArea = useRef();

  const { user } = useSelector((state) => state.auth);
  const { documents } = useSelector((state) => state.data);

  const isMe = (messageUID) => {
    return messageUID === user.uid;
  };

  const messages = null;

  const dispatch = useDispatch();

  const handleSendMessage = (e) => {
    //prevenimos el evento por defecto del formulario
    e.preventDefault();
    //verificamos que el mensaje no esta en blanco
    // if (newMessage.trim() !== "") {
      dispatch(addDocument({
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        message: refTextArea.current.value,
        timestamp: Date.now()
      }))
    // }
  };

  useEffect(() => {
    dispatch(listenCollection());
  }, [])

  return (
    <main className="px-4 mx-auto lg:px-8 xl:max-w-7xl">
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {documents
            ? documents.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${isMe(message.uid) ? "ms-auto justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-xs ${
                      isMe(message.uid) ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                        isMe(message.uid) ? "bg-blue-500" : "bg-green-500"
                      }`}
                    >
                      {/* {message.sender[0].toUpperCase()} */}
                      <img src={message.photo} alt={message.name} />
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        isMe()
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <p className="text-sm font-semibold">{message.name}</p>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                  
                </div>
              ))
            : null}
        </div>
        <form onSubmit={handleSendMessage} className="p-4 bg-white">
          <div className="flex space-x-2">
            <textarea
              // value={newMessage}
              // onChange={(e) => setNewMessage(e.target.value)}
              ref={refTextArea}
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <i className="fa-solid fa-paper-plane fa-2x"></i>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
