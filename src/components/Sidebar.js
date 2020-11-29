
import { NavLink } from 'react-router-dom';
 
function Sidebar(){
  return (
    <div className="sidebar col-md-2">
        <h2 align="center" className="sidebar-title">Weather Dashboard</h2>
        <div className="d-flex flex-column mt-5">
          <NavLink exact to="/" className="navBtn"><i class="fas fa-th-large mr-3"></i>Dashboard</NavLink>
          <NavLink exact to="/settings" className="navBtn mt-1"><i class="fas fa-sliders-h mr-3"></i>Settings</NavLink> 
        </div>
    </div>
  );
};
 
export default Sidebar;