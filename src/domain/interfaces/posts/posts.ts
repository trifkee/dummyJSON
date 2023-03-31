export interface SinglePost{
    id:number,
    title:string,
    body:string,
    userId:number,
    tags:string[],
    reactions:number,
}

export interface CreatePostRequest{
    key?:string,
    url:string,
    body: {
        title:string,
        body:string,
        userId:number,
        }
    }

export interface Comment{
    id:number,
    body:string,
    postId:number,
    user: [id:number, username:string],
}

export interface AddCommentOnPost {
    postId?:string,
    userId?:string,
    key?:string,
    url:string,
    body: {
        body:string,
        postId:string,
        userId:string
    }
}

export interface PostComment {
    id:number,
    body:string,
    user:{
        username: string,
    }
}