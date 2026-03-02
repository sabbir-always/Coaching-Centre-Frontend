import HeaderComponent from '../components/layouts/HeaderComponent'
import SidebarComponents from '../components/layouts/SidebarComponents'

const WebLayout = ({ children }) => {
    return (
        <>
            <header>
                <HeaderComponent />
            </header>

            <main className='main_layout'>
                {children}
            </main>

            <section>
                <SidebarComponents />
            </section>
        </>
    )
}

export default WebLayout