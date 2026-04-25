
import Layout from "./components/Layout"

import Test from "./components/Test"
import {HashRouter as Router,Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Inventory from "./pages/Inventory"
import Users from "./pages/Users"
import Settings from "./pages/Settings"
import Shops from "./pages/Shops"
import Reports from "./pages/Reports"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ProtectedRoutes from "./ProtectedRotes"
import Logout from "./pages/Logout"


function App() {
  

  return (
    <>
    <Router>
      
      <Routes>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/register" element={<Signup/>}/>
        <Route element={<ProtectedRoutes><Layout/></ProtectedRoutes>}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/inventory" element={<Inventory/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/shops" element={<Shops/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Route>
      </Routes>
    </Router>

    </>
  )
}

export default App
