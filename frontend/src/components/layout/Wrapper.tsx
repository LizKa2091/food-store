import './Wrapper.scss';

interface WrapperProps {
    children: React.ReactNode;
    modalState: boolean;
}

const Wrapper: React.FC<WrapperProps> = ({ children, modalState }) => {
    return (
        <div className={"wrapper" + (modalState ? " wrapper--darked" : "")}>{children}</div>
    )
};

export default Wrapper;