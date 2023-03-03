import Link from 'next/link';
import { FC } from 'react';

interface Props {
    title:String,
    desc:String,
    slug:String,
}

const BlogCard: FC<Props> = ({ title ,  desc, slug }): JSX.Element => {
    return (
        <div>
            <Link href={'/blogs/' + slug}>
                <Link href = {'/blogs/' + slug} legacyBehavior className='block'>
                    <div className='bg-green-100 p-2 rounded'>
                        <h1 className='text-gray-900 text-3xl font-semibold cursor-pointer'>
                            {title}
                        </h1>
                        <p className='text-gray-500'>
                            {desc}
                        </p>
                    </div>
                </Link>
            </Link>
        </div>
            
    )
};

export default BlogCard;