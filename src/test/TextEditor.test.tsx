import {fireEvent, render, screen} from '@testing-library/react';
// import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom'
import TextEditor from "../components/TextEditor/TextEditor.tsx";
import {describe, expect, it} from "vitest";
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

        // const closeBtn = screen.getByRole("button", {name: "Закрыть"});
        const closeBtn = screen.getByRole("button", {name: "Сохранить"});

        fireEvent.click(closeBtn);

        // expect(screen.getByPlaceholderText('Название')).toHaveAttribute('disabled');
        expect(screen.getByRole("button", {name: "Сохранить"})).toHaveAttribute('disabled');

    });
})
