import React, { useState, useEffect, useContext, useCallback } from 'react';
import classNames from 'classnames';
import { Route, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import { Dashboard } from './components/Dashboard';
import { ButtonDemo } from './components/ButtonDemo';
import { ChartDemo } from './components/ChartDemo';
import { Documentation } from './components/Documentation';
import { FileDemo } from './components/FileDemo';
import { FloatLabelDemo } from './components/FloatLabelDemo';
import { FormLayoutDemo } from './components/FormLayoutDemo';
import { InputDemo } from './components/InputDemo';
import { ListDemo } from './components/ListDemo';
import { MenuDemo } from './components/MenuDemo';
import { MessagesDemo } from './components/MessagesDemo';
import { MiscDemo } from './components/MiscDemo';
import { OverlayDemo } from './components/OverlayDemo';
import { PanelDemo } from './components/PanelDemo';
import { TableDemo } from './components/TableDemo';
import { TreeDemo } from './components/TreeDemo';
import { InvalidStateDemo } from './components/InvalidStateDemo';

import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';
import { TimelineDemo } from './pages/TimelineDemo';

import PrimeReact from 'primereact/api';

import { Context } from './store' 
import Login from './components/Login'
import { menu, getMenuBasedInRole } from './Menu' 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';
import RequestStatus from './utils/RequestStatus';
//import { useDirectus } from './DirectusProvider'
import { useDirectusRequest } from './hooks/useDirectusRequest';
//import { Directus } from '@directus/sdk';
import { asyncDirectus } from './utils/asyncDirectus';


const Home = (props) => {
    const [state, dispatch] = useContext(Context)
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

    //const { directus } = useDirectus();
    const [response, error, status] = useDirectusRequest(useCallback(async directus => {
        return await directus.users.me.read({
            fields: ['*', 'role.id', 'role.name', 'store.id'],
        });   

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.location.pathname]));
    //const [status, setStatus] = useState(RequestStatus.Pending)
    const [stores, setStores] = useState([])


    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;
    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if(mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',        // const response = await directus.auth.login({
            //     email: 'tato@gmail.com',
            //     password: 'tato',
            // });
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });
    // const checkUserAuth = useCallback(async() => {
    //         try{
    //             //alert(1)
    //             console.log('checkUserAuth')
    //             setStatus(RequestStatus.Pending)
    //             const userInfo = await directus.users.me.read({
    //                  fields: ['*', 'role.id', 'role.name', 'store.id'],
    //             });      
                
    //             dispatch({type: 'SET_USER_LOGGED', user:{...userInfo}})              
    //             setStatus(RequestStatus.Success)
    //             //return userInfo
    //         }
    //         catch(error){
    //             // TODO: check error code
    //             props.history.push('/login')
    //         }
    //     },[directus.users.me, dispatch, props.history])
    // useEffect(() => {
    //     checkUserAuth()
    // }, [checkUserAuth, props.location.pathname])

    useEffect(() => {
        const getStores = async()=>{
            //const stores = await directus.items('store').readMany();
            const [stores, storesError] = await asyncDirectus(async(directus)=>{
                return await directus.items('store').readMany(); 
            })
            if (storesError){
                console.dir(storesError)
                // TODO: storesError.errors[0].extension.code
                // FORBIDDEN: Mo authorizado
                //console.log(storesError.errors[0].extensions.code)
            } else{
                setStores(stores.data.map(store=>({
                    label: state.user?.store.id === store.id? 'Mi Tienda': store.name,
                    to: `/store/${store.id}`
                    //to: '/button'
                })))  
            }
            
        }
         if (status === RequestStatus.Success){
            dispatch({type: 'SET_USER_LOGGED', user:{...response}}) 
            getStores()
         }                 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])
    console.log('Home')
    console.log(props.location.pathname)
    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                       mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>            
            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={getMenuBasedInRole({currentRole: state.user?.role.name, stores})} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/categories" exact component={FormLayoutDemo}/>
                    <Route path="/products" component={InputDemo}/>
                    <Route path="/brands" component={FormLayoutDemo}/>
                    <Route path="/input" component={InputDemo}/>
                    <Route path="/floatlabel" component={FloatLabelDemo}/>
                    <Route path="/invalidstate" component={InvalidStateDemo}/>
                    <Route path="/button" component={ButtonDemo}/>
                    <Route path="/table" component={TableDemo}/>
                    <Route path="/list" component={ListDemo}/>
                    <Route path="/tree" component={TreeDemo}/>
                    <Route path="/panel" component={PanelDemo}/>
                    <Route path="/overlay" component={OverlayDemo}/>
                    <Route path="/menu" component={MenuDemo}/>
                    <Route path="/messages" component={MessagesDemo}/>
                    <Route path="/file" component={FileDemo}/>
                    <Route path="/chart" component={ChartDemo}/>
                    <Route path="/misc" component={MiscDemo}/>
                    <Route path="/timeline" component={TimelineDemo}/>
                    <Route path="/crud" component={Crud}/>
                    <Route path="/empty" component={EmptyPage}/>
                    <Route path="/documentation" component={Documentation}/>
                </div>

                <AppFooter layoutColorMode={layoutColorMode}/>
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                       layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

        </div>
    );

}
const sleep = async(delay)=> new Promise((resolve)=>{ setTimeout(resolve, delay)})

const App = ()=>{   
    console.log('App')
    return (
        <Switch> 
            <Route exact path='/login' component={Login} />
            <Route exact path={'*'}  component={Home} />            
        </Switch>
    )
}
export default App;
