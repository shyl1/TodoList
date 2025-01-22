import { Link, useLocation } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
import { MdKeyboardArrowRight } from "react-icons/md";
import styles from './breadcrumb.module.css';
import React from "react";


export default function Breadcrumbs() {
  const location =  useLocation();

  //split the pathname into segments to create breadcrumb trail
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map route segments to custom labels
  const breadcrumbNameMap = {
    dashboard: 'Dashboard',
    profile: 'Profile',
    overview: 'Overview',
  };

  return (
      <div className={styles.Overview}>
        <FcTodoList className={styles.iconTodo}/> 
        <MdKeyboardArrowRight className={styles.iconMargin}/>
        {
          pathnames.map((name , index) =>{
            //create a route up to this segment
            const routeTo = `/${pathnames.slice(0,index+1).join('/')}`;

            //check if its the last segemt 
            const isLast  = index === pathnames.length -1;

            //use custom label if avvailable, otherwise use the segment name
            const label = breadcrumbNameMap[name] || name;

            return isLast ? (
              <div key={name} className={styles.textOverview}>
                {/*if its the last index then display it as a plain text */}
                <h3>{label}</h3>
              </div>
            ) : (
              <React.Fragment key={name}>
                <Link to={routeTo} className={styles.breadcrumbLink}>
                  <h3>{label}</h3>
                </Link>
                <MdKeyboardArrowRight className={styles.iconMargin} />
              </React.Fragment>

            )
          })
        }
      </div>
  )
}
