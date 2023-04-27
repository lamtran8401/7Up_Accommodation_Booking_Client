import Rooms from '@/components/rooms';
import { useLoaderData } from 'react-router-dom';

const IndexPage = () => {
    const data = useLoaderData();
    console.log(data);

    return (
        <div>
            <section>
                <Rooms title="Tin đăng mới nhất" data={data} />
            </section>
        </div>
    );
};

export default IndexPage;
