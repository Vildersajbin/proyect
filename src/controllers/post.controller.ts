import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { Post } from '../interface/Post'

export async function getPosts(req: Request, res: Response): Promise<Response | void>{
    //try {
        const conn = await connect();
        const posts = await conn.query('SELECT * FROM alertante');
        res.json(posts[0]);
    //}
    //catch (e) {
    //    console.log(e)
    //}
}

export async function createPost(req: Request, res: Response) {
    const newPost: Post = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO alertante SET ?', [newPost]);
    return res.json({
        message: 'New Post Created'
    });
}

export async function getPost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    const posts = await conn.query('SELECT * FROM alertante WHERE id = ?', [id]);
    return res.json(posts[0]);
}

export async function deletePost(req: Request, res: Response) {
    const id = req.params.postId;
    const conn = await connect();
    await conn.query('DELETE FROM alertante WHERE id = ?', [id]);
    res.json({
        message: 'Post deleted'
    });
}

export async function updatePost(req: Request, res: Response) {
    const id = req.params.postId;
    const updatePost: Post = req.body;
    const conn = await connect();
    await conn.query('UPDATE alertante set ? WHERE id = ?', [updatePost, id]);
    return res.json({
        message: 'Post Updated'
    });
}