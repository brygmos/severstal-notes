import cls from './Main.module.css'
import TextEditor from "../TextEditor/TextEditor.tsx";

const Main = () => {

    return (
        <main className={cls.main}>
            <TextEditor/>
        </main>
    );
};

export default Main;
