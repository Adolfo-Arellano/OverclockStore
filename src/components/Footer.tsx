const Footer = () => {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-neutral-600">
        <p className="mb-2">© {new Date().getFullYear()} Overclock Store</p>

        <p className="mb-2">
          Envíos a todo el país · Pagos con tarjeta · Garantía oficial
        </p>

        <p className="font-medium text-neutral-800 mt-4">
          Hecho por{" "}
          <span className="font-bold text-violet-900 hover:text-violet-900/70 transition-colors">
            Sigmus
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
