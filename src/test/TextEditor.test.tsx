import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import TextEditor from "../components/TextEditor/TextEditor.tsx";
import {describe, it, expect} from "vitest";
import {Provider} from "react-redux";
import { store } from '../app/store.ts';

describe('textEditor', () => {
    it('renders input', () => {
        render(
        <Provider store={store}>
            <TextEditor/>
        </Provider>);

        expect(screen.getByPlaceholderText('Название')).toBeInTheDocument();
    });
    it('renders buttons', () => {
        render(
            <Provider store={store}>
                <TextEditor/>
            </Provider>
        );
        expect(screen.getByRole("button", {name: "Сохранить"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Закрыть"})).toBeInTheDocument();
    });
    it('handles title changes correctly', () => {
        render(
            <Provider store={store}>
                <TextEditor/>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText("Название"), {target: {value: "New Title"}});

        expect(screen.getByPlaceholderText("Название")).toHaveValue("New Title");
    });
    it('handles title changes correctly', async () => {
        render(
            <Provider store={store}>
                <TextEditor/>
            </Provider>
        );

        const closeBtn = screen.getByRole("button", {name: "Сохранить"});

        fireEvent.click(closeBtn);

        expect(screen.getByRole("button", {name: "Сохранить"})).toHaveAttribute('disabled');

    });
})
