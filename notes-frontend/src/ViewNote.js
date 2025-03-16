import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

function ViewNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNote();
    }, []);

    const fetchNote = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/notes/${id}`);
            setNote(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке заметки", error);
            message.error("Заметка не найдена");
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    if (!note) {
        return <p style={{ textAlign: "center", marginTop: "20px" }}>Заметка не найдена</p>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <Card loading={loading} title={note.title} bordered>
                <p><strong>Содержание:</strong></p>
                <p>{note.content}</p>
                <p><strong>Дата создания:</strong> {note.createdAt ? dayjs(note.createdAt).format("DD-MM-YYYY HH:mm") : "Не указано"}</p>
                <p><strong>Дата редактирования:</strong> {note.modifiedAt ? dayjs(note.modifiedAt).format("DD-MM-YYYY HH:mm") : "Не редактировалось"}</p>
            </Card>
            <Button type="primary" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
                Назад
            </Button>
        </div>
    );
}

export default ViewNote;
