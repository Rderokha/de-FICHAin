import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full px-6 py-8 text-sm text-gray-400 bg-transparent mt-auto border-t border-gray-700">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Créditos del equipo */}
        <div className="text-center sm:text-left">
          <p className="text-gray-300 mb-1">
            Desarrollado por{" "}
            <span className="font-semibold text-white">Arantxa G.</span> (Designs) y{" "}
            <span className="font-semibold text-white">Rafael C.</span> (Fullstack Development).
          </p>
          <p className="text-xs text-gray-500">
            Proyecto creado para el hackatón Web3 impulsado por{" "}
            <a
              href="https://www.mantle.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Mantle
            </a>.
          </p>
        </div>

        {/* Branding Mantle */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Powered by</span>
          <a
            href="https://www.mantle.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/mantle-logo.svg" // asegúrate de tener este logo en tu carpeta public/
              alt="Mantle logo"
              width={160}
              height={30}
              className="object-contain"
            />
          </a>
        </div>
      </div>

      {/* Disclaimer legal */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Este sitio es una demo con fines educativos y de experimentación Web3. No representa una casa de apuestas real ni promueve el juego con dinero.
      </div>
    </footer>
  );
};

export default Footer;
