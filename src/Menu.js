import Roles from './utils/Roles'
export const menu = [
    {
        label: 'Inventario',
        items: [
            { label: 'Dashboard', icon: '', to: '/' },            
        ],
        roles: [Roles.Admin, Roles.Vendor]
    },
    {
        label: '',
        items: [
            { label: 'Categorias', icon: '', to: '/categories'},
            { label: 'Marcas', icon: '', to: '/brands'},
            { label: 'Products', icon: '', to: '/products'}
        ],
        roles: [Roles.Admin]
    },
    {
        label: 'Tiendas',
        items: [], // dinamically load
        roles: [Roles.Admin, Roles.Vendor]
    },
    {
        label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
        items: [
            {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout'},
            {label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input'},
            {label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel"},
            {label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate"},
            {label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button'},
            {label: 'Table', icon: 'pi pi-fw pi-table', to: '/table'},
            {label: 'List', icon: 'pi pi-fw pi-list', to: '/list'},
            {label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree'},
            {label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel'},
            {label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay'},
            {label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu'},
            {label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages'},
            {label: 'File', icon: 'pi pi-fw pi-file', to: '/file'},
            {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart'},
            {label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc'},
        ]
    },
    {
        label: 'Pages', icon: 'pi pi-fw pi-clone',
        items: [
            {label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud'},
            {label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline'},
            {label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty'}
        ]
    },
    {
        label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
        items: [
            {
                label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                        ]
                    },
                    {
                        label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark'}
                        ]
                    },
                ]
            },
            {
                label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark'},
                        ]
                    },
                    {
                        label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                            {label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark'}
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => {window.location = "#/documentation"}},
            {label: 'View Source', icon: 'pi pi-fw pi-search', command: () => {window.location = "https://github.com/primefaces/sakai-react"}}
        ]
    }
];
export function getMenuBasedInRole({currentRole, stores}){
    debugger
    const myMenu = menu.filter(item=>!item.roles || (item.roles && item.roles.includes(currentRole)))
    const myStores = myMenu.find(item=>item.label === 'Tiendas')
    if (myStores){
        myStores.items = stores.map(store=>( { label: store.label, icon: '', to: store.to}))
    }
    return myMenu
}