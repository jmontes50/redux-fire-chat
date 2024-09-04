export default function Component() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Iniciar sesión en el Chat
        </h1>
        <button
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {}}
        >
          <i className="fa-brands fa-google me-3"></i>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}
