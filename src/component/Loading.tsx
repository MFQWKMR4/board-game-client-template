import { FC, memo } from "react";

export const LoadingSpinner: FC = memo(() => {
    return (
        <div className="flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-pattarn1-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
});

