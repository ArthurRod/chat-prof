import { Logo } from "./Logo";
import { Settings } from "./Settings";
import "./styles.scss";

export function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="content">
                    <Logo />

                    <Settings />
                </div>
            </div>
        </header>
    );
}
