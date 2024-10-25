import "@styles/globals.css";
import Nav from "@components/Nav";
import SideBar from "@components/sideBar";
``;
import SmallSideBar from "@components/SmallSideBar";
import { AuthProvider } from "../contexts/AuthContext";

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
            <main
                className="flex justify-center flex-row w-full mx-auto"
                style={{
                    height: "100vh",
                    position: "relative",
                }}
            >
                <SideBar></SideBar>
                <div className="flex flex-col w-full">
                    <Nav></Nav>
                    <AuthProvider>
                        <div className="w-full py-3 px-3">{children}</div>
                    </AuthProvider>
                    <SmallSideBar />
                </div>
            </main>
        </body>
    </html>
);

export default RootLayout;
