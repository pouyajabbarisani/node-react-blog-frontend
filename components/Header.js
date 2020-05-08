import Link from 'next/link'
import Menu from './Menu'

const Header = () => (
  <header>
    <div className="maxwidth">
      <nav>
        <Link href="/">
          <a className="header-logo-link">Node React Blog</a>
        </Link>
        <Menu />
      </nav>
    </div>
    <style jsx>{`
      header {
        margin-bottom: 25px;
        padding: 0.5rem 1rem;
        box-shadow: 0 -0.5rem 1.7rem -0.5rem rgba(0,0,0,0.3);
      }
      header nav {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
      }
      .header-logo-link{
        font-size: 1.5rem;
        color: #02e;
        font-weight: bolder;
      }
    `}</style>
  </header>
)

export default Header
