import { NavBarProps } from "@/lib/types"
import { DarkModeToggler } from "./dark-mode-toggler"

export const Navbar = ({children}:NavBarProps) => {
    return (
        <div className="dark:bg-black">
            <DarkModeToggler />
        </div>
    )
}