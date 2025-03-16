import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    
    const fetchNote = useCallback(async () => {
        if (!id) {
            message.error("Некорректный ID заметки");
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/notes/${id}`);
            if (response.data) {
                form.setFieldsValue(response.data);
            } else {
                message.error("Заметка не найдена");
            }
        } catch (error) {
            console.error("Ошибка при загрузке заметки:", error.response || error);
            message.error("Ошибка при загрузке заметки");
        }
    }, [id]);

    useEffect(() => {
        fetchNote();
    }, [fetchNote]);
    
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const values = form.getFieldsValue();
            await axios.put(`http://localhost:8080/api/notes/${id}`, { id, ...values });
            message.success("Заметка обновлена!");
            navigate('/');
        } catch (error) {
            console.error("Ошибка при обновлении заметки:", error.response || error);
            message.error("Ошибка при обновлении заметки");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h2>Редактировать заметку</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

export default EditNote;
