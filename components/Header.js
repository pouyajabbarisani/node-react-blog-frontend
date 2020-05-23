import { useState } from 'react'
import Link from 'next/link'
import Menu from './Menu'

const Header = () => {
  const [isResponsiveMenuOpen, setIsResponsiveMenuOpen] = useState(false)

  return (
    <header>
      <div className="maxwidth">
        <nav>
          <Link href="/">
            <a className="header-logo-link">Node React Blog</a>
          </Link>
          <span className="responisve-trigger-button" onClick={() => setIsResponsiveMenuOpen(!isResponsiveMenuOpen)}>☰</span>
          <Menu responsiveMenuStatus={isResponsiveMenuOpen} />
        </nav>
      </div>
      <style jsx>{`
      header {
        margin-bottom: 25px;
        padding: 0.5rem 1rem;
        box-shadow: 0 -0.5rem 1.7rem -0.5rem rgba(0,0,0,0.3);
        position: relative;
      }
      header .responisve-trigger-button{
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        align-content: center;
        color: #02e;   
        margin: 0.5rem;  
        display: none;       
      }
      @media screen and (max-width: 768px){
        header .responisve-trigger-button{
          display: flex;
        }
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
}


export default Header
