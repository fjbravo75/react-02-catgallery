function Header({ paginaActiva, totalFavoritos }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="index.html">CatGallery</a>
        <nav className="main-nav">
          <a className={paginaActiva === "home" ? "is-active" : ""} href="index.html">
            Inicio
          </a>
          <a className={paginaActiva === "favorites" ? "is-active" : ""} href="favoritos.html">
            Favoritos <span>{totalFavoritos}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

