import { Outlet } from 'react-router-dom'
import { useSelector} from 'react-redux'


import MainNav from "./components/MainNav/MainNav.jsx"



export default function App() {
  let loggedInLinks = [
    {url:'/', text: 'Home'},
    {url: '/me', text: 'My Profile'},
    {url: '/watchlist', text: 'My Watchlist'}
  ]
  let loggedOutLinks = [
    {url:'/', text: 'Home'},
    {url: '/signup', text:'Sign up'},
    {url: '/login', text:'Login'},
  ]

  let loggedIn = useSelector(state => state.loggedIn)


  return (
    <>
    <MainNav
        logo = {<i className="bi bi-rocket-takeoff" style={{ fontSize: '5rem' }}></i>}
        // header= {<h1 style={{fontSize:'4rem'}}>myFirst Watchlist</h1>}
        header="myFirst Watchlist"
        Links={ loggedIn ? loggedInLinks : loggedOutLinks }
    />


        <main>
          <Outlet />
        </main>

  </>
  ) 
}
