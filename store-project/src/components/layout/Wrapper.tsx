import './Wrapper.scss';

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className="wrapper">{children}</div>
    )
};

export default Wrapper;