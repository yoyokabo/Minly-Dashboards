export interface Post {
    owner: string ,
    _id: string,
    caption: string,
    likes?: number,
    filepath: string,
    createdAt: string,
    username: string,
    mediatype: string
}