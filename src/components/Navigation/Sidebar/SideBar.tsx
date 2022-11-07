import { cva, type VariantProps } from "class-variance-authority";

const sidebarStyles = cva('neumorphic-sidebar');

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarStyles> { }

const Sidebar = ({ className, ...props }: SidebarProps) => {
    return (
        <aside className={sidebarStyles({ class: className })} {...props}>
            {props.children}
        </aside>
    )
}

export default Sidebar