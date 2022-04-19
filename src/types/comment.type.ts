export default interface Comment {
    '#'?: string;
    ownerName: string;
    ownerId: string;
    post_id: string;
    id: string;
    description: string;
    likes: number;
    date: string;
    isLike: string;
}