import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import fs from 'fs';
import path from 'path';
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring"

type Props = InferGetStaticPropsType<typeof getStaticProps> 

const SinglePage: NextPage<Props> = (props) => {
    
    return (
        <div>
            <h1>{props.post.title}</h1>
            <p>{props.post.content}</p>
        </div>
    )
};



export const getStaticPaths: GetStaticPaths = () => {
    // reading paths
    const dirPathToRead = path.join(process.cwd(), "posts");
    const dirs = fs.readdirSync(dirPathToRead);
    const paths = dirs.map((filename)=> {
    const filePathToRead = path.join(process.cwd(), "posts/" + filename);
    const fileContent = fs.readFileSync(filePathToRead, {encoding: "utf-8" });

    return { params: { postSlug: matter(fileContent).data.slug } };
    });

    return {
        paths,
        fallback: false, //we will come to this later and understand this with example
    };
};

interface IStaticProps extends ParsedUrlQuery {
    postSlug: string,
}

type Post = {
    post: {
        title: string,
        content: string,
    }
}

export const getStaticProps:GetStaticProps<Post> = (context) => {
    const { params } = context;
    const { postSlug }  = params as IStaticProps ;

    const filePathToRead = path.join(process.cwd(), "posts/" + postSlug + ".md");
    const fileContent = fs.readFileSync(filePathToRead, {encoding: "utf-8" });
    const { content, data } = matter(fileContent);
    
    return {
        props : {
            post: {
                content,
                title: data.title,

            }
        },
    }
}


export default SinglePage;