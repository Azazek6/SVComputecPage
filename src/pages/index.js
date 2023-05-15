import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Iniciar sesión</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-red-600">Iniciar sesión</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push("/dashboard");
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="document"
              className="block text-sm font-medium text-gray-700"
            >
              Documento
            </label>
            <input
              type="text"
              id="document"
              className="mt-1 bg-white border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 block w-full shadow-sm sm:text-sm rounded-md px-4 py-2"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 bg-white border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500 block w-full shadow-sm sm:text-sm rounded-md px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            href="#"
            className="text-sm text-red-600 hover:text-red-700 transition duration-200"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
