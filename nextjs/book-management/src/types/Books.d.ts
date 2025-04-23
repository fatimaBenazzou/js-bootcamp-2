declare interface BaseBookI {
    title: string;
    author: string;
    publishedDate: Date;
    genre: string;
    description: string;
}

declare interface BookI<ID = string> extends BaseBookI {
    _id: ID;
    createdAt: Date;
    opdatedAt: Date;
}
