export interface NavigationTabs {
    onClick: string;
    tabName: string;
}

export interface AnnouncementsTab {
    head: string;
    date: string;
    sections: AnnouncementsSection[];
}

export interface AnnouncementsSection {
    name: string;
    list: AnnouncementsItem[];
}

export interface AnnouncementsItem {
    date?: string;
    location?: string;
    name: string;
    text: string;
}

export interface Reading {
    author: string;
    professor: string;
    class: string;
    title: string;
    URL: string;
}

export interface Thesis {
    author: string;
    title: string;
    fileLink: string;
}