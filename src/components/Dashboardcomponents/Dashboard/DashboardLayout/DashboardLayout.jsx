import Breadcrumbs from '../../../BreadCrumbs/Breadcrumbs'
import SideBar from "../../SideBar/SideBar";
import styles from './dashboardlayout.module.css';
import { Outlet } from "react-router-dom";


export default function DashboardLayout() {
  return (
    <div className={styles.body}>
      <SideBar />
      <div className={styles.container}>
        <Breadcrumbs/>
        <Outlet />
      </div>
    </div>
  )
}
