import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

function CreateNote() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/notes', values);
            message.success("Заметка успешно создана!");
            navigate('/');
        } catch (error) {
            console.error("Ошибка при создании заметки", error);
            message.error("Ошибка при создании заметки");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Создать новую заметку</h2>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{ required: true, message: "Введите заголовок" }]}
                >
                    <Input placeholder="Введите заголовок" />
                </Form.Item>
                <Form.Item
                    label="Содержание"
                    name="content"
                    rules={[{ required: true, message: "Введите содержание" }]}
                >
                    <Input.TextArea rows={4} placeholder="Введите содержание" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default CreateNote;
