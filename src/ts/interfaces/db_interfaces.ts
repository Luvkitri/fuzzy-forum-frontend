export interface Entry {
    id: number;
    title: string;
    content: string;
    score: number;
    views: number;
    answers: number;
    active: boolean;
    user_id: number;
    posted_at: string;
    edited_at: string;
    TagsInEntries: Tag[];
    Thread: {
        id: number;
        name: string;
    },
    SubThreadsInEntry: SubThread[];
    User: {
        first_name: string,
        last_name: string
    }
}

export interface Tag {
    id: number,
    name: string
}

export interface Thread {
    id: number,
    name: string,
    SubThreads: SubThread[]
}

export interface SubThread {
    id: number,
    name: string,
    thread_id: number
}