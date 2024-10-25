import "@styles/globals.css";
import Nav from "@components/Nav";
import SideBar from "@components/sideBar";

export const metadata = {
    title: "Initiativ",
    description: "Initiativ",
};

const RootLayout = ({ children }) => (
    <html lang="en">
        <body
            style={{
                backgroundColor: "#292E30",
            }}
        >
                {/* <Provider> */}
                <main
                    className="flex justify-center flex-row w-full mx-auto"
                    style={{
                        height: "100vh",
                    }}
                >
                    <SideBar></SideBar>
                    <div className="flex flex-col w-full">
                        <Nav></Nav>
                        <div className="w-full py-3 px-3">{children}</div>
                    </div>
                </main>
                {/* </Provider> */}
        </body>
    </html>
);

export default RootLayout;
