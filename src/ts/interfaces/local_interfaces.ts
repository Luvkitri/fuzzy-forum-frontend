export interface EntryThread {
    id: number;
    name: string;
}

export interface AppAlert {
    active: boolean;
    type: "success" | "info" | "warning" | "error" | undefined;
    msg: string;
}