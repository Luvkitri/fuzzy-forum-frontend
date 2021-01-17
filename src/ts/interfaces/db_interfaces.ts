import { EntryThread } from './local_interfaces'

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
    Thread: EntryThread;
    SubThreadsInEntry: SubThread[];
    User: {
        first_name: string;
        last_name: string;
    };
}

export interface WholeEntry {
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
    Thread: EntryThread;
    SubThreadsInEntry: SubThread[];
    User: {
        first_name: string;
        last_name: string;
    };
    Answers: Answer[];
}

export interface Tag {
    id: number;
    name: string;
}

export interface Thread {
    id: number;
    name: string;
    SubThreads: SubThread[];
}

export interface SubThread {
    id: number;
    name: string;
    thread_id: number;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    login: string;
    password: string;
    updated_at: string;
    created_at: string;
}

export interface Answer {
    id: number;
    content: string;
    score: number;
    posted_at: string;
    edited_at: string;
    user_id: number;
    entry_id: number;
    User: {
        first_name: string;
        last_name: string;
    }
}
