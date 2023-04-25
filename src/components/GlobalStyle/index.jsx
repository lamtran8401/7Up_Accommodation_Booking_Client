import { ConfigProvider } from 'antd';

// eslint-disable-next-line react/prop-types
const GlobalStyle = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#5046e5',
                    colorPrimaryHover: '#4338ca',
                    borderRadius: 6,
                    colorError: '#dc2625',
                    colorTextBase: '#374151',
                    controlHeight: 38,
                    fontFamily: "'Arimo', 'Roboto', sans-serif",
                    fontSize: 14,
                },
                components: {
                    Layout: {
                        colorBgHeader: '#fff',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default GlobalStyle;
