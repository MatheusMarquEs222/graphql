import { AlertTriangle } from "lucide-react";

export function ErrorAlert ({message}: {message: string}) {
    if (!message) return null;

    return (
        <div className="flex items-start gap-2 p-3 border border-red-400 bg-red-100 text-red-800 rounded-md">
            <AlertTriangle className="w-5 h-5 mt-[2px]">
                <span className="text-sm">{message}</span>
            </AlertTriangle>
        </div>
    );
}