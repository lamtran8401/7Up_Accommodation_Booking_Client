import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

const contentStyle = {
    minHeight: 1000,
};
const Loading = () => {
    return (
        <Layout>
            <Content style={contentStyle}>
                <div id="loading" className="loader-line hide-loader"></div>
            </Content>
        </Layout>
    );
};

export default Loading;
