import styles from "./Navbar.module.css";
import {connect} from "react-redux";
import React from "react";
import {changeNavbarToggled} from "../../../../../service/appStateService";
import useWindowSize from "../helpers/useWindowSize";
import Menu from "./menu/Menu";
import {Link} from 'react-router-dom';
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from '@material-ui/icons/Menu';

function Navbar(props) {
    const {dispatch, loginPageActive} = props;
    let {width} = useWindowSize();
    return (
        <div className={styles.navbar}>
            {
                loginPageActive ? "" :
                    <Link to="/login">
                        <img src={require('../../../../../assets/logo.svg')} className={styles.logo} alt="Logotype"/>
                    </Link>
            }
            <MenuIcon classes={{root: styles.hamburger}}
                      onClick={() => changeNavbarToggled(!props.isToggled, dispatch)}/>
            {(width <= 650) ? (
                <Drawer anchor={"right"}
                        open={props.isToggled}
                        onClose={() => changeNavbarToggled(!props.isToggled, dispatch)}
                        onClick={() => changeNavbarToggled(!props.isToggled, dispatch)}>
                    <Menu/>
                </Drawer>
            ) : loginPageActive ? "" : <Menu/>}
        </div>
    );
}

const mapStateToProps = state => ({
    isToggled: state.controls.navbarToggled,
    loginPageActive: state.controls.loginPageActive
})

export default connect(mapStateToProps)(Navbar);