import { classNames } from "utils/class-names"

export const Card = ({ children, className }) => (
    <div
        className={classNames(
            "border border-gray-200 shadow rounded-lg px-4 py-4 px-6 bg-white",
            className
        )}
    >
        {children}
    </div>)