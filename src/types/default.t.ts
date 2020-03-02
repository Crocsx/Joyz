export interface Category {
    id: number;
    name: string;
    description: string;
}

export enum AlertType {
    SUCCESS = "success",
    INFO = "info",
    WARNING = "warning",
    ERROR = "error",
}

export interface AntdAlert {
    type: AlertType;
    message: string;
    display: boolean;
}